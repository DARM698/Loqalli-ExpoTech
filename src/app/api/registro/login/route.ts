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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "El correo y la contraseña son obligatorios." },
        { status: 400 }
      );
    }

    // 1. Buscar al usuario por correo electrónico (Modo Insensitive)
    // Cambiamos findUnique por findFirst para usar la comparación flexible
    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive', // Ignora mayúsculas/minúsculas en la búsqueda
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Credenciales incorrectas." },
        { status: 401 }
      );
    }

    // 2. Validar que la contraseña coincida usando bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Credenciales incorrectas." },
        { status: 401 }
      );
    }

    // Devolvemos el éxito y el rol para manejar la redirección en el cliente (Loqalli logic)
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role, // HOST o TOURIST
      }
    });

  } catch (error) {
    console.error("🚨 [LOGIN ERROR]:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}