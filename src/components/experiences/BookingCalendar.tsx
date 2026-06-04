"use client";
import { useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format, isBefore, startOfToday } from "date-fns";
import { useRouter } from "next/navigation";
import "react-day-picker/dist/style.css";

export default function BookingCalendar({ 
  experienceId, 
  maxParticipants, 
  bookings,
  availableDays = [], // Recibe ['2026-06-04', '2026-06-15', ...]
  isCheckout = false, 
  selectedDate,
  onDateChange,
  guests = 1,
  onGuestsChange
}: { 
  experienceId: string, 
  maxParticipants: number, 
  bookings: any[],
  availableDays?: string[], 
  isCheckout?: boolean,
  selectedDate?: Date,
  onDateChange?: (date: Date) => void,
  guests?: number,
  onGuestsChange?: (guests: number) => void
}) {
  const router = useRouter();

  const getSpotsForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const booked = bookings
      .filter((b) => b.date === dateStr)
      .reduce((acc, curr) => acc + curr.guests, 0);
    return maxParticipants - booked;
  };

  // NUEVA LÓGICA: Compara contra el arreglo de fechas (YYYY-MM-DD)
  const isDayAllowed = (date: Date) => {
    if (!availableDays || availableDays.length === 0) return true;
    const dateStr = format(date, "yyyy-MM-dd");
    return availableDays.includes(dateStr);
  };

  const spotsLeft = selectedDate ? getSpotsForDate(selectedDate) : 0;

  useEffect(() => {
    if (selectedDate && guests > spotsLeft) {
      onGuestsChange?.(Math.max(1, spotsLeft));
    }
  }, [selectedDate, spotsLeft, guests, onGuestsChange]);

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={(d) => d && onDateChange?.(d)}
        disabled={(date) => 
          isBefore(date, startOfToday()) || // Deshabilita días pasados
          !isDayAllowed(date) ||           // Deshabilita días no permitidos en BD
          getSpotsForDate(date) <= 0       // Deshabilita si ya no hay cupo
        }
        className="mx-auto"
      />
      
      {selectedDate && (
        <div className="mt-6 space-y-4 border-t pt-6">
          <p className="text-sm font-bold text-[#D2693E]">
            {format(selectedDate, "PPPP")} • {spotsLeft} cupos disponibles
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Personas:</span>
            <input
              type="number"
              min="1"
              max={spotsLeft}
              value={guests}
              onChange={(e) => onGuestsChange?.(Math.max(1, Math.min(spotsLeft, parseInt(e.target.value) || 1)))}
              className="w-16 p-2 border rounded-lg"
            />
          </div>

          {!isCheckout && (
            <button
              onClick={() => {
                const dateStr = format(selectedDate, "yyyy-MM-dd");
                router.push(`/checkout/${experienceId}?date=${dateStr}&guests=${guests}`);
              }}
              disabled={spotsLeft === 0}
              className="w-full bg-[#D2693E] text-white py-3 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50"
            >
              Reservar ahora
            </button>
          )}
        </div>
      )}
    </div>
  );
}