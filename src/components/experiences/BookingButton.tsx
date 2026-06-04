"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingButton({ experience }: { experience: any }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBooking = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experienceId: experience.id,
          date: experience.slots[0] || "2026-06-20", // Ajustar según disponibilidad
          time: "10:00",
          guests: 1,
        }),
      });

      const data = await response.json();

      if (data.success) {
        router.push(`/payments?bookingId=${data.booking.id}`);
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      alert("Error processing your booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleBooking}
      disabled={loading}
      className="w-full bg-[#D17842] hover:bg-[#b86332] text-white py-3.5 rounded-lg font-medium transition shadow-sm text-sm tracking-wide disabled:opacity-50"
    >
      {loading ? "Processing..." : `Book this experience (Pay with ${experience.paymentMethod})`}
    </button>
  );
}