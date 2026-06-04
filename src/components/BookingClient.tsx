'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import BookingCalendar from '@/components/experiences/BookingCalendar';

export default function BookingClient({ experience }: { experience: any }) {
  const router = useRouter();
  const [guests, setGuests] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  
  // Cálculo simple del subtotal
  const subtotal = experience.pricePerPerson * guests;

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-[#4A3933]">
      <h1 className="text-4xl font-serif font-bold mb-8">Book {experience.title}</h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Selector de Calendario y Personas */}
        <section>
          <BookingCalendar 
            experienceId={experience.id}
            maxParticipants={experience.maxParticipants}
            bookings={experience.Booking || []} // Aseguramos que no sea undefined
            availableDays={experience.days || []} // Recibe el arreglo ['2026-06-04', ...]
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            guests={guests}
            onGuestsChange={setGuests}
          />
        </section>

        {/* Resumen del Precio (Interactivo) */}
        <aside className="bg-[#F3D9CF]/10 p-8 rounded-2xl border border-[#F3D9CF] h-fit">
          <h2 className="text-xl font-bold mb-6">Price Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>{guests} people</span>
              <span className="font-bold">${subtotal}</span>
            </div>
            <div className="flex justify-between border-t pt-4 border-[#F3D9CF]">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-2xl text-[#D2693E]">${subtotal}</span>
            </div>
          </div>

          <button 
            onClick={() => {
              if (!selectedDate) return;
              const dateStr = format(selectedDate, "yyyy-MM-dd");
              router.push(`/checkout/${experience.id}?date=${dateStr}&guests=${guests}`);
            }}
            disabled={!selectedDate}
            className="w-full mt-8 bg-[#D2693E] text-white py-4 rounded-xl font-bold hover:bg-[#b05832] transition disabled:opacity-50"
          >
            Continue to Checkout
          </button>
        </aside>
      </div>
    </main>
  );
}