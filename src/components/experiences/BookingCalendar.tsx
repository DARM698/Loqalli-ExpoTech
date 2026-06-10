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
  availableDays = [],
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
        <div className="flex items-center gap-3">
  <button
    type="button"
    onClick={() => onGuestsChange?.(Math.max(1, guests - 1))}
    disabled={guests <= 1}
    className="w-10 h-10 border rounded"
  >
    -
  </button>

  <span className="w-8 text-center">{guests}</span>

  <button
    type="button"
    onClick={() => onGuestsChange?.(Math.min(spotsLeft, guests + 1))}
    disabled={guests >= spotsLeft}
    className="w-10 h-10 border rounded"
  >
    +
  </button>
</div>
      )}
    </div>
  );
}