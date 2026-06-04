import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import CheckoutClient from '@/components/checkout/CheckoutClient';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'un_secret_muy_largo_y_seguro_de_mas_de_32_caracteres'
);

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // 1. Obtener el userId desde la cookie de sesión
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;
  
  let userId = '';

  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      userId = String(payload.userId || payload.id || '');
    } catch (err) {
      console.error("Error al verificar token en Checkout:", err);
    }
  }

  // 2. Buscar la experiencia
  const experience = await prisma.experience.findUnique({
    where: { id },
  });

  if (!experience) notFound();

  // 3. Renderizar el componente pasando tanto la experiencia como el userId
  return <CheckoutClient experience={experience} userId={userId} />;
}