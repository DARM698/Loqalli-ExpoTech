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
    verificationData: { 
      facePhoto: '', 
      documentPhoto: '' 
    }
  });

  // Manejador general para campos de texto planos de los subformularios
  const handleInputChange = (e: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Manejador blindado para los datos controlados provenientes de IdentityUpload
  const handleIdentityChange = (updatedFields: any) => {
    setFormData((prev: any) => {
      // Si vienen rutas de imágenes, actualizamos de forma segura el subobjeto anidado
      if (updatedFields.verificationData) {
        return {
          ...prev,
          verificationData: {
            ...prev.verificationData,
            ...updatedFields.verificationData
          }
        };
      }
      // Si vienen strings planos (birthDate o documentNumber), los acoplamos directamente
      return {
        ...prev,
        ...updatedFields
      };
    });
  };

  const handleRegister = async () => {
    // Log de control en la consola del navegador (F12) para validar el envío seguro
    console.log("✈️ Enviando el siguiente payload al backend:", formData);

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
          alert("¡Registro exitoso! Identidad verificada vía Verifik.");
        } else {
          alert("Error de Registro: " + data.error);
        }
      } else {
        const errorText = await res.text();
        console.error("Error crudo del servidor:", errorText);
        alert(`Error en el servidor (${res.status}). Verifica la terminal de Node.`);
      }
    } catch (err) {
      console.error("Error de conexión:", err);
      alert("No se pudo establecer conexión con el servidor backend.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-[#faf7f2] min-h-screen">
      <h1 className="text-4xl text-center mb-10 text-orange-700 font-serif">Create Your Host Account!</h1>
      
      <BasicInfoForm onChange={handleInputChange} />
      <BankInfoForm onChange={handleInputChange} />
      
      {/* Recibe de manera reactiva y atómica las actualizaciones del DUI/Fecha */}
      <IdentityUpload 
        role="HOST" 
        onChangeData={handleIdentityChange} 
      />

      <button 
        onClick={handleRegister} 
        className="w-full bg-[#d9774a] text-white p-4 mt-12 rounded font-bold tracking-widest hover:bg-[#c4663d] transition-colors"
      >
        REGISTER AS HOST
      </button>
      {/* Añade esto después del </button> en tu página de registro */}
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