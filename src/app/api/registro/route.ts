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

async function validarConVerifik(documentNumber: string, birthDate: string, role: string) {
  // Asegúrate de que VERIFIK_BASE_URL en tu .env sea: https://api.verifik.co/v2
  const baseUrl = process.env.VERIFIK_BASE_URL;
  const token = process.env.VERIFIK_API_TOKEN;

  try {
    if (role === 'HOST') {
      if (!birthDate || !documentNumber) return { valid: false };

      const duiLimpio = documentNumber.replace(/[-\s]/g, '');
      const [year, month, day] = birthDate.split('-');
      const fechaFormateada = `${day}/${month}/${year}`;

      const params = new URLSearchParams({
        documentNumber: duiLimpio,
        dateOfBirth: fechaFormateada
      });

      const url = `${baseUrl}/sv/dui?${params.toString()}`;
      console.log(`📡 Consultando Verifik v2: ${url}`);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log("🔍 Respuesta de Verifik:", result);

      /**
       * AJUSTE DE LÓGICA:
       * Verificamos si la respuesta fue exitosa (200 OK) Y si contiene
       * ya sea el status 'valid' o el nombre completo (fullName).
       */
      if (response.ok && (result?.data?.status === 'valid' || result?.data?.fullName)) {
        return { 
          valid: true, 
          fullNameOficial: result.data.fullName 
        };
      }
      return { valid: false };
    } 
    return { valid: true, fullNameOficial: null };
  } catch (error) {
    console.error("🚨 Error Verifik:", error);
    return { valid: false };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, password, age, role, birthDate, documentNumber, verificationData } = body;

    // 1. Validar Identidad
    const verificacion = await validarConVerifik(documentNumber, birthDate, role);

    if (!verificacion.valid) {
      return NextResponse.json(
        { success: false, error: "La información del DUI no coincide con los registros oficiales de El Salvador." },
        { status: 400 }
      );
    }

    // 2. Hash de contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Crear Usuario en Prisma
    // Priorizamos el nombre que viene de la base de datos oficial (RNPN)
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
            faceImage: verificationData?.facePhoto || "url_pendiente",
            document: verificationData?.documentPhoto || "url_pendiente",
            status: 'APPROVED', 
            verified: true,
          },
        },
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return NextResponse.json({ success: true, user: userWithoutPassword });

  } catch (error: any) {
    console.error("🚨 Error Registro:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.code === 'P2002' ? "Este correo electrónico ya está registrado." : "Error interno del servidor." 
      },
      { status: 500 }
    );
  }
}