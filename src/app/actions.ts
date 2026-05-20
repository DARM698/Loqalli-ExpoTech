'use server';

import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
// Importamos el Enum directo de Prisma para mantener el tipado estricto
import { PaymentMethod } from '@prisma/client';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'un_secret_muy_largo_y_seguro_de_mas_de_32_caracteres'
);

export async function createExperience(formData: FormData) {
  try {
    // 🌟 LEER COOKIE DE SESIÓN PROPIA EN LUGAR DE SUPABASE AUTH
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token) {
      throw new Error("No estás autenticado. Por favor inicia sesión de nuevo.");
    }

    // Verificar y decodificar el token para extraer el ID del usuario
    let userId: string;
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      userId = payload.id as string;
    } catch (e) {
      throw new Error("Tu sesión ha expirado o es inválida.");
    }

    const imageFiles = formData.getAll('images') as File[];
    const imageUrls: string[] = [];

    // LÓGICA DE SUBIDA A SUPABASE BUCKET (Se mantiene idéntica e intacta)
    for (const file of imageFiles) {
      if (!file || file.size === 0) continue;

      const fileExtension = file.name.split('.').pop();
      const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`;
      
      const { data, error: uploadError } = await supabase.storage
        .from('experiences') 
        .upload(cleanFileName, file, {
          contentType: file.type,
          upsert: false
        });

      if (uploadError) {
        console.error("Error subiendo a Supabase:", uploadError.message);
        throw new Error(`Error al subir imagen: ${uploadError.message}`);
      }

      const { data: { publicUrl } } = supabase.storage
        .from('experiences')
        .getPublicUrl(cleanFileName);

      imageUrls.push(publicUrl);
    }

    // 🌟 EXTRAER Y VALIDAR EL MÉTODO DE PAGO DEL FORMULARIO
    const rawPaymentMethod = formData.get('paymentMethod') as string;
    const paymentMethod: PaymentMethod = rawPaymentMethod === 'TRANSFER' 
      ? PaymentMethod.TRANSFER 
      : PaymentMethod.CASH;

    // 4. Guardado en la Base de Datos asociándolo con el id decodificado del JWT
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
        status: 'PUBLISHED',
        
        // 🌟 AQUÍ ESTÁ EL CAMBIO: Inyectamos el método de pago mapeado en el objeto de datos
        paymentMethod: paymentMethod,

        host: {
          connect: { id: userId }, // Utiliza el ID extraído de la sesión JWT
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