'use client'

import { useState } from 'react';
import { Edit2 } from 'lucide-react';
import { uploadProfileImageDirectly } from '@/app/actions'; // Importamos la nueva función

export default function ProfileImageUploader({ userId }: { userId: string }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      // Preparamos el FormData para la Server Action
      const formData = new FormData();
      formData.append('file', file);

      // Llamada directa a la Server Action
      const result = await uploadProfileImageDirectly(userId, formData);

      if (result?.error) {
        throw new Error(result.error);
      }
      
      alert("¡Foto de perfil actualizada!");
      window.location.reload(); // Recargamos para ver el cambio
    } catch (error) {
      console.error(error);
      alert("Hubo un error al subir la imagen.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="absolute bottom-0 right-0">
      <label className="bg-[#D17842] hover:bg-[#b86532] text-white p-2 rounded-full cursor-pointer shadow-lg transition-all flex items-center justify-center">
        {uploading ? (
          <span className="animate-spin text-sm">↻</span>
        ) : (
          <Edit2 size={16} />
        )}
        <input 
          type="file" 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange} 
          disabled={uploading}
        />
      </label>
    </div>
  );
}