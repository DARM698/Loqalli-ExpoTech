import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'un_secret_muy_largo_y_seguro_de_mas_de_32_caracteres'
);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('session_token')?.value;
  const { pathname } = request.nextUrl;

  // 1. Si no hay token, redirigir a login (excepto si ya están en el login)
  if (!token) {
    // Si intenta acceder a rutas protegidas y no está logueado, manda al login
    if (pathname.startsWith('/uploadMicroexperiences') || 
        pathname.startsWith('/dashboard') || 
        pathname.startsWith('/bookings') || 
        pathname.startsWith('/profile')) {
      return NextResponse.redirect(new URL('/Login/login-host', request.url));
    }
    return NextResponse.next();
  }

  // 2. Si hay token, verificarlo
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // Protección específica de rol para subir experiencias
    if (pathname.startsWith('/uploadMicroexperiences') && payload.role !== 'HOST') {
      return NextResponse.redirect(new URL('/Login/login-tourist', request.url));
    }

    return NextResponse.next();
  } catch (err) {
    // Si el token es inválido, limpiar y redirigir
    return NextResponse.redirect(new URL('/Login/login-host', request.url));
  }
}

export const config = {
  matcher: [
    '/uploadMicroexperiences/:path*',
    '/dashboard/:path*',
    '/bookings/:path*',
    '/profile/:path*'
  ],
};