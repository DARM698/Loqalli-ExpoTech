import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Prisma 7 + PostgreSQL Adapter
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function validarConVerifik(body: any) {
  const baseUrl = process.env.VERIFIK_BASE_URL;
  const token = process.env.VERIFIK_API_TOKEN;

  try {
    let url = "";
    let options: any = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    // HOST -> Validación DUI
    if (body.role === 'HOST') {
      if (!body.birthDate || !body.documentNumber) {
        return false;
      }

      const [year, month, day] = body.birthDate.split('-');
      const fechaFormateada = `${day}/${month}/${year}`;

      url = `${baseUrl}/sv/dui?documentNumber=${body.documentNumber}&dateOfBirth=${fechaFormateada}`;
    }

    // TOURIST -> OCR Pasaporte
    else {
      url = `${baseUrl}/ocr/passport`;

      options.method = 'POST';

      options.headers['Content-Type'] = 'application/json';

      options.body = JSON.stringify({
        image: body.verificationData?.document,
      });
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      console.error("Error HTTP Verifik:", response.status);
      return false;
    }

    const result = await response.json();

    console.log("Respuesta Verifik:", result);

    return (
  result?.isValid === true ||
  result?.valid === true ||
  result?.success === true ||
  result?.status === 'valid' ||
  result?.status === 'approved'
);

  } catch (error) {
    console.error("Error Verifik:", error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("BODY RECIBIDO:", body);

    // 1. Validar Identidad
    const esValido = await validarConVerifik(body);

    if (!esValido) {
      return NextResponse.json(
        {
          success: false,
          error: "Identidad no válida",
        },
        { status: 400 }
      );
    }

    // 2. Crear Usuario
    const newUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password,
        age: parseInt(body.age) || 0,

        // IMPORTANTE:
        // Pasamos string directo para evitar problemas
        // con enums runtime de Prisma + Next
        role: body.role,

        verification: {
          create: {
            faceImage:
              body.verificationData?.faceImage || "url_pendiente",

            document:
              body.verificationData?.document || "url_pendiente",

            // IMPORTANTE:
            // string directo en vez de enum importado
            status: 'APPROVED',

            verified: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      user: newUser,
    });

  } catch (error: any) {

    console.error("--- ERROR EN EL SERVIDOR ---");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error.code === 'P2002'
            ? "El correo ya existe"
            : "Error de inicialización de base de datos",
      },
      { status: 500 }
    );
  }
}