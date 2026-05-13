'use server';

import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function createExperience(formData: FormData) {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    const imageFiles = formData.getAll('images') as File[];
    const imageUrls: string[] = [];

    // LÓGICA DE SUBIDA A SUPABASE BUCKET
    for (const file of imageFiles) {
      // Si el campo está vacío o no es un archivo válido, saltar
      if (!file || file.size === 0) continue;

      // 1. Crear un nombre único y limpio (sin espacios ni caracteres raros)
      const fileExtension = file.name.split('.').pop();
      const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`;
      

      const { data, error: uploadError } = await supabase.storage
        .from('experiences') 
        .upload(cleanFileName, file, {
          contentType: file.type, // Importante para que el navegador la renderice
          upsert: false
        });

      if (uploadError) {
        console.error("Error subiendo a Supabase:", uploadError.message);
        throw new Error(`Error al subir imagen: ${uploadError.message}`);
      }

      // 3. Obtener la URL pública real
      const { data: { publicUrl } } = supabase.storage
        .from('experiences')
        .getPublicUrl(cleanFileName);

      imageUrls.push(publicUrl);
    }

    // 4. Guardado en la Base de Datos con Prisma
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
        host: {
          connect: { id: user.id },
        },
      },
    });

    // 5. Revalidar para que aparezca la nueva experiencia en el Home
    revalidatePath('/');
    return { success: true };

  } catch (error: any) {
    console.error("Error detallado en createExperience:", error);
    return { error: error.message || "Error al guardar la experiencia." };
  }
}