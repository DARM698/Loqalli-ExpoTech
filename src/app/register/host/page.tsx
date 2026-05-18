'use client';
import { useState } from 'react';
import { BasicInfoForm } from '@/components/forms/BasicInfoSection';
import { BankInfoForm } from '@/components/forms/BankInfoSection';
import { IdentityUpload } from '@/components/Verifications/IdentityUpload';
import Link from 'next/link';

export default function HostRegister() {
  const [formData, setFormData] = useState<any>({
    fullName: '',
    email: '',
    password: '',
    age: '',
    birthDate: '',
    documentNumber: '',
    accountHolder: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    verificationData: { 
      facePhoto: '', 
      documentPhoto: '' 
    }
  });

  const handleInputChange = (e: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleIdentityChange = (updatedFields: any) => {
    setFormData((prev: any) => {
      if (updatedFields.verificationData) {
        return {
          ...prev,
          verificationData: {
            ...prev.verificationData,
            ...updatedFields.verificationData
          }
        };
      }
      return {
        ...prev,
        ...updatedFields
      };
    });
  };

  const handleRegister = async () => {
    // 1. VALIDACIÓN: Se eliminó !formData.verificationData.facePhoto de los requisitos
    if (
      !formData.fullName || !formData.email || !formData.password || !formData.age ||
      !formData.birthDate || !formData.documentNumber || !formData.accountHolder ||
      !formData.bankName || !formData.accountNumber || !formData.routingNumber ||
      !formData.verificationData.documentPhoto
    ) {
      alert("Por favor, completa todos los campos del formulario, incluyendo la foto de tu documento.");
      return;
    }

    try {
      const res = await fetch('/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          role: 'HOST'
        })
      });

      const contentType = res.headers.get("content-type");
      if (res.ok && contentType && contentType.includes("application/json")) {
        const data = await res.json();
        
        if (data.success) {
          alert("¡Registro exitoso! Tu identidad ha sido verificada correctamente.");
          window.location.href = '/login';
        } else {
          alert("Error de Verificación: " + data.error);
        }
      } else {
        const errorText = await res.text();
        console.error("Error crudo del servidor:", errorText);
        alert("Ocurrió un problema técnico en el servidor. Revisa la consola.");
      }
    } catch (err) {
      console.error("Error de conexión:", err);
      alert("No se pudo conectar con el servidor. Revisa tu conexión a internet.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-[#faf7f2] min-h-screen">
      <h1 className="text-4xl text-center mb-10 text-orange-700 font-serif">Create Your Host Account!</h1>
      
      <div className="space-y-8">
        <BasicInfoForm onChange={handleInputChange} />
        
        <hr className="border-orange-100" />
        
        <BankInfoForm onChange={handleInputChange} />
        
        <hr className="border-orange-100" />
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-orange-50">
          <h2 className="text-xl font-bold text-orange-800 mb-4">Identity Verification</h2>
          <p className="text-sm text-gray-600 mb-6">
            Por favor, sube una imagen legible de tu documento de identidad para realizar la validación con los registros oficiales.
          </p>
          <IdentityUpload 
            role="HOST" 
            onChangeData={handleIdentityChange} 
          />
        </div>
      </div>

      <button 
        onClick={handleRegister} 
        className="w-full bg-[#d9774a] text-white p-4 mt-12 rounded font-bold tracking-widest hover:bg-[#c4663d] transition-all shadow-md active:scale-[0.98]"
      >
        REGISTER AS HOST
      </button>

      <div className="mt-8 text-center pb-10">
        <p className="text-gray-600 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-[#d9774a] font-bold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}