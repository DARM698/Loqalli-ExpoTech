import React from "react";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
import DashboardTabsClient from "./DashboardTabsClient";

export default async function DashboardHostPage() {

  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">You are not authenticated. Please log in.</p>
      </div>
    );
  }

  const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'un_secret_muy_largo_y_seguro_de_mas_de_32_caracteres'
  );

  const { payload } = await jwtVerify(token, JWT_SECRET);
  const currentHostId = payload.id as string;
  const role = payload.role as 'TOURIST' | 'HOST';


  let bookings: any[] = [];
  try {
    bookings = await (prisma as any).booking.findMany({
      where: {
        Experience: {
          hostId: currentHostId,
        },
      },
      include: {
        User: true,
        Experience: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    }) || [];
  } catch (e) {
    bookings = [];
  }

  let reviews: any[] = [];
  try {
    reviews = await (prisma as any).review.findMany({
      where: {
        targetUserId: currentHostId,
      },
      include: {
        author: true,
      },
    }) || [];
  } catch (e) {
    reviews = [];
  }

  
  const safeBookings = bookings.map((b: any) => {
    // Formatear fecha de forma segura
    let dateStr = "2026-06-05";
    if (b?.date) {
      dateStr = b.date instanceof Date ? b.date.toISOString().split('T')[0] : String(b.date);
    }

    return {
      id: b?.id || Math.random().toString(),
      date: dateStr,
      time: b?.time || "8:00 AM",
      guests: Number(b?.guests || 1),
      status: b?.status || "PENDING", 
      tourist: { 
        fullName: b?.User?.fullName || b?.User?.name || "Tourist Client" 
      },
      experience: {
        title: b?.Experience?.title || "Microexperience",
      },
    };
  });

  const safeReviews = reviews.map((r: any) => ({
    id: r?.id || Math.random().toString(),
    rating: Number(r?.rating || 5),
    comment: r?.comment || r?.text || "",
    author: { 
      fullName: r?.author?.fullName || r?.author?.name || "Anonymous User" 
    },
  }));

  const totalBookings = safeBookings.length;
  const totalGuests = safeBookings.reduce((sum, b) => sum + b.guests, 0);

  return (
    <DashboardTabsClient
      bookings={safeBookings}
      reviews={safeReviews}
      totalBookings={totalBookings}
      totalGuests={totalGuests}
      role={role}
      userId={currentHostId}
    />
  );
}