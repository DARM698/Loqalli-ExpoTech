import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'tu_secreto');

export async function getSession() {
  const token = (await cookies()).get('session_token')?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload; // Aquí tienes { userId: '...', role: '...', ... }
  } catch {
    return null;
  }
}