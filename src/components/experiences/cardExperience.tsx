interface Props {
  title: string;
  img: string;
  price: number;
  location: string; 
}

export default function CardExperience({ title, img, price, location }: Props) {
  return (
    // Agregamos fondo blanco, bordes redondeados y sombra
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 w-full max-w-sm">
      
      {/* Contenedor de la imagen */}
      <div className="h-48 overflow-hidden">
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Contenedor del texto */}
      <div className="p-4">
        <h2 className="font-bold text-lg text-gray-800 mb-2">
          {title}
        </h2>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">
             📍 {location}
          </span>
          <span className="font-bold text-green-600">
             ${price}
          </span>
        </div>
        
        {/* Un botón opcional para que se vea más completo */}
        <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          Ver detalles
        </button>
      </div>

    </div>
  );
}