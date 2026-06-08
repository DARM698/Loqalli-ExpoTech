"use client";

import React, { useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { confirmBooking } from "@/app/actions";
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight,
  CreditCard,
  MessageSquare
} from "lucide-react";

interface NavbarUserProps {
  role: 'TOURIST' | 'HOST';
  userId: string;
}

function NavbarUser({ role, userId }: NavbarUserProps) {
  const pathname = usePathname();
  const isTourist = role === 'TOURIST';
  const profileHref = `/profile/${userId}`;

  const navLinks = isTourist
    ? [
        { name: 'Explore', href: '/explore' },
        { name: 'About us', href: '/aboutUs' },
        { name: 'Profile', href: profileHref },
      ]
    : [
        { name: 'Explore', href: '/explore' },
        { name: 'Create Experience', href: '/uploadMicroexperiences' },
        { name: 'Agenda / Calendar', href: '/dashboard' },
        { name: 'Profile', href: profileHref },
      ];

  return (
    <nav className="w-full bg-white border-b border-[#F3D9CF] px-6 py-4 flex items-center justify-between sticky top-0 z-[100]">
      <div className="flex items-center gap-12">
        <Link href={isTourist ? "/explore" : "/host"} className="text-2xl font-serif font-bold text-[#D2693E]">
          Loqalli
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-[#D2693E] ${
                pathname === link.href ? 'text-[#D2693E]' : 'text-[#4A3933]/70'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

interface DashboardTabsClientProps {
  bookings: any[];
  reviews: any[];
  totalBookings: number;
  totalGuests: number;
  role: 'TOURIST' | 'HOST';
  userId: string;
}

export default function DashboardTabsClient({
  bookings: initialBookings,
  reviews,
  totalBookings,
  totalGuests,
  role,
  userId,
}: DashboardTabsClientProps) {
  const router = useRouter();
  const [bookings, setBookings] = useState(initialBookings);
  const [activeTab, setActiveTab] = useState<"en-curso" | "finalizadas">("en-curso");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Fecha actual de control (Hoy es 7 de Junio de 2026)
  const todayStr = new Date().toISOString().split('T')[0];

  // FILTRO AUTOMÁTICO: Las reservas pasadas van directamente a "Finalizadas"
  const activeBookings = bookings.filter((b) => b.date >= todayStr);
  const finishedBookings = bookings.filter((b) => b.date < todayStr);

  const handleConfirm = (id: string, touristName: string) => {
    startTransition(async () => {
      try {
        const result = await confirmBooking(id);
        if (result?.success) {
          setBookings((prev) =>
            prev.map((b) => (b.id === id ? { ...b, status: "CONFIRMED" } : b))
          );
          setStatusMessage(`Success: Booking for ${touristName} has been confirmed.`);
          setTimeout(() => setStatusMessage(null), 5000);
        } else {
          setStatusMessage("Error: Could not confirm the booking.");
        }
      } catch (error) {
        setStatusMessage("Error: An unexpected error occurred.");
      }
    });
  };

  const handleGoToCreateExperience = () => {
    router.push("/uploadMicroexperiences");
  };

  const getInitials = (name: string) => {
    if (!name) return "??";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-white">
      <NavbarUser role={role} userId={userId} />

      <div className="max-w-6xl mx-auto p-6 md:p-12">
        {statusMessage && (
          <div className="mb-8 p-4 bg-orange-50 border-l-4 border-[#D96B43] text-[#D96B43] flex items-center gap-3 font-medium rounded-r-md text-sm">
            <CheckCircle size={18} />
            {statusMessage}
          </div>
        )}

        <div className="flex gap-8 border-b border-gray-200 mb-8 font-sans">
          <button
            onClick={() => setActiveTab("en-curso")}
            className={`pb-3 text-sm font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeTab === "en-curso"
                ? "border-b-2 border-[#D96B43] text-[#D96B43]"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Clock size={16} /> En Curso ({activeBookings.length})
          </button>
          <button
            onClick={() => setActiveTab("finalizadas")}
            className={`pb-3 text-sm font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeTab === "finalizadas"
                ? "border-b-2 border-[#D96B43] text-[#D96B43]"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <CheckCircle size={16} /> Finalizadas ({finishedBookings.length})
          </button>
        </div>

        {activeTab === "en-curso" ? (
          <div>
            <div className="mb-10">
              <div className="flex justify-between items-baseline mb-4">
                <h2 className="text-2xl font-serif font-medium text-gray-900">Today's Bookings</h2>
                <span className="text-xs font-bold text-gray-400 tracking-wider flex items-center gap-1">
                  <Calendar size={14} /> JUNE 2026
                </span>
              </div>
              <div className="flex gap-16 text-left border-b border-gray-100 pb-6">
                <div>
                  <p className={`text-5xl font-serif font-semibold ${activeBookings.length > 0 ? "text-gray-900" : "text-gray-300"}`}>
                    {activeBookings.length}
                  </p>
                </div>
                <div>
                  <p className={`text-2xl font-serif flex items-center gap-2 ${activeBookings.length > 0 ? "text-gray-700" : "text-gray-300"}`}>
                    {activeBookings.reduce((sum, b) => sum + (b.guests || 0), 0)}{" "}
                    <Users size={20} className="text-gray-400" />
                    <span className="text-gray-400 font-sans text-lg ml-1">Total guests</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-serif font-medium text-gray-900 mb-6">Visits Pending</h2>
              {activeBookings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeBookings.map((booking) => (
                    <div key={booking?.id} className="border border-gray-200 rounded-lg p-6 bg-white flex flex-col justify-between shadow-sm hover:shadow-md transition">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-sm font-bold text-[#D96B43]">
                            {getInitials(booking?.tourist?.fullName)}
                          </div>
                          <div>
                            <h3 className="font-sans font-bold text-gray-900 text-lg leading-tight">{booking?.tourist?.fullName}</h3>
                            <p className="text-xs text-gray-400 mt-0.5">{booking?.experience?.title}</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 space-y-2 mb-6">
                          <p className="flex items-center gap-2"><Calendar size={14} className="text-[#D96B43]" /> {booking?.date}</p>
                          <p className="flex items-center gap-2"><Clock size={14} className="text-[#D96B43]" /> {booking?.time}</p>
                          <p className="flex items-center gap-2"><Users size={14} className="text-[#D96B43]" /> {booking?.guests} guests</p>
                          <p className="pt-2 text-xs font-semibold text-gray-600 flex items-center gap-2">
                            <CreditCard size={14} /> Status: <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{booking?.status}</span>
                          </p>
                        </div>
                      </div>
                      {booking?.status === "PENDING" && (
                        <button onClick={() => handleConfirm(booking?.id, booking?.tourist?.fullName)} disabled={isPending} className="w-full py-2 font-medium text-sm rounded transition bg-[#D96B43] text-white hover:bg-[#c55d37] flex items-center justify-center gap-2">
                          {isPending ? "Processing..." : <><CheckCircle size={16} /> Confirm</>}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-8 text-center flex flex-col items-center gap-4">
                  <AlertCircle className="text-[#D96B43]" size={40} />
                  <h3 className="text-[#D96B43] font-sans font-bold text-xl">No active bookings</h3>
                  <button onClick={handleGoToCreateExperience} className="px-6 py-2 bg-[#D96B43] text-white text-sm font-semibold rounded hover:bg-[#c55d37] flex items-center gap-2">
                    Create An Experience <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-serif font-medium text-gray-900 mb-6">Completed Visits</h2>
              {finishedBookings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {finishedBookings.map((booking) => (
                    <div key={booking?.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50/70 flex flex-col justify-between shadow-sm">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                            {getInitials(booking?.tourist?.fullName)}
                          </div>
                          <div>
                            <h3 className="font-sans font-bold text-gray-800 text-lg leading-tight">{booking?.tourist?.fullName}</h3>
                            <p className="text-xs text-gray-400 mt-0.5">{booking?.experience?.title}</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-400 space-y-1">
                          <p>📅 Date completed: {booking?.date}</p>
                          <p>👤 Group size: {booking?.guests} people</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 bg-gray-50 border border-gray-100 text-center text-gray-400 text-sm rounded-lg">
                  No completed experiences found prior to today's date.
                </div>
              )}
            </div>

            {/* INTEGRACIÓN DE REVIEWS DE MÓNICA */}
            <div className="border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-serif font-medium text-gray-900 mb-2 flex items-center gap-2">
                <MessageSquare size={22} className="text-[#D96B43]" /> What people say about you
              </h2>
              <p className="text-sm text-gray-400 mb-6 font-sans">Opinions collected from your finished tours.</p>
              
              {reviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reviews.map((rev) => (
                    <div key={rev?.id} className="border border-gray-100 rounded-2xl p-6 bg-[#FCFAF6] shadow-sm space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-800 text-sm">{rev?.author?.fullName || "Anonymous"}</span>
                        <span className="text-[#D96B43] text-xs">{"★".repeat(rev?.rating || 5)}</span>
                      </div>
                      <p className="text-gray-600 italic text-sm font-serif">"{rev?.comment || ""}"</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic text-sm font-serif">No reviews available yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}