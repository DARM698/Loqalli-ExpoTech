// components/experiences/ExploreFilters.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition, useEffect, useState } from 'react';

export default function ExploreFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Estados locales para que la escritura en el input se sienta fluida e instantánea
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  // Sincronizar el input si la URL cambia externamente o se limpia
  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
  }, [searchParams]);

  // Función unificada para actualizar los SearchParams en la URL
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      router.push(`/explore?${params.toString()}`); // Ajusta la ruta si tu página no se llama /explore
    });
  };

  // Debounce simple para la barra de búsqueda (espera 400ms antes de recargar la BD)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== (searchParams.get('search') || '')) {
        updateFilter('search', searchTerm);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className={`flex flex-col md:flex-row gap-4 mb-12 transition-opacity ${isPending ? 'opacity-60' : 'opacity-100'}`}>
      
      {/* Barra de Búsqueda de Texto */}
      <div className="flex-grow relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></span>
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search experiences by title or description..." 
          className="w-full pl-12 pr-4 py-3 border border-gray-200 text-gray-700 rounded-lg focus:ring-2 focus:ring-[#D2693E]/20 focus:border-[#D2693E] outline-none transition-all"
        />
      </div>

      {/* Filtro por Categorías */}
      <select 
        value={searchParams.get('category') || ''}
        onChange={(e) => updateFilter('category', e.target.value)}
        className="border border-gray-200 rounded-lg px-4 py-3 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-[#D2693E]/20 focus:border-[#D2693E] cursor-pointer"
      >
        <option value="">All Categories</option>
        <option value="Gastronomy">Gastronomy</option>
        <option value="Ceramics & Pottery">Ceramics & Pottery</option>
        <option value="Textiles">Textiles</option>
        <option value="Adventure">Adventure</option>
      </select>

      {/* Filtro por Rango de Precios */}
      <select 
        value={searchParams.get('priceRange') || ''}
        onChange={(e) => updateFilter('priceRange', e.target.value)}
        className="border border-gray-200 rounded-lg px-4 py-3 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-[#D2693E]/20 focus:border-[#D2693E] cursor-pointer"
      >
        <option value="">Any Price</option>
        <option value="1-20">$1 - $20</option>
        <option value="21-40">$21 - $40</option>
        <option value="40+">$40 o más</option>
      </select>
    </div>
  );
}