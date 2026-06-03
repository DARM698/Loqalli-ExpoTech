"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBooking } from "@/app/actions";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface ExperienceProps {
  id: string;
  title: string;
  pricePerPerson: number;
  maxParticipants: number;
  date: string;
  time: string;
}

export default function CheckoutPage({ experience }: { experience: ExperienceProps }) {
  const router = useRouter();
  
  // ESTADOS
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(experience.date));
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);

  // CÁLCULOS
  const subtotal = experience.pricePerPerson * guests;
  const taxes = subtotal * 0.05; // 5% fee
  const total = subtotal + taxes;

  const handleGuests = (increment: boolean) => {
    setGuests(prev => increment 
      ? Math.min(prev + 1, experience.maxParticipants) 
      : Math.max(prev - 1, 1)
    );
  };

  // LÓGICA DE RESERVA
  const handleReservation = async () => {
    setLoading(true);
    try {
      // Llamada al Server Action (asegúrate de que el touristId venga de tu Auth)
      await createBooking({
        experienceId: experience.id,
        touristId: "USER_ID_AQUI", 
        date: selectedDate.toLocaleDateString(),
        time: experience.time,
        guests: guests,
      });

      if (paymentMethod === "cash") {
        router.push("/cash-receipt");
      } else {
        router.push(`/pagoexitoso?guests=${guests}&date=${selectedDate.toLocaleDateString()}`);
      }
    } catch (error: any) {
      alert(error.message || "Error al procesar la reserva");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FFFFFF] px-10 py-10">
      <section className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-serif text-[#2E2A27] mb-10">Finalize reservation</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            
            {/* CALENDARIO */}
            <div className="bg-white border rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-serif text-[#2E2A27] mb-4">Select Date</h2>
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="border rounded-xl p-4"
              />
            </div>

            {/* PERSONAS */}
            <div className="bg-white border rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-serif text-[#2E2A27]">Number of people</h2>
                  <p className="text-sm text-gray-500">Max {experience.maxParticipants} participants</p>
                </div>
                <div className="border-2 w-44 px-4 py-3 flex items-center justify-between rounded-xl">
                  <button onClick={() => handleGuests(false)} className="text-[#DA653B] text-xl">-</button>
                  <span className="text-gray-500 font-medium">{guests}</span>
                  <button onClick={() => handleGuests(true)} className="text-[#DA653B] text-xl">+</button>
                </div>
              </div>
            </div>

            {/* PAGO */}
            <div className="bg-white border rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-serif text-[#2E2A27] mb-6">Payment method</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {["card", "chivo", "cash"].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`border rounded-2xl p-5 text-left transition ${paymentMethod === method ? "border-orange-500 bg-orange-50" : "border-gray-700"}`}
                  >
                    {method.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR RESUMEN */}
          <div>
            <div className="bg-white rounded-xl border shadow-sm p-6 sticky top-10">
              <h2 className="text-2xl font-serif text-[#2E2A27] mb-2">{experience.title}</h2>
              <div className="text-sm text-gray-500 mb-6">
                <p>Date: {selectedDate.toLocaleDateString()}</p>
                <p>Time: {experience.time}</p>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-500">
                  <span>{guests} x ${experience.pricePerPerson}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-2xl pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleReservation}
                disabled={loading}
                className="w-full mt-6 bg-orange-600 text-white py-4 rounded-xl hover:bg-orange-700 transition disabled:opacity-50"
              >
                {loading ? "Processing..." : "Complete Reservation"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}