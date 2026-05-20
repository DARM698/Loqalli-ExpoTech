import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

async function validarConVerifik(
  documentNumber: string, 
  birthDate: string, 
  role: string, 
  documentType: string = 'DUI'
) {
  const baseUrl = "https://prod.verifik.co/v2";
  const token = process.env.VERIFIK_TOKEN;

  try {
    if (role === 'HOST' || (role === 'TOURIST' && documentType === 'DUI')) {
      if (!birthDate || !documentNumber) return { valid: false };

      const duiLimpio = documentNumber.replace(/[-\s]/g, '');
      const [year, month, day] = birthDate.split('-');
      const fechaFormateada = `${day}/${month}/${year}`;

      const params = new URLSearchParams({
        documentNumber: duiLimpio,
        dateOfBirth: fechaFormateada
      });

      console.log(`📡 [1/2] Consultando RNPN para validación de datos...`);

      const response = await fetch(`${baseUrl}/sv/dui?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        signal: AbortSignal.timeout(25000) 
      });

      const result = await response.json();
      
      // Validar existencia del registro
      if (!response.ok || !result?.data?.fullName) {
        console.error("🚨 [ERROR] No se encontró el DUI en RNPN.");
        return { valid: false, errorType: "RNPN_RECORD_NOT_FOUND" };
      }

      const fullNameOficial = result.data.fullName;

      console.log(`✨ [2/2] VALIDACIÓN EXITOSA CON RNPN`);
      return { valid: true, fullNameOficial };
    } 
    
    // Para pasaportes u otros casos no implementados aún
    return { valid: true, fullNameOficial: null };
  } catch (error: any) {
    if (error.name === 'TimeoutError' || error.code === 'UND_ERR_CONNECT_TIMEOUT') {
      return { valid: false, errorType: "CONNECTION_TIMEOUT" };
    }
    console.error("🚨 [CRITICAL ERROR]:", error);
    return { valid: false };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, password, age, role, birthDate, documentNumber, documentType, verificationData } = body;

    console.log(`📝 Iniciando proceso de registro para: ${email}`);

    // --- BLOQUE DE AUDITORÍA LOGS EN CONSOLA DEL SERVIDOR ---
    if (!fullName || !email || !password || !age || !birthDate || !documentNumber) {
      console.log("🔍 [AUDITORÍA DE CAMPOS RECIBIDOS]:", {
        fullName: fullName ? "✅ PROVISTO" : "❌ VACÍO",
        email: email ? "✅ PROVISTO" : "❌ VACÍO",
        password: password ? "✅ PROVISTO" : "❌ VACÍO",
        age: age ? "✅ PROVISTO" : "❌ VACÍO",
        birthDate: birthDate ? "✅ PROVISTO" : "❌ VACÍO",
        documentNumber: documentNumber ? "✅ PROVISTO" : "❌ VACÍO",
      });
      
      return NextResponse.json(
        { success: false, error: "Faltan campos obligatorios en el formulario." }, 
        { status: 400 }
      );
    }

    const verificacion = await validarConVerifik(documentNumber, birthDate, role, documentType);

    // Si la validación de datos falla, se detiene el POST
    if (!verificacion.valid) {
      let errorMsg = "La verificación de identidad ha fallado.";
      
      if (verificacion.errorType === "RNPN_RECORD_NOT_FOUND") {
        errorMsg = "❌ Los datos del DUI no coinciden con los registros oficiales.";
      } else if (verificacion.errorType === "CONNECTION_TIMEOUT") {
        errorMsg = "⚠️ Error de conexión con el servicio de identidad. Intenta de nuevo.";
      }
      
      return NextResponse.json({ success: false, error: errorMsg }, { status: 400 });
    }

    // Si pasó la prueba, procedemos con el guardado
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const nombreFinal = verificacion.fullNameOficial || fullName;

    const newUser = await prisma.user.create({
      data: {
        fullName: nombreFinal, 
        email: email,
        password: hashedPassword,
        age: parseInt(age) || 0,
        role: role,
        verification: {
          create: {
            document: verificationData?.documentPhoto || "url_pendiente",
            status: 'APPROVED', 
            verified: true,
          },
        },
      },
    });

    console.log("✅ Usuario verificado y creado con éxito.");
    const { password: _, ...userWithoutPassword } = newUser;
    return NextResponse.json({ success: true, user: userWithoutPassword });

  } catch (error: any) {
    console.error("🚨 [DATABASE ERROR]:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.code === 'P2002' ? "Este correo ya existe." : "Error interno del servidor." 
      },
      { status: 500 }
    );
  }
}