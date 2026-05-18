"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// 1. DATA INICIAL AJUSTADA: Cambiado paymentMethods[] por el enum strict: "CASH" o "TRANSFER"
const INITIAL_BOOKINGS = [
  {
    id: "booking-cuid-1",
    date: "2026-06-15", 
    time: "8:00 AM",
    guests: 2,
    status: "PENDING",
    
    tourist: {
      fullName: "Sarah Johnson",
    },
    
    experience: {
      title: "Ancient Maya Cooking Class",
      paymentMethod: "CASH", // Alineado al enum estricto
    }
  },
  {
    id: "booking-cuid-2",
    date: "2026-06-24",
    time: "4:00 PM",
    guests: 4,
    status: "PENDING",
    tourist: {
      fullName: "Alex Ramirez",
    },
    experience: {
      title: "Surf Session at El Tunco",
      paymentMethod: "TRANSFER", // Alineado al enum estricto
    }
  }
];

export default function DashboardHost() {
  const router = useRouter();
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleConfirm = (id: string, touristName: string) => {
    setBookings(bookings.filter((b) => b.id !== id));
    setStatusMessage(`Success: Booking for ${touristName} has been confirmed and updated in your schedule.`);
  };

  const handleGoToCreateExperience = () => {
    router.push("/uploadMicroexperiences");
  };

  // Cálculos dinámicos reales basados en el estado de la aplicación
  const totalBookings = bookings.length;
  const totalGuests = bookings.reduce((sum, b) => sum + b.guests, 0);

  // Función utilitaria para obtener las iniciales del turista de forma dinámica
  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* LOGO LOQALLI EN NARANJA */}
        <div className="mb-8 flex justify-between items-center border-b border-gray-100 pb-4">
          <div className="text-[#D96B43] font-serif text-3xl font-black tracking-tight">
            Loqalli
          </div>
        </div>

        {/* HEADER: Bienvenida */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 font-semibold tracking-tight">
            Welcome to Loqalli
          </h1>
          <p className="text-gray-500 italic mt-2 text-lg">Are you ready to grow?</p>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <button 
              onClick={handleGoToCreateExperience}
              className="px-6 py-2 bg-[#D96B43] text-white font-semibold rounded-md text-sm tracking-wider uppercase hover:bg-[#c55d37] transition shadow-sm"
            >
              + Create New Availability
            </button>
          </div>
        </div>

        {/* NOTIFICACIÓN INTEGRADA */}
        {statusMessage && (
          <div className="mb-8 p-4 bg-orange-50 border-l-4 border-[#D96B43] text-[#D96B43] font-medium rounded-r-md text-sm">
            {statusMessage}
          </div>
        )}

        {/* SECCIÓN 1: Contadores dinámicos */}
        <div className="mb-10">
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="text-2xl font-serif font-medium text-gray-900">Today's Bookings</h2>
            <span className="text-xs font-bold text-gray-400 tracking-wider">JUNE 2026</span>
          </div>
          
          <div className="flex gap-16 text-left border-b border-gray-100 pb-6">
            <div>
              <p className={`text-5xl font-serif font-semibold ${totalBookings > 0 ? "text-gray-900" : "text-gray-300"}`}>
                {totalBookings}
              </p>
            </div>
            <div>
              <p className={`text-2xl font-serif ${totalGuests > 0 ? "text-gray-700" : "text-gray-300"}`}>
                {totalGuests} <span className="text-gray-400 font-sans text-lg ml-1">Total guests</span>
              </p>
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: Visitas / Tarjetas Pendientes */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-medium text-gray-900 mb-6">Visits Pending</h2>

          {bookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((booking) => (
                <div 
                  key={booking.id} 
                  className="border border-gray-200 rounded-lg p-6 bg-white flex flex-col justify-between shadow-sm hover:shadow-md transition"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-sm font-bold text-[#D96B43]">
                        {getInitials(booking.tourist.fullName)}
                      </div>
                      <div>
                        <h3 className="font-sans font-bold text-gray-900 text-lg leading-tight">
                          {booking.tourist.fullName}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">{booking.experience.title}</p>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500 space-y-1 mb-6">
                      <p>📅 Date: {booking.date}</p>
                      <p>⏰ Time: {booking.time}</p>
                      <p>👤 Guests: {booking.guests} people</p>
                      {/* Corregido para renderizar el método directo sin usar el método estricto .join() */}
                      <p className="pt-2 text-xs font-semibold text-gray-600">
                        💳 Preferred Payment:{" "}
                        <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-[11px] font-mono">
                          {booking.experience.paymentMethod}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleConfirm(booking.id, booking.tourist.fullName)}
                      className="flex-1 py-2 bg-[#D96B43] text-white font-medium text-sm rounded hover:bg-[#c55d37] transition"
                    >
                      Confirm Experience
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-8 text-center flex flex-col items-center justify-center space-y-4">
              <div className="text-4xl">📅</div>
              <div>
                <h3 className="text-[#D96B43] font-sans font-bold text-xl">No pending experiences or scheduled bookings</h3>
                <p className="text-gray-500 text-sm mt-1 max-w-md mx-auto">
                  You don't have any bookings from tourists at the moment. Start by creating a new experience to receive visitors.
                </p>
              </div>
              <button 
                onClick={handleGoToCreateExperience}
                className="px-6 py-2.5 bg-[#D96B43] text-white text-sm font-semibold rounded hover:bg-[#c55d37] transition uppercase tracking-wider"
              >
                Create An Experience
              </button>
            </div>
          )}
        </div>

        {/* SECCIÓN 3: Calendario Funcional e Interactivo */}
        <div className="border-t border-gray-100 pt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif font-medium text-gray-900">June 2026</h2>
          </div>

          <div className="grid grid-cols-7 text-center text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {calendarDays.map((day) => {
              const formattedDayStr = `2026-06-${day < 10 ? `0${day}` : day}`;
              const hasPendingBooking = bookings.some(b => b.date === formattedDayStr);

              return (
                <div 
                  key={day} 
                  className={`border py-4 rounded-md transition-all ${
                    hasPendingBooking 
                      ? "border-[#D96B43] bg-orange-50 font-bold text-[#D96B43] shadow-sm animate-pulse" 
                      : "border-gray-100 text-gray-400 bg-gray-50/50"
                  }`}
                >
                  {day}
                  {hasPendingBooking && (
                    <span className="block text-[9px] mt-1 tracking-tighter uppercase text-[#D96B43]">
                      Pending
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}