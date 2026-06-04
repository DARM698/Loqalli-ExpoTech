import PagoExitosoClient from "@/components/PagoExitosoClient";
import { prisma } from "@/lib/prisma";

export default async function PagoExitosoPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ bookingId: string }> 
}) {
  // 1. Resolvemos la promesa de searchParams
  const { bookingId } = await searchParams;

  if (!bookingId) {
    return <div className="p-10 text-center text-red-500">Error: Reserva no identificada.</div>;
  }

  // 2. Buscamos en la base de datos
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { 
      // Nota: Si te marca error, intenta con 'experience: true' (minúscula)
      // depende de cómo lo hayas definido en schema.prisma
      Experience: true 
    }
  });

  if (!booking) {
    return <div className="p-10 text-center">Reserva no encontrada en el sistema.</div>;
  }

  // 3. Pasamos el objeto al Client Component
  return <PagoExitosoClient booking={booking} />;
}