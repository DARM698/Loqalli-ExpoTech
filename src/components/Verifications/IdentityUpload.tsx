'use client';

import { Camera, FileText, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';

interface IdentityUploadProps {
  onUpload: (data: any) => void;
  role: 'HOST' | 'TOURIST';
}

export const IdentityUpload = ({
  onUpload,
  role,
}: IdentityUploadProps) => {
  const documentLabel =
    role === 'HOST' ? 'National ID Number' : 'Passport Number';

  const [preview, setPreview] = useState<{
    facePhoto?: string;
    documentPhoto?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpload({ [e.target.name]: e.target.value });
  };

  // Upload to PRIVATE bucket
  const uploadFile = async (file: File, type: string) => {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from('Identity-documents')
      .upload(fileName, file);

    if (error) {
      console.error(error);
      return;
    }

    onUpload({
      [type]: fileName,
    });
  };

  return (
    <div className="space-y-6 mt-10 p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
      <h2 className="text-2xl text-center font-serif text-[#4a3f35]">
        Identity Verification
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Face Photo */}
        <div className="border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-between bg-[#fdfbf9] rounded-lg min-h-[220px]">
          <div className="flex flex-col items-center">
            <Camera size={32} className="text-gray-400 mb-2" />

            <p className="text-xs text-gray-500 text-center min-h-[40px] flex items-center">
              Photo of your face
            </p>

            {preview.facePhoto && (
              <img
                src={preview.facePhoto}
                className="mt-3 w-full h-32 object-cover rounded-md"
              />
            )}
          </div>

          <label className="cursor-pointer bg-[#d9774a] hover:bg-[#c96a3f] text-white px-6 py-2 rounded-md text-sm font-medium transition mt-4">
            Choose File

            <input
              type="file"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                setPreview((prev) => ({
                  ...prev,
                  facePhoto: URL.createObjectURL(file),
                }));

                await uploadFile(file, 'facePhoto');
              }}
            />
          </label>
        </div>

        {/* Document Photo */}
        <div className="border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-between text-center bg-[#fdfbf9] rounded-lg min-h-[220px]">
          <div className="flex flex-col items-center">
            <FileText size={32} className="text-gray-400 mb-2" />

            <p className="text-xs text-gray-500 min-h-[40px] flex items-center justify-center">
              Photo of your document
              <br />
              (ID/Passport)
            </p>

            {preview.documentPhoto && (
              <img
                src={preview.documentPhoto}
                className="mt-3 w-full h-32 object-cover rounded-md"
              />
            )}
          </div>

          <label className="cursor-pointer bg-[#d9774a] hover:bg-[#c96a3f] text-white px-6 py-2 rounded-md text-sm font-medium transition mt-4">
            Choose File

            <input
              type="file"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                setPreview((prev) => ({
                  ...prev,
                  documentPhoto: URL.createObjectURL(file),
                }));

                await uploadFile(file, 'documentPhoto');
              }}
            />
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-600 ml-1">
            Birthdate
          </label>

          <div className="flex items-center bg-[#f3eee7] p-2 rounded">
            <Calendar size={18} className="text-gray-400 mr-2" />

            <input
              type="date"
              name="birthDate"
              onChange={handleChange}
              className="bg-transparent w-full outline-none text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-600 ml-1">
            {documentLabel.toUpperCase()}
          </label>

          <input
            name="documentNumber"
            placeholder="Example: 00000000-0"
            onChange={handleChange}
            className="w-full p-2 bg-[#f3eee7] rounded outline-none text-sm"
          />
        </div>
      </div>
    </div>
  );
};