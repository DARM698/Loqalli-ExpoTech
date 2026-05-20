'use client';
import { DayPicker } from 'react-day-picker';
import { parseISO } from 'date-fns';

export default function AvailabilityDisplay({ availableDates }: { availableDates: string[] }) {
  // Convertimos los strings de la DB de vuelta a objetos Date
  const selectedDays = availableDates.map(dateStr => parseISO(dateStr));

  return (
    <DayPicker
      mode="multiple"
      selected={selectedDays}
      // Deshabilitamos la interacción para que sea solo vista
      onSelect={() => {}} 
      modifiers={{ available: selectedDays }}
      modifiersStyles={{
        available: { color: '#D2693E', fontWeight: 'bold' }
      }}
      className="mx-auto"
    />
  );
}