'use client';
import { useState } from 'react';
import { BasicInfoForm } from '@/components/forms/BasicInfoSection';
import { BankInfoForm } from '@/components/forms/BankInfoSection';
import { IdentityUpload } from '@/components/Verifications/IdentityUpload';

export default function HostRegister() {
  const [formData, setFormData] = useState<any>({
    verificationData: { faceImage: '', document: '' }
  });

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await fetch('/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          role: 'HOST'
        })
      });

      // Validamos si la respuesta es JSON antes de parsear
      const contentType = res.headers.get("content-type");
      if (res.ok && contentType && contentType.includes("application/json")) {
        const data = await res.json();
        if (data.success) alert("¡Registro exitoso!");
        else alert("Error: " + data.error);
      } else {
        const errorText = await res.text();
        console.error("Error del servidor:", errorText);
        alert("Error de servidor. Revisa la terminal de VS Code.");
      }
    } catch (err) {
      console.error("Error reg:", err);
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-[#faf7f2] min-h-screen">
      <h1 className="text-4xl text-center mb-10 text-orange-700 font-serif">Create Your Host Account!</h1>
      
      <BasicInfoForm onChange={handleInputChange} />
      <BankInfoForm onChange={handleInputChange} />
      
      <IdentityUpload 
        role="HOST" 
        onUpload={(data) => {
          // Asumiendo que data trae { faceImage, document }
          setFormData({
            ...formData,
            verificationData: {
              faceImage: data.faceImage,
              document: data.document
            }
          });
        }} 
      />

      <button 
        onClick={handleRegister} 
        className="w-full bg-[#d9774a] text-white p-4 mt-12 rounded font-bold tracking-widest hover:bg-[#c4663d] transition-colors"
      >
        REGISTER AS HOST
      </button>
    </div>
  );
}