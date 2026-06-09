import React from "react";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
import DashboardTabsClient from "./DashboardTabsClient";
// Importamos los tipos necesarios de Prisma para el autocompletado y validación
import { Booking, User, Experience, Review } from "@prisma/client";

export default async function DashboardHostPage() {
  // 1. Obtener el token de la cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No estás autenticado. Por favor, inicia sesión.</p>
      </div>
    );
  }

  const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'un_secret_muy_largo_y_seguro_de_mas_de_32_caracteres'
  );

  const { payload } = await jwtVerify(token, JWT_SECRET);
  const currentHostId = payload.id as string;
  const role = payload.role as 'TOURIST' | 'HOST';

  const bookings = await prisma.booking.findMany({
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
  });

  const reviews = await prisma.review.findMany({
    where: {
      targetUserId: currentHostId,
    },
    include: {
      author: true,
    },
  });

  // Tipamos 'b' combinando el modelo Booking con sus relaciones correspondientes
  const safeBookings = bookings.map((b: Booking & { User: User; Experience: Experience }) => ({
    id: b.id,
    date: b.date,
    time: b.time,
    guests: b.guests,
    status: b.status, 
    tourist: { fullName: b.User.fullName },
    experience: {
      title: b.Experience.title,
    },
  }));

  // Tipamos 'r' combinando el modelo Review con el autor de la reseña por si acaso
  const safeReviews = reviews.map((r: Review & { author: User }) => ({
    id: r.id,
    rating: r.rating,
    comment: r.comment || "",
    author: { fullName: r.author.fullName },
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