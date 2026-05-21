'use client';
import { useState } from 'react';
import { BasicInfoForm } from '@/components/forms/BasicInfoSection';
import { BankInfoForm } from '@/components/forms/BankInfoSection'; 
import { IdentityUpload } from '@/components/Verifications/IdentityUpload';
import Link from 'next/link';
import NavbarLogin from '@/components/navbarlogin';

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
      return { ...prev, ...updatedFields };
    });
  };

  const handleRegister = async () => {
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
    <div className="w-full bg-[#faf7f2] text-slate-800 min-h-screen font-sans selection:bg-[#D17842] selection:text-white">
      
      <NavbarLogin />

      <div className="max-w-xl mx-auto p-8 pt-28">
        
        <h1 className="text-4xl text-center mb-10 text-[#D17842] font-serif font-medium leading-tight">
          Join as a <span className="italic">Tourist</span>
        </h1>
        
        <div className="space-y-8 text-left">
          <div className="[&_h2]:text-[#5C4D45] [&_label]:text-[#5C4D45] [&_input]:text-slate-800">
            <BasicInfoForm onChange={handleInputChange} />
          </div>
          
          <hr className="border-orange-200/50" />
          
          <div className="[&_h2]:text-[#5C4D45] [&_label]:text-[#5C4D45] [&_input]:text-slate-800">
            <BankInfoForm onChange={handleInputChange} />
          </div>
          
          <hr className="border-orange-200/50" />

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100/50">
            <h2 className="text-xl font-bold text-[#5C4D45] mb-4 uppercase tracking-wider text-xs">Identity Verification</h2>
            <IdentityUpload 
              role="TOURIST" 
              onChangeData={handleIdentityChange} 
            />
          </div>
        </div>

        <button 
          onClick={handleRegister} 
          className="w-full bg-[#D17842] text-white py-4 mt-12 rounded-full font-bold text-xs tracking-widest hover:bg-[#b05e30] hover:shadow-lg transition-all transform active:scale-[0.98] uppercase"
        >
          Register as Tourist
        </button>

        <div className="mt-10 text-center pb-10 text-xs tracking-wider uppercase font-bold text-slate-400">
          <p>
            Already have an account?{' '}
            <Link href="/Login/login-tourist" className="text-[#D17842] hover:text-[#b05e30] transition-colors underline underline-offset-4 ml-1">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}