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

/**
 * Función para estandarizar el formato de hora a HH:MM AM/PM
 */
function formatTime(hour: string, min: string, period: string) {
  const h = hour.toString().padStart(2, '0');
  const m = min.toString().padStart(2, '0');
  return `${h}:${m} ${period}`;
}

async function uploadFiles(files: File[], bucket: string) {
  if (!files || files.length === 0) return [];

  const uploadPromises = files.map(async (file) => {
    if (!file || file.size === 0) return null;

    const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
    
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(cleanFileName, file, {
        contentType: file.type || 'image/jpeg',
        upsert: false
      });

    if (uploadError) {
      throw new Error(`Error subiendo a ${bucket}: ${uploadError.message}`);
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(cleanFileName);
    return data.publicUrl;
  });

  const results = await Promise.all(uploadPromises);
  return results.filter((url): url is string => url !== null);
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

    const imageFiles = formData.getAll('images') as File[];
    const imageUrls = await uploadFiles(imageFiles, 'experiences');

    const arrivalFiles = formData.getAll('arrivalImages') as File[];
    const arrivalImageUrls = await uploadFiles(arrivalFiles, 'arrival-guides');

    const rawPaymentMethod = formData.get('paymentMethod') as string;
    const paymentMethod: PaymentMethod = rawPaymentMethod === 'TRANSFER' ? PaymentMethod.TRANSFER : PaymentMethod.CASH;

    // Aplicando formateo de hora consistente
    const startTime = formatTime(
      formData.get('startHour') as string || "09",
      formData.get('startMin') as string || "00",
      formData.get('startPeriod') as string || "AM"
    );
    const endTime = formatTime(
      formData.get('endHour') as string || "12",
      formData.get('endMin') as string || "00",
      formData.get('endPeriod') as string || "PM"
    );

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
        slots: [`${startTime} - ${endTime}`],
        startTime: startTime,
        endTime: endTime,
        images: imageUrls, 
        arrivalImages: arrivalImageUrls,
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

export async function updateExperience(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token) throw new Error("No estás autenticado.");

    await jwtVerify(token, JWT_SECRET);
    const experienceId = formData.get('id') as string;

    const keptImages = JSON.parse(formData.get('existingImages') as string || "[]");
    const keptArrivalImages = JSON.parse(formData.get('existingArrivalImages') as string || "[]");

    const newImageUrls = await uploadFiles(formData.getAll('images') as File[], 'experiences');
    const newArrivalImageUrls = await uploadFiles(formData.getAll('arrivalImages') as File[], 'arrival-guides');

    const finalImages = [...keptImages, ...newImageUrls];
    const finalArrivalImages = [...keptArrivalImages, ...newArrivalImageUrls];

    const rawPaymentMethod = formData.get('paymentMethod') as string;
    const paymentMethod: PaymentMethod = rawPaymentMethod === 'TRANSFER' ? PaymentMethod.TRANSFER : PaymentMethod.CASH;

    // Aplicando formateo de hora consistente
    const startTime = formatTime(
      formData.get('startHour') as string || "09",
      formData.get('startMin') as string || "00",
      formData.get('startPeriod') as string || "AM"
    );
    const endTime = formatTime(
      formData.get('endHour') as string || "12",
      formData.get('endMin') as string || "00",
      formData.get('endPeriod') as string || "PM"
    );

    await prisma.experience.update({
      where: { id: experienceId },
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
        slots: [`${startTime} - ${endTime}`],
        startTime: startTime,
        endTime: endTime,
        paymentMethod: paymentMethod,
        images: finalImages,
        arrivalImages: finalArrivalImages,
      },
    });

    revalidatePath(`/explore`);
    return { success: true }; 

  } catch (error: any) {
    console.error("Error en updateExperience:", error);
    return { error: error.message || "Error al actualizar la experiencia." };
  }
}

export async function deleteExperience(experienceId: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;
    if (!token) throw new Error("No autenticado");

    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = payload.id as string;

    const experience = await prisma.experience.findUnique({
      where: { id: experienceId },
      select: { hostId: true }
    });

    if (experience?.hostId !== userId) {
      throw new Error("No tienes permiso para borrar esta experiencia");
    }

    await prisma.experience.delete({ where: { id: experienceId } });
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateProfileImage(userId: string, imageUrl: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { profileImage: imageUrl }
    });
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error("Error al actualizar la imagen de perfil:", error);
    return { error: "No se pudo actualizar la imagen de perfil" };
  }
}

export async function uploadProfileImageDirectly(userId: string, formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) throw new Error("No se recibió ningún archivo.");

    const fileName = `${userId}/${Date.now()}-avatar.jpg`;

    const { error: uploadError } = await supabase.storage
      .from('profile-images')
      .upload(fileName, file, {
        contentType: 'image/jpeg',
        upsert: true,
      });

    if (uploadError) throw new Error(`Error al subir: ${uploadError.message}`);

    const { data } = supabase.storage
      .from('profile-images')
      .getPublicUrl(fileName);

    await prisma.user.update({
      where: { id: userId },
      data: { profileImage: data.publicUrl }
    });

    revalidatePath('/dashboard');
    return { success: true, url: data.publicUrl };
  } catch (error: any) {
    console.error("Error en uploadProfileImageDirectly:", error);
    return { error: error.message };
  }
}

export async function createBooking(data: any) {
  // 1. Obtener token y verificar usuario en el servidor
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;
  if (!token) throw new Error("No autenticado");

  const { payload } = await jwtVerify(token, JWT_SECRET);
  const touristId = payload.id as string;

  return await prisma.$transaction(async (tx) => {
    const experience = await tx.experience.findUnique({
      where: { id: data.experienceId },
      select: { pricePerPerson: true },
    });

    if (!experience) throw new Error("Experiencia no encontrada");

    // 2. Usar el touristId obtenido del token
    const booking = await tx.booking.create({
      data: {
        experienceId: data.experienceId,
        touristId: touristId, 
        date: data.date,
        time: data.time,
        guests: data.guests,
        status: "CONFIRMED",
      },
    });

    if (data.bankInfo) {
      await tx.bankInfo.upsert({
        where: { userId: touristId },
        update: {
          accountHolder: data.bankInfo.accountHolder,
          bankName: data.bankInfo.bankName,
          accountType: data.bankInfo.accountType,
          accountNumber: data.bankInfo.accountNumber,
          routingNumber: data.bankInfo.routingNumber,
        },
        create: {
          userId: touristId,
          ...data.bankInfo,
        },
      });
    }

    const subtotal = experience.pricePerPerson * data.guests;
    const loqalliFee = subtotal * 0.05;
    const hostPayout = subtotal - loqalliFee; 

    await tx.transaction.create({
      data: {
        bookingId: booking.id,
        touristId: touristId,
        totalAmount: subtotal,
        loqalliFee: loqalliFee,
        hostPayout: hostPayout,
        paymentStatus: "COMPLETED", 
        payoutStatus: "PENDING",   
      },
    });

    return booking;
  });
}