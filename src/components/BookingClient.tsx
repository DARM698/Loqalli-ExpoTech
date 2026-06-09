'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import BookingCalendar from '@/components/experiences/BookingCalendar';

export default function BookingClient({ experience }: { experience: any }) {
  const router = useRouter();
  const [guests, setGuests] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  
  // 1. Cálculo dinámico de cupos disponibles en el cliente para UI
  const spotsLeft = useMemo(() => {
    if (!selectedDate) return 0;
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    
    // Suma los invitados de las reservas existentes para esta fecha específica
    const bookedForDate = experience.Booking?.reduce((acc: number, b: any) => {
      return b.date === dateStr ? acc + b.guests : acc;
    }, 0) || 0;
    
    return experience.maxParticipants - bookedForDate;
  }, [selectedDate, experience.Booking, experience.maxParticipants]);

  // 2. Validación de estado para el botón
  const isAvailable = selectedDate && spotsLeft > 0;
  const isOverCapacity = guests > spotsLeft;
  const canProceed = isAvailable && !isOverCapacity;

  const subtotal = experience.pricePerPerson * guests;

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-[#4A3933]">
      <h1 className="text-4xl font-serif font-bold mb-8">Book {experience.title}</h1>

      <div className="grid md:grid-cols-2 gap-12">
        <section>
          <BookingCalendar 
            experienceId={experience.id}
            maxParticipants={experience.maxParticipants}
            bookings={experience.Booking || []}
            availableDays={experience.days || []}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            guests={guests}
            onGuestsChange={(newGuests) => {
                // Aseguramos que el input del calendario respete el límite de spotsLeft
                setGuests(Math.min(newGuests, spotsLeft));
            }}
          />
          {selectedDate && (
            <p className={`mt-2 text-sm font-semibold ${spotsLeft === 0 ? 'text-red-500' : 'text-green-600'}`}>
              {spotsLeft === 0 ? "Sold out for this date" : `${spotsLeft} spots available`}
            </p>
          )}
        </section>

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
              if (!selectedDate || !canProceed) return;
              const dateStr = format(selectedDate, "yyyy-MM-dd");
              router.push(`/checkout/${experience.id}?date=${dateStr}&guests=${guests}`);
            }}
            disabled={!canProceed}
            className="w-full mt-8 bg-[#D2693E] text-white py-4 rounded-xl font-bold hover:bg-[#b05832] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {!selectedDate ? "Select a date" : isOverCapacity ? "Not enough spots" : "Continue to Checkout"}
          </button>
        </aside>
      </div>
    </main>
  );
}