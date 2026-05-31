import Link from 'next/link';

interface ExperienceCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  address: string;
  image: string;
  //propiedades de tiempo que vienen de Prisma
  days: string[];     
  startTime?: string | null; 
  endTime?: string | null;   
}

export default function ExperienceCard({ 
  id, title, description, price, category, address, image, 
  days, startTime, endTime // Capturamos las nuevas propiedades
}: ExperienceCardProps) {

  // 2. MODIFICADO: Función lógica para comparar el reloj real con el fin del viaje
  const isExperiencePast = () => {
    // Si no hay días cargados o no hay hora de fin, por seguridad dejamos que puedan reservar
    if (!days || days.length === 0 || !endTime) return false;
    
    try {
      // Combina el primer día ("YYYY-MM-DD") con la hora de fin ("HH:MM")
      const experienceEndTime = new Date(`${days[0]}T${endTime}:00`);
      const now = new Date(); // La hora exacta de este microsegundo en el mundo

      return now > experienceEndTime; // Devuelve true si la fecha actual ya superó al viaje
    } catch (error) {
      console.error("Error calculando la expiración de la tarjeta:", error);
      return false;
    }
  };

  const hasEnded = isExperiencePast();

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full">
      {}
      <div className="relative h-64 w-full">
        <img 
          src={image || '/placeholder.jpg'} 
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Precio flotante */}
        <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-md shadow-sm font-bold text-[#D2693E] text-sm">
          ${price}
        </div>
        {/* Badge de Categoría */}
        <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded">
          {category}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-serif text-[#4A3933] mb-2 leading-tight">
          {title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
          {description}
        </p>
        
        <div className="text-xs text-gray-400 mb-4 flex items-center gap-1">
          <span>📍</span> {address}
        </div>

        {/* 3. MODIFICADO: La sección de botones ahora es inteligente y cambia de color y destino */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <Link 
            // Si ya terminó, lo mandamos a TU página de reseñas. Si no, va a detalles/reserva.
            href={hasEnded ? `/experiences/${id}/comments` : `/microexperience/${id}`}
            className={`px-6 py-2 rounded text-sm font-bold text-white transition-colors ${
              hasEnded 
                ? 'bg-[#9A4421] hover:bg-[#833819]'  // Color terracota artesanal si ya pasó
                : 'bg-[#D2693E] hover:bg-[#b05832]'  // Color naranja original si está activo
            }`}
          >
            {/* Si ya terminó dice "Review Experience", si no, mantiene el "Explore Details" original */}
            {hasEnded ? 'Review Experience' : 'Explore Details'}
          </Link>
          <div className="text-[11px] text-gray-500">
          </div>
        </div>
      </div>
    </div>
  );
}