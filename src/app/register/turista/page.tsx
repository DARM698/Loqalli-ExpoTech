'use client';
import { useState } from 'react';
import { BasicInfoForm } from '@/components/forms/BasicInfoSection';
import { IdentityUpload } from '@/components/Verifications/IdentityUpload';

export default function TouristRegister() {
  const [formData, setFormData] = useState<any>({});

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const res = await fetch('/api/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        role: 'TOURIST',
        verificationData: { 
          faceImage: 'url-face-tourist', 
          document: 'url-passport-tourist' 
        }
      })
    });
    const data = await res.json();
    if(data.success) window.location.href = '/dashboard';
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-[#faf7f2]">
      <h1 className="text-4xl text-center mb-10 text-orange-700 font-serif">Join as a Tourist</h1>
      <BasicInfoForm onChange={handleInputChange} />
      <div className="mt-10">
        <IdentityUpload 
          role="TOURIST" 
          onUpload={(data) => setFormData({...formData, ...data})} 
        />
      </div>
      <button 
        onClick={handleRegister} 
        className="w-full bg-[#d9774a] text-white p-4 mt-12 rounded font-bold tracking-widest hover:bg-[#c4663d] transition-colors"
      >
        REGISTER AS TOURIST 
      </button>
    </div>
  );
}