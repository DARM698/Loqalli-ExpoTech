'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createExperience(formData: FormData) {
  // Usamos un bloque try/catch para evitar que el proceso colapse y mande errores de red al cliente
  try {
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string || "0");
    const participants = parseInt(formData.get('participants') as string || "1");
    const address = formData.get('address') as string;
    const lat = parseFloat(formData.get('lat') as string || "0");
    const lng = parseFloat(formData.get('lng') as string || "0");

    // Formateo de Horarios
    const sHour = formData.get('startHour')?.toString() || "12";
    const sMin = formData.get('startMin')?.toString().padStart(2, '0') || "00";
    const sPeriod = formData.get('startPeriod')?.toString() || "AM";
    const eHour = formData.get('endHour')?.toString() || "12";
    const eMin = formData.get('endMin')?.toString().padStart(2, '0') || "00";
    const ePeriod = formData.get('endPeriod')?.toString() || "PM";

    const timeRange = `${sHour}:${sMin} ${sPeriod} - ${eHour}:${eMin} ${ePeriod}`;

    // Manejo de Fechas (parseamos el JSON enviado desde el cliente)
    const daysRaw = formData.get('selectedDays') as string;
    const selectedDays = daysRaw ? JSON.parse(daysRaw) : [];

    // Manejo de Imágenes 
    // Nota: Por ahora guardas strings con el nombre. 
    // Si usas Cloudinary, aquí deberías insertar la lógica de subida.
    const imageFiles = formData.getAll('images') as File[];
    const imageUrls = imageFiles
      .filter(file => file instanceof File && file.name !== 'undefined' && file.size > 0)
      .map(file => `/uploads/${file.name}`);

    // Guardado en la Base de Datos con Prisma
    await prisma.experience.create({
      data: {
        title,
        category,
        description,
        pricePerPerson: price,
        maxParticipants: participants,
        address,
        lat,
        lng,
        days: selectedDays,
        slots: [timeRange], 
        images: imageUrls,
        status: 'PUBLISHED',
      },
    });

  } catch (error) {
    // Si algo falla, lo vemos en la terminal del servidor
    console.error("Error detallado en DB:", error);
    
    // Devolvemos el error al cliente de forma controlada
    return { 
      error: "No se pudo crear la experiencia. Verifica que todos los campos sean correctos." 
    };
  }

  // Si no entró al catch, revalidamos la cache y redirigimos
  revalidatePath('/'); 
  return { success: true };
}