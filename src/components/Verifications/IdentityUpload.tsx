'use client';

import { FileText, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';

interface IdentityUploadProps {
  onChangeData: (fields: any) => void;
  role: 'HOST' | 'TOURIST';
}

export const IdentityUpload = ({ onChangeData, role }: IdentityUploadProps) => {
  const [docType, setDocType] = useState<'DUI' | 'PASAPORTE'>('DUI');

  const [preview, setPreview] = useState<{
    documentPhoto?: string;
  }>({});
  
  const [loading, setLoading] = useState<{ documentPhoto: boolean }>({
    documentPhoto: false
  });

  // Asegurar que el tipo de documento inicial se registre en el formulario padre
  useEffect(() => {
    onChangeData({ documentType: 'DUI' });
  }, []);

  const uploadFile = async (file: File) => {
    setLoading({ documentPhoto: true });
    const fileName = `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from('Identity-documents')
      .upload(fileName, file);

    setLoading({ documentPhoto: false });

    if (error) {
      console.error("Error subiendo archivo:", error);
      return;
    }

    // Enviamos "facePhoto" vacío para saltar validaciones estrictas del frontend padre
    onChangeData({
      verificationData: {
        documentPhoto: data?.path,
        facePhoto: "" 
      }
    });
  };

  return (
    <div className="space-y-6 mt-10 p-6 bg-white rounded-lg border border-gray-100 shadow-sm max-w-xl mx-auto">
      <h2 className="text-2xl text-center font-serif text-[#4a3f35]">
        Identity Verification
      </h2>

      {/* Selector de tipo de documento si es Turista */}
      {role === 'TOURIST' && (
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-bold text-gray-600 ml-1">Document Type</label>
          <select 
            name="documentType"
            value={docType}
            onChange={(e) => {
              const value = e.target.value as 'DUI' | 'PASAPORTE';
              setDocType(value);
              onChangeData({ documentType: value });
            }}
            className="w-full p-2 bg-[#f3eee7] rounded outline-none text-sm"
          >
            <option value="DUI">National ID (DUI) - El Salvador</option>
            <option value="PASAPORTE">Passport</option>
          </select>
        </div>
      )}

      <div>
        {/* Foto del Documento */}
        <div className="border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-between text-center bg-[#fdfbf9] rounded-lg min-h-[220px]">
          <div className="flex flex-col items-center w-full">
            <FileText size={32} className="text-gray-400 mb-2" />
            <p className="text-xs text-gray-500 min-h-[40px] flex items-center justify-center">
              {loading.documentPhoto ? "Uploading..." : `Photo of your ${docType === 'DUI' ? 'DUI (Front)' : 'Passport'}`}
            </p>
            {preview.documentPhoto && (
              <img src={preview.documentPhoto} className="mt-3 w-full max-w-xs h-32 object-cover rounded-md" alt="Document preview" />
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
                setPreview({ documentPhoto: URL.createObjectURL(file) });
                await uploadFile(file);
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
          <label className="text-xs font-bold text-gray-600 ml-1">
            {docType === 'DUI' ? 'NATIONAL ID NUMBER (DUI)' : 'PASSPORT NUMBER'}
          </label>
          <input
            name="documentNumber"
            placeholder={docType === 'DUI' ? "00000000-0" : "A00000000"}
            onChange={(e) => onChangeData({ documentNumber: e.target.value })}
            className="w-full p-2 bg-[#f3eee7] rounded outline-none text-sm"
            required
          />
        </div>
      </div>
    </div>
  );
};