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

// Configuración de colores por categoría con los códigos exactos solicitados
const CATEGORY_GRADIENTS: Record<string, string> = {
  "Textiles": "from-[#BCECFF]/30 to-[#C2BBFF]/30",
  "Gastronomy": "from-[#FBCEAE]/30 to-[#D2693E]/30",
  "Ceramics & Pottery": "from-[#FAF7EB]/80 to-[#EB975E]/30",
  "Adventure": "from-[#84AF9C]/40 to-[#FBCEAE]/40", // Aplicación exacta del color de la imagen
};

export default function ExperienceCard({ id, title, description, price, category, address, image }: ExperienceCardProps) {
  // Si la categoría no existe, no aplicamos gradiente para evitar errores
  const gradientClass = CATEGORY_GRADIENTS[category] || "";

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

      {/* Contenido con Gradiente aplicado dinámicamente */}
      <div className={`p-5 flex flex-col flex-grow bg-gradient-to-br ${gradientClass}`}>
        <h3 className="text-xl font-serif text-[#4A3933] mb-2 leading-tight">
          {title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
          {description}
        </p>
        
        <div className="text-xs text-gray-500 mb-4 flex items-center gap-1">
          <span>📍</span> {address}
        </div>

        <div className="pt-4 border-t border-black/5 flex items-center justify-between">
          <Link 
            href={`/microexperience/${id}`}
            className="bg-[#D2693E] text-white px-6 py-2 rounded text-sm font-bold hover:bg-[#b05832] transition-colors">
            Explore Details
          </Link>
        </div>
      </div>
    </div>
  );
}