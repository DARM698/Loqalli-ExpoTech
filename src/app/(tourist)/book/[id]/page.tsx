import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import NavbarUser from '@/components/shared/navbar';
import BookingClient from '@/components/BookingClient'; // El componente de abajo

export default async function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const experience = await prisma.experience.findUnique({
    where: { id },
    include: { Booking: true }
  });

  if (!experience) notFound();

  // Aquí puedes obtener el usuario de la sesión para pasarle el ID y Role al Navbar
  return (
    <div className="min-h-screen bg-white">
      <NavbarUser role="TOURIST" userId="USER_ID_AQUI" />
      <BookingClient experience={experience} />
    </div>
  );
}