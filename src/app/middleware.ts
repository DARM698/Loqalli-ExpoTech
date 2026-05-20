import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'un_secret_muy_largo_y_seguro_de_mas_de_32_caracteres'
);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('session_token')?.value;
  const { pathname } = request.nextUrl;

  // Si intentan entrar a subir experiencias
  if (pathname.startsWith('/uploadMicroexperiences')) {
    if (!token) {
      // Redirigir al login si no tiene cookie
      return NextResponse.redirect(new URL('/Login/login-host', request.url));
    }

    try {
      // Verificar validez del Token
      const { payload } = await jwtVerify(token, JWT_SECRET);
      
      // Control de roles estricto: Si no eres HOST, fuera.
      if (payload.role !== 'HOST') {
        return NextResponse.redirect(new URL('/Login/login-tourist', request.url));
      }
    } catch (err) {
      // Token alterado o expirado
      return NextResponse.redirect(new URL('/Login/login-host', request.url));
    }
  }

  return NextResponse.next();
}

// Configurar sobre qué rutas se ejecutará el middleware
export const config = {
  matcher: ['/uploadMicroexperiences/:path*'],
};