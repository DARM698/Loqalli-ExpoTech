// src/components/experiences/BookingWidget.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function BookingWidget({ experienceId, maxParticipants }: { experienceId: string, maxParticipants: number }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [guests, setGuests] = useState(1);
  const router = useRouter();

  const handleBook = () => {
    if (!selectedDate) return alert("Por favor selecciona una fecha");
    
    // Pasamos ID, FECHA y GUESTS en la URL
    const dateStr = selectedDate.toISOString();
    router.push(`/checkout?id=${experienceId}&date=${dateStr}&guests=${guests}`);
  };

  return (
    <div className="sticky top-24 border p-8 space-y-6 bg-white shadow-sm rounded-2xl">
      <DayPicker mode="single" selected={selectedDate} onSelect={setSelectedDate} />
      
      <div className="flex justify-between items-center">
        <span>Personas:</span>
        <input 
          type="number" min="1" max={maxParticipants} value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-16 border rounded p-1"
        />
      </div>

      <button onClick={handleBook} className="w-full bg-[#D2693E] text-white py-4 rounded-lg">
        Book this experience
      </button>
    </div>
  );
}