'use client';

import { Camera, FileText, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';

interface IdentityUploadProps {
  // Cambiamos a recibir el estado actual y una función actualizadora estructurada
  onChangeData: (fields: any) => void;
  role: 'HOST' | 'TOURIST';
}

export const IdentityUpload = ({ onChangeData, role }: IdentityUploadProps) => {
  const documentLabel = role === 'HOST' ? 'National ID Number (DUI)' : 'Passport Number';

  const [preview, setPreview] = useState<{
    facePhoto?: string;
    documentPhoto?: string;
  }>({});
  
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  // Subida de archivos a Supabase Private Bucket
  const uploadFile = async (file: File, type: 'facePhoto' | 'documentPhoto') => {
    setLoading(prev => ({ ...prev, [type]: true }));
    const fileName = `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from('Identity-documents')
      .upload(fileName, file);

    setLoading(prev => ({ ...prev, [type]: false }));

    if (error) {
      console.error("Error subiendo archivo:", error);
      return;
    }

    // Pasamos el path exacto del archivo subido en Supabase
    onChangeData({
      verificationData: {
        [type]: data?.path
      }
    });
  };

  return (
    <div className="space-y-6 mt-10 p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
      <h2 className="text-2xl text-center font-serif text-[#4a3f35]">
        Identity Verification
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Foto del Rostro */}
        <div className="border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-between bg-[#fdfbf9] rounded-lg min-h-[220px]">
          <div className="flex flex-col items-center w-full">
            <Camera size={32} className="text-gray-400 mb-2" />
            <p className="text-xs text-gray-500 text-center min-h-[40px] flex items-center">
              {loading.facePhoto ? "Uploading..." : "Photo of your face (Selfie)"}
            </p>
            {preview.facePhoto && (
              <img src={preview.facePhoto} className="mt-3 w-full h-32 object-cover rounded-md" alt="Face preview" />
            )}
          </div>
          <label className="cursor-pointer bg-[#d9774a] hover:bg-[#c96a3f] text-white px-6 py-2 rounded-md text-sm font-medium transition mt-4">
            Choose File
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={loading.facePhoto}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setPreview(prev => ({ ...prev, facePhoto: URL.createObjectURL(file) }));
                await uploadFile(file, 'facePhoto');
              }}
            />
          </label>
        </div>

        {/* Foto del Documento */}
        <div className="border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-between text-center bg-[#fdfbf9] rounded-lg min-h-[220px]">
          <div className="flex flex-col items-center w-full">
            <FileText size={32} className="text-gray-400 mb-2" />
            <p className="text-xs text-gray-500 min-h-[40px] flex items-center justify-center">
              {loading.documentPhoto ? "Uploading..." : `Photo of your ${role === 'HOST' ? 'DUI (Front)' : 'Passport'}`}
            </p>
            {preview.documentPhoto && (
              <img src={preview.documentPhoto} className="mt-3 w-full h-32 object-cover rounded-md" alt="Document preview" />
            )}
          </div>
          <label className="cursor-pointer bg-[#d9774a] hover:bg-[#c96a3f] text-white px-6 py-2 rounded-md text-sm font-medium transition mt-4">
            Choose File
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={loading.documentPhoto}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setPreview(prev => ({ ...prev, documentPhoto: URL.createObjectURL(file) }));
                await uploadFile(file, 'documentPhoto');
              }}
            />
          </label>
        </div>
      </div>

      {/* Datos en Texto requeridos por Verifik */}
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-600 ml-1">Birthdate</label>
          <div className="flex items-center bg-[#f3eee7] p-2 rounded">
            <Calendar size={18} className="text-gray-400 mr-2" />
            <input
              type="date"
              name="birthDate"
              onChange={(e) => onChangeData({ birthDate: e.target.value })}
              className="bg-transparent w-full outline-none text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-600 ml-1">{documentLabel.toUpperCase()}</label>
          <input
            name="documentNumber"
            placeholder={role === 'HOST' ? "00000000-0" : "A00000000"}
            onChange={(e) => onChangeData({ documentNumber: e.target.value })}
            className="w-full p-2 bg-[#f3eee7] rounded outline-none text-sm"
            required
          />
        </div>
      </div>
    </div>
  );
};