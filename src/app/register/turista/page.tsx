'use client';
import { useState } from 'react';
import { BasicInfoForm } from '@/components/forms/BasicInfoSection';
import { BankInfoForm } from '@/components/forms/BankInfoSection'; 
import { IdentityUpload } from '@/components/Verifications/IdentityUpload';
import Link from 'next/link';

export default function TouristRegister() {
  const [formData, setFormData] = useState<any>({
    fullName: '',
    email: '',
    password: '',
    age: '',
    birthDate: '',
    documentType: 'DUI',
    documentNumber: '',
    accountHolder: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    verificationData: { 
      facePhoto: '', // Placebo para compatibilidad con esquemas del backend
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
      return { ...prev, ...updatedFields };
    });
  };

  const handleRegister = async () => {
    // 1. VALIDACIÓN: Se removió la verificación obligatoria de !formData.verificationData.facePhoto
    if (
      !formData.fullName || !formData.email || !formData.password || !formData.age ||
      !formData.birthDate || !formData.documentNumber || !formData.documentType ||
      !formData.accountHolder || !formData.bankName || !formData.accountNumber || !formData.routingNumber ||
      !formData.verificationData.documentPhoto
    ) {
      alert("Por favor, completa todos los campos, incluyendo la información bancaria y la foto del documento.");
      return;
    }

    try {
      const res = await fetch('/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          role: 'TOURIST'
        })
      });

      const contentType = res.headers.get("content-type");
      if (res.ok && contentType && contentType.includes("application/json")) {
        const data = await res.json();
        if (data.success) {
          alert("¡Registro de turista exitoso!");
          window.location.href = '/Login';
        } else {
          alert("Error: " + data.error);
        }
      } else {
        const errorText = await res.text();
        console.error("Error:", errorText);
        alert("Ocurrió un problema con el registro del turista.");
      }
    } catch (err) {
      console.error("Error reg:", err);
      alert("Error de conexión.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-[#faf7f2] min-h-screen">
      <h1 className="text-4xl text-center mb-10 text-orange-700 font-serif">Join as a Tourist</h1>
      
      <div className="space-y-8">
        <BasicInfoForm onChange={handleInputChange} />
        
        <hr className="border-orange-100" />
        
        <BankInfoForm onChange={handleInputChange} />
        
        <hr className="border-orange-100" />

        <div className="bg-white p-6 rounded-lg shadow-sm border border-orange-50">
          <h2 className="text-xl font-bold text-orange-800 mb-4">Identity Verification</h2>
          <IdentityUpload 
            role="TOURIST" 
            onChangeData={handleIdentityChange} 
          />
        </div>
      </div>

      <button 
        onClick={handleRegister} 
        className="w-full bg-[#d9774a] text-white p-4 mt-12 rounded font-bold tracking-widest hover:bg-[#c4663d] transition-all shadow-md active:scale-[0.98]"
      >
        REGISTER AS TOURIST 
      </button>

      <div className="mt-8 text-center pb-10">
        <p className="text-gray-600 text-sm">
          Already have an account?{' '}
          <Link href="/Login" className="text-[#d9774a] font-bold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}