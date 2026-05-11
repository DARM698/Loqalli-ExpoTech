import Link from 'next/link';

interface ExperienceCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  address: string;
  image: string;
}

export default function ExperienceCard({ id, title, description, price, category, address, image }: ExperienceCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full">
      {/* Contenedor de Imagen */}
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

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <Link 
            href={`/experiences/${id}`}
            className="bg-[#D2693E] text-white px-6 py-2 rounded text-sm font-bold hover:bg-[#b05832] transition-colors"
          >
            Explore Details
          </Link>
          <div className="text-[11px] text-gray-500">
          </div>
        </div>
      </div>
    </div>
  );
}