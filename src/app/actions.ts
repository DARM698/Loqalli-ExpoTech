// src/app/actions.ts
"use server"

import { prisma } from "@/lib/prisma" // Asegúrate de que esta ruta a tu cliente de prisma sea correcta
import { revalidatePath } from "next/cache"

export async function createExperience(formData: any) {
  try {
    const experience = await prisma.experience.create({
      data: {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        pricePerPerson: parseFloat(formData.pricePerPerson),
        maxParticipants: parseInt(formData.maxParticipants),
        address: formData.address,
        days: formData.days,
        status: "PUBLISHED", // O "DRAFT" si prefieres
      },
    })
    
    revalidatePath("/my-microexperiences")
    return { success: true, id: experience.id }
  } catch (error) {
    console.error("Error creating experience:", error)
    return { success: false, error: "Error al guardar en Supabase" }
  }
}