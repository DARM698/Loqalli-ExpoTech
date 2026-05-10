'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, FileText } from 'lucide-react'

export default function RegisterForm() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    age: '',
    email: '',
    about: '',
    password: '',
    confirmPassword: '',
    accountHolder: '',
    bank: '',
    accountType: '',
    accountNumber: '',
    routingNumber: '',
  })

  const [faceImage, setFaceImage] = useState<File | null>(null)
  const [documentImage, setDocumentImage] = useState<File | null>(null)

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    console.log({ ...form, faceImage, documentImage })
    alert('Form ready to connect to backend 🚀')
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-slate-800 font-sans">

      {/* NAVBAR */}
      <header className="w-full flex items-center justify-between px-10 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-[#D17842] italic">Loqalli</h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-2.5 text-[10px] font-bold text-white bg-[#D17842] rounded-full hover:shadow-lg transition-all uppercase tracking-widest"
          >
            Login
          </button>

          <button className="px-6 py-2.5 text-[10px] font-bold text-white bg-slate-900 rounded-full uppercase tracking-widest">
            Sign Up
          </button>
        </div>
      </header>

      {/* TITLE */}
      <h1 className="text-6xl font-serif text-center mt-16 text-[#2e2e2e]">
        Create Your Account!
      </h1>

      {/* CARD */}
      <section className="flex justify-center mt-10 px-4">
        <div className="bg-white w-full max-w-4xl rounded-3xl shadow-lg p-12 border">

          {/* BASIC INFO */}
          <h2 className="text-5xl font-serif text-[#5a463f] mb-10 text-center">
            Basic Information
          </h2>

          <div className="space-y-6">
            <Input label="Full Name" name="name" onChange={handleChange} />
            <Input label="How old are you?" name="age" type="number" onChange={handleChange} />
            <Input label="E-mail" name="email" placeholder="name@example.com" onChange={handleChange} />
            <Textarea label="Tell us about you" name="about" onChange={handleChange} />
            <Input label="Password" name="password" type="password" onChange={handleChange} />
            <Input label="Confirm Password" name="confirmPassword" type="password" onChange={handleChange} />
          </div>

          {/* BANK */}
          <h2 className="text-5xl font-serif text-[#5a463f] mt-20 mb-10 text-center">
            Bank information
          </h2>

          <div className="space-y-6">
            <Input label="Account Holder" name="accountHolder" onChange={handleChange} />
            <Input label="Bank Name" name="bank" placeholder="Select your bank" onChange={handleChange} />
            <Input label="Type Account" name="accountType" placeholder="Checking / Savings" onChange={handleChange} />
            <Input label="Account Number" name="accountNumber" placeholder="Numbers only" onChange={handleChange} />
            <Input label="Routing Number" name="routingNumber" placeholder="8 or 11 characters" onChange={handleChange} />
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            your information is encrypted and secure
          </p>

          {/* VERIFY */}
          <h2 className="text-5xl font-serif text-[#5a463f] mt-20 mb-10 text-center">
            Verify your identity
          </h2>

          <div className="grid md:grid-cols-2 gap-10">

            {/* FACE */}
            <label className="cursor-pointer bg-white shadow-md rounded-xl p-10 flex flex-col items-center justify-center gap-6 hover:shadow-lg transition">
              <span className="text-center">Take a photo of your face</span>
              <Camera size={60} />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setFaceImage(e.target.files?.[0] || null)}
              />
              {faceImage && <span className="text-xs">{faceImage.name}</span>}
            </label>

            {/* DOCUMENT */}
            <label className="cursor-pointer bg-white shadow-md rounded-xl p-10 flex flex-col items-center justify-center gap-6 hover:shadow-lg transition">
              <span className="text-center">Upload an image of a personal document</span>
              <FileText size={60} />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setDocumentImage(e.target.files?.[0] || null)}
              />
              {documentImage && <span className="text-xs">{documentImage.name}</span>}
            </label>

          </div>

          {/* SUBMIT */}
          <div className="flex justify-center mt-16">
            <button
              onClick={handleSubmit}
              className="bg-slate-900 text-white px-12 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#D17842] transition"
            >
              Create Account
            </button>
          </div>

        </div>
      </section>
    </main>
  )
}

/* COMPONENTES */

function Input({ label, name, type = 'text', placeholder = '', onChange }: any) {
  return (
    <div className="group">
      <label className="text-sm text-gray-600 group-focus-within:text-[#D17842] transition">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full mt-2 bg-[#d6cec3] rounded-md px-4 py-3 outline-none placeholder:text-gray-500 transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-[#D17842] focus:shadow-md focus:scale-[1.01]"
      />
    </div>
  )
}

function Textarea({ label, name, onChange }: any) {
  return (
    <div className="group">
      <label className="text-sm text-gray-600 group-focus-within:text-[#D17842] transition">
        {label}
      </label>
      <textarea
        name={name}
        rows={3}
        onChange={onChange}
        className="w-full mt-2 bg-[#d6cec3] rounded-md px-4 py-3 outline-none
        transition-all duration-300
        focus:bg-white focus:ring-2 focus:ring-[#D17842] focus:shadow-md focus:scale-[1.01]"
      />
    </div>
  )
}