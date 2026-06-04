import { cookies } from 'next/headers'; 
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import ReviewFormClient from '@/components/comments/ReviewFormClient';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'un_secret_muy_largo_y_seguro_de_mas_de_32_caracteres'
);

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LoqalliReviewPage({ params }: PageProps) {
  // 1. Extraemos de forma automática el ID de la experiencia desde la URL
  const { id: experienceId } = await params;

  // 2. Identificamos automáticamente al Turista que está comentando (Usa la sesión real)
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value; 
  
  if (!token) {
    redirect('/login'); 
  }

  let currentUserId: string;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    currentUserId = payload.id as string; 
  } catch (err) {
    console.error("Token no válido:", err);
    redirect('/login');
  }

  // 3. Buscamos en la base de datos los detalles de la experiencia real
  const experience = await prisma.experience.findUnique({
    where: { id: experienceId },
    select: { 
      title: true, 
      address: true, 
      images: true,
      hostId: true 
    }
  });

  if (!experience) {
    return (
      <div className="text-center py-20 font-sans text-slate-600">
        Loqalli Error: La experiencia que intentas calificar no existe.
      </div>
    );
  }

  // 🌟 NUEVO: COMPROBACIÓN DE ASISTENCIA REAL (Módulo de seguridad)
  const userBooking = await prisma.booking.findFirst({
    where: {
      touristId: currentUserId,   // ID del turista logueado
      experienceId: experienceId, // ID de la experiencia de la URL
      Status: "COMPLETED"         // Asegura que el estado sea COMPLETADO (ya asistió y finalizó)
    }
  });

  // Si el turista no tiene una reservación completada para este taller, lo bloqueamos
  if (!userBooking) {
    return (
      <div className="text-center py-20 font-sans text-[#4A3933] max-w-md mx-auto px-4">
        <h2 className="text-2xl font-serif text-[#D2693E] mb-2">Access Denied</h2>
        <p className="text-sm text-gray-500">
          Solo puedes dejar una reseña si reservaste y completaste esta microexperiencia con éxito.
        </p>
      </div>
    );
  }

  // 4. Conectamos los datos reales de forma automática si todo está en orden
  return (
    <ReviewFormClient 
      experienceId={experienceId}
      touristId={currentUserId}
      hostId={experience.hostId} 
      dbTitle={experience.title}
      dbLocation={experience.address}
      dbImage={experience.images[0] || ""}
    />
  )};