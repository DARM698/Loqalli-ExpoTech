import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rating, comment, experienceId, authorId, targetUserId } = body;


    if (!rating || !experienceId || !authorId || !targetUserId) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }


    const newReview = await prisma.review.create({
      data: {
        rating: Number(rating),
        comment: comment,
        experienceId: experienceId,
        authorId: authorId,
        targetUserId: targetUserId,
      },
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error("Error en la API de reseñas:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}