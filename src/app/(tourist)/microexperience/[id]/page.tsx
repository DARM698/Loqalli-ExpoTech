// src/app/(tourist)/microexperience/[id]/page.tsx
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { cookies } from 'next/headers'; 
import { jwtVerify } from 'jose'; 
import NavbarUser from '@/components/shared/navbar'; 
import AvailabilityDisplay from '@/components/experiences/AvailabilityDisplay'; 
import Link from 'next/link';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'un_secret_muy_largo_y_seguro_de_mas_de_32_caracteres'
);

interface PageProps {
  params: Promise<{ id: string }>;
}

const calendarStyles = `
  .rdp { --rdp-accent-color: #D2693E; --rdp-background-color: #F3D9CF; margin: 0; width: 100%; font-family: inherit; }
  .rdp-months { justify-content: center; width: 100%; }
  .rdp-month { width: 100%; }
  .rdp-table { max-width: 100%; width: 100%; }
  .rdp-caption { display: flex; align-items: center; justify-content: space-between; padding: 0 10px; margin-bottom: 20px; color: #4A3933; font-weight: bold; }
  .rdp-nav { color: #1e3a8a; }
  .rdp-cell { padding: 5px; text-align: center; }
  .rdp-day { width: 40px; height: 40px; border-radius: 4px; transition: all 0.2s; color: #6b7280; }
  .rdp-day_selected:not([disabled]) { background-color: var(--rdp-accent-color) !important; color: white !important; font-weight: bold; }
  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { background-color: #F3D9CF !important; color: #D2693E; }
`;

