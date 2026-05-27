'use server';

import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { PaymentMethod } from '@prisma/client';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'un_secret_muy_largo_y_seguro_de_mas_de_32_caracteres'
);

// Función auxiliar para mantener el código limpio y reutilizable
async function uploadFiles(files: File[], bucket: string) {
  const urls: string[] = [];
  for (const file of files) {
    if (!file || file.size === 0) continue;

    const fileExtension = file.name.split('.').pop();
    const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
    
    const { error: uploadError } = await supabase.storage
      .from(bucket) 
      .upload(cleanFileName, file, {
        contentType: 'image/jpg',
        upsert: false
      });

    if (uploadError) {
      console.error(`Error subiendo a Supabase (${bucket}):`, uploadError.message);
      throw new Error(`Error al subir imagen: ${uploadError.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(cleanFileName);

    urls.push(publicUrl);
  }
  return urls;
}

export async function createExperience(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token) {
      throw new Error("No estás autenticado. Por favor inicia sesión de nuevo.");
    }

    let userId: string;
    let userRole: string;
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      userId = payload.id as string;
      userRole = payload.role as string;
    } catch (e) {
      throw new Error("Tu sesión ha expirado o es inválida.");
    }

    if (userRole !== 'HOST') {
      throw new Error("No tienes permisos para crear experiencias.");
    }

    // Procesar imágenes normales
    const imageFiles = formData.getAll('images') as File[];
    const imageUrls = await uploadFiles(imageFiles, 'experiences');

    // Procesar imágenes de llegada
    const arrivalFiles = formData.getAll('arrivalImages') as File[];
    const arrivalImageUrls = await uploadFiles(arrivalFiles, 'arrival-guides');

    const rawPaymentMethod = formData.get('paymentMethod') as string;
    const paymentMethod: PaymentMethod = rawPaymentMethod === 'TRANSFER' 
      ? PaymentMethod.TRANSFER 
      : PaymentMethod.CASH;

    await prisma.experience.create({
      data: {
        title: formData.get('title') as string,
        category: formData.get('category') as string,
        description: formData.get('description') as string,
        pricePerPerson: parseFloat(formData.get('price') as string || "0"),
        maxParticipants: parseInt(formData.get('participants') as string || "1"),
        address: formData.get('address') as string,
        lat: parseFloat(formData.get('lat') as string || "0"),
        lng: parseFloat(formData.get('lng') as string || "0"),
        days: JSON.parse(formData.get('selectedDays') as string || "[]"),
        slots: [`${formData.get('startHour')}:${formData.get('startMin')} ${formData.get('startPeriod')} - ${formData.get('endHour')}:${formData.get('endMin')} ${formData.get('endPeriod')}`], 
        images: imageUrls, 
        arrivalImages: arrivalImageUrls, // Nuevo campo añadido
        status: 'PUBLISHED',
        paymentMethod: paymentMethod,
        host: {
          connect: { id: userId },
        },
      },
    });

    revalidatePath('/');
    return { success: true };

  } catch (error: any) {
    console.error("Error detallado en createExperience:", error);
    return { error: error.message || "Error al guardar la experiencia." };
  }
}