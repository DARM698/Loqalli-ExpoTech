'use client';
import { useState } from 'react';
import { BasicInfoForm } from '@/components/forms/BasicInfoSection';
import { IdentityUpload } from '@/components/Verifications/IdentityUpload';
import Link from 'next/link';

export default function TouristRegister() {
  const [formData, setFormData] = useState<any>({
    fullName: '',
    email: '',
    password: '',
    age: '',
    birthDate: '',
    documentNumber: '',
    verificationData: { 
      facePhoto: '', 
      documentPhoto: '' 
    }
  });

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Reutilizamos la misma lógica inteligente de mezcla de estados
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
          window.location.href = '/dashboard';
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
      
      <BasicInfoForm onChange={handleInputChange} />
      
      <div className="mt-10">
        <IdentityUpload 
          role="TOURIST" 
          onChangeData={handleIdentityChange} 
        />
      </div>

      <button 
        onClick={handleRegister} 
        className="w-full bg-[#d9774a] text-white p-4 mt-12 rounded font-bold tracking-widest hover:bg-[#c4663d] transition-colors"
      >
        REGISTER AS TOURIST 
      </button>
      <div className="mt-6 text-center">
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