'use client'

import { useState } from 'react';
import { Edit2 } from 'lucide-react';
import { uploadProfileImageDirectly } from '@/app/actions';

export default function ProfileImageUploader({ userId }: { userId: string }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const result = await uploadProfileImageDirectly(userId, formData);

      if (result?.error) {
        throw new Error(result.error);
      }
      
      alert("¡Foto de perfil actualizada!");
      window.location.reload(); 
    } catch (error) {
      console.error(error);
      alert("Hubo un error al subir la imagen.");
    } finally {
      setUploading(false);
    }
  };

  return (
    // Ajuste de posición: el botón se escala ligeramente según el dispositivo
    <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2">
      <label className="bg-[#D17842] hover:bg-[#b86532] text-white p-2 md:p-3 rounded-full cursor-pointer shadow-lg transition-all flex items-center justify-center aspect-square">
        {uploading ? (
          <span className="animate-spin text-sm">↻</span>
        ) : (
          <Edit2 size={16} className="md:w-5 md:h-5" />
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