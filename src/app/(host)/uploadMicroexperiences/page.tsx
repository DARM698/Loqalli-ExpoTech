'use client';
import { useState } from 'react';

const DAYS = [
  { id: 0, label: 'S', full: 'Sunday' },
  { id: 1, label: 'M', full: 'Monday' },
  { id: 2, label: 'T', full: 'Tuesday' },
  { id: 3, label: 'W', full: 'Wednesday' },
  { id: 4, label: 'T', full: 'Thursday' },
  { id: 5, label: 'F', full: 'Friday' },
  { id: 6, label: 'S', full: 'Saturday' },
];

export default function CreateExperiencePage() {
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const toggleDay = (id: number) => {
    // Usamos el ID único (0-6) en lugar de la letra 'S' o 'T'
    setSelectedDays(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 font-sans text-[#4A3933]">
      {/* Header adaptable */}
      <header className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-serif text-[#D2693E] mb-4">
          List a Micro-experience
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
          Share your craft, heritage, and stories with the world. Join our community of artisans and host unique hands-on sessions.
        </p>
      </header>

      <main className="max-w-5xl mx-auto space-y-6">
        {/* Sección: Basic Info - Grid responsivo (1 col en móvil, 2 en desktop) */}
        <section className="border border-[#F3D9CF] rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#D2693E] text-white p-1 rounded-full text-xs">i</span>
            <h2 className="font-bold text-lg">Basic Info</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Experience Title</label>
              <input 
                type="text" 
                placeholder="e.g. Traditional Indigo Dyeing Workshop"
                className="w-full p-3 bg-[#F3D9CF]/30 border border-[#F3D9CF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2693E]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Craft Category</label>
              <select className="w-full p-3 bg-[#F3D9CF]/30 border border-[#F3D9CF] rounded-lg focus:outline-none">
                <option>Ceramics & Pottery</option>
                <option>Textiles</option>
                <option>Gastronomy</option>
              </select>
            </div>
            
          </div>
        </section>

        {/* Sección: Availability - Arreglo de los días S/T */}
        <section className="border border-[#F3D9CF] rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[#D2693E]">📅</span>
            <h2 className="font-bold text-lg">Availability</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-4">Select operating days</p>
              <div className="flex gap-2 flex-wrap">
                {DAYS.map((day) => (
                  <button
                    key={day.id} // El ID único evita que se seleccionen ambas 'S'
                    onClick={() => toggleDay(day.id)}
                    className={`w-10 h-10 rounded-full border transition-all flex items-center justify-center font-medium ${
                      selectedDays.includes(day.id)
                        ? 'bg-[#D2693E] border-[#D2693E] text-white'
                        : 'border-gray-300 text-gray-400 hover:border-[#D2693E]'
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-4">Time Slots</p>
              <div className="flex gap-2 flex-wrap items-center">
                <span className="px-4 py-2 bg-[#D9EAD3] text-[#274E13] rounded-full text-sm">10:00 AM ×</span>
                <span className="px-4 py-2 bg-[#D9EAD3] text-[#274E13] rounded-full text-sm">02:00 PM ×</span>
                <button className="px-4 py-2 border border-dashed border-[#D2693E] text-[#D2693E] rounded-full text-sm hover:bg-[#D2693E]/5">
                  + Add Slot
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer de acción responsivo */}
        <footer className="border border-[#F3D9CF] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <button className="text-gray-500 underline text-sm order-2 md:order-1">Save Draft</button>
          <div className="flex items-center gap-6 order-1 md:order-2 w-full md:w-auto">
            <button className="text-gray-500 text-sm hidden md:block">Preview Listing</button>
            <button className="w-full md:w-auto bg-[#D2693E] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#b55630] transition-colors">
              Publish Experience
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}