export default async function MicroexperiencePage({ params }: PageProps) {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;
  console.log("Cookie encontrada:", token ? "SÍ" : "NO");
  console.log("Valor de la cookie:", token);
  
  let currentRole: 'TOURIST' | 'HOST' = 'TOURIST';
  let userId: string = '';

  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      console.log("Payload del token:", payload);
      if (payload.role === 'HOST' || payload.role === 'TOURIST') {
        currentRole = payload.role as 'TOURIST' | 'HOST';
          userId = String(payload.userId || payload.sub || payload.id || '');
      }
    } catch (err) {
      console.error("Error verificando token en Detalle de Experiencia:", err);
    }
  }

  const isTourist = currentRole === 'TOURIST';

  const experience = await prisma.experience.findUnique({
  where: { id },
  include: {
    host: { select: { id: true, fullName: true, role: true, profileImage: true } }
  }
});

  if (!experience) notFound();

  // Función para formatear el horario
  const formatSlot = (exp: any) => {
    return `${exp.startTime} - ${exp.endTime}`;
  };

  const hostDisplayName = experience.host.fullName.split(' ').slice(0, 2).join(' ');
  const hostImage = experience.host.profileImage || "/avatar.png";

  const rawImages = experience.images && experience.images.length > 0 
    ? experience.images 
    : ['https://via.placeholder.com/1200x800?text=Loqalli+Experience'];

  const galleryImages = rawImages.length === 1 
    ? [rawImages[0], rawImages[0], rawImages[0]] 
    : rawImages.slice(0, 3);

  return (
    <div className="min-h-screen bg-white font-sans">
      <style>{calendarStyles}</style>
      
      <NavbarUser role={currentRole} userId={userId} />

      <main className="max-w-7xl mx-auto px-6 py-10 text-[#4A3933]">
        
        {/* --- GALERÍA TRÍPTICO --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-8 h-[200px] md:h-[300px]">
          {galleryImages.map((img, index) => (
            <div key={index} className="relative overflow-hidden bg-gray-100 group rounded-lg shadow-inner">
              <Image 
                src={img} 
                alt={`${experience.title} ${index + 1}`}
                fill
                priority={index === 0}
                quality={100}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
        
        {/* --- TÍTULO Y UBICACIÓN --- */}
        <section className="mb-12 border-b border-gray-100 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-[#4A3933] tracking-tight">{experience.title}</h1>
          <div className="flex items-center gap-2 text-gray-500 font-medium">
            <span className="text-[#D2693E]">📍</span>
            <span className="hover:text-[#D2693E] cursor-default transition-colors">{experience.address}</span>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Columna Izquierda: Información */}
          <div className="md:col-span-8 space-y-12">
            
            {/* Descripción */}
            <div>
              <h2 className="text-sm uppercase tracking-[0.3em] font-bold mb-6 text-[#D2693E]">About the experience</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg font-light">
                {experience.description}
              </p>
            </div>

            {/*Arrival Images*/}
            {experience.arrivalImages && experience.arrivalImages.length > 0 && (
              <div>
                <h2 className="text-sm uppercase tracking-[0.3em] font-bold mb-6 text-[#D2693E]">Arrival Guide</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {experience.arrivalImages.map((img, index) => (
                    <div key={index} className="relative overflow-hidden bg-gray-100 group rounded-lg shadow-inner h-48">
                      <Image 
                        src={img} 
                        alt={`Arrival Guide ${index + 1}`}
                        fill
                        priority={index === 0}
                        quality={100}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Host*/}
<Link 
  href={`/profile/${experience.host.id}`} 
  className="flex flex-col sm:flex-row items-center gap-6 p-6 border border-gray-100 bg-white group transition-colors hover:border-[#F3D9CF] rounded-xl shadow-inner block"
>
  <div className="relative w-32 h-32 shrink-0 overflow-hidden rounded-full shadow-inner bg-white">
    <Image 
      src={hostImage} 
      alt={hostDisplayName}
      fill
      sizes="128px"
      className="object-cover"
    />
  </div>
  <div className="flex flex-col justify-center text-center sm:text-left">
    <p className="text-[10px] font-bold text-[#D2693E] uppercase tracking-widest mb-2">Meet your host</p>
    <h3 className="text-3xl font-bold text-[#4A3933] mb-1">{hostDisplayName}</h3>
    <p className="text-sm text-gray-500 italic">Experience Artisan</p>
  </div>
</Link>

            {/* Disponibilidad */}
            <div className="pt-4">
              <h3 className="text-sm uppercase tracking-[0.3em] font-bold mb-6 text-[#D2693E]">Availability</h3>
              <div className="border border-gray-100 p-8 flex justify-center bg-[#F3D9CF]/5 rounded-xl shadow-inner">
                 <AvailabilityDisplay availableDates={experience.days} />
              </div>
            </div>
          </div>

          {/* Columna Derecha: Booking */}
          <aside className="md:col-span-4 relative">
            <div className="sticky top-24 border border-gray-100 p-8 space-y-8 bg-white shadow-sm rounded-2xl">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-gray-400 text-[10px] block uppercase font-bold tracking-widest mb-1">Total per person</span>
                  <span className="text-5xl font-bold text-[#4A3933]">${experience.pricePerPerson}</span>
                </div>
              </div>

              <div>
                <div className="items-end">
                  <span className="text-gray-400 text-[9px] uppercase font-bold block">Time</span>
                  <span className="text-[#4A3933] font-medium text-lg">{formatSlot(experience)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100">
                <div>
                  <span className="text-gray-400 text-[9px] uppercase font-bold block">Capacity</span>
                  <span className="text-[#4A3933] font-medium text-lg">{experience.maxParticipants} people</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[9px] uppercase font-bold block">Payment</span>
                  <span className="text-[#D2693E] text-base uppercase tracking-tighter">{experience.paymentMethod}</span>
                </div>
              </div>

              {isTourist && (
                <button className="w-full bg-[#D2693E] hover:opacity-90 text-white font-bold py-6 transition-all duration-300 uppercase tracking-widest text-sm shadow-md rounded-lg active:translate-y-1">
                  Book this experience
                </button>
              )}

              <p className="text-[10px] text-center text-gray-400 font-medium leading-tight">
                Availability is limited to the dates shown in the calendar.
              </p>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}