import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BookingStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "");

export async function POST(request: Request) {
  try {
    // 1. Validate session
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." }, 
        { status: 401 }
      );
    }

    // 2. Extract touristId from JWT
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const touristId = payload.id as string;

    // 3. Extract required fields from request body
    const body = await request.json();
    const { experienceId, date, time, guests } = body;

    // Validate presence of all required fields
    if (!experienceId || !date || !time || !guests) {
      return NextResponse.json(
        { error: "Missing required booking fields: experienceId, date, time, guests" }, 
        { status: 400 }
      );
    }

    // 4. Create the booking record
    const newBooking = await prisma.booking.create({
      data: {
        touristId: touristId,
        experienceId: experienceId,
        date: date,
        time: time,
        guests: guests,
        status: BookingStatus.PENDING,
      },
    });

    return NextResponse.json(
      { success: true, booking: newBooking }, 
      { status: 201 }
    );

  } catch (error: any) {
    console.error("❌ API Error:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message }, 
      { status: 500 }
    );
  }
}