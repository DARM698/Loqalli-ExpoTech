'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TouristRegister() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      alert('Complete all fields')
      return
    }

    if (!form.email.includes('@')) {
      alert('Invalid email')
      return
    }

    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    alert('Tourist account created 🚀')
  }

  // 👉 Simulación Google login (UI)
  const handleGoogle = () => {
    alert('Here you would connect with Google account 🔐')
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-slate-800 font-sans">

      {/* NAVBAR */}
      <header className="w-full flex items-center justify-between px-10 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-[#D17842] italic">Loqalli</h1>

        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/login')} className="px-6 py-2.5 text-[10px] font-bold text-white bg-[#D17842] rounded-full hover:shadow-lg transition-all uppercase tracking-widest">
            Login
          </button>

          <button className="px-6 py-2.5 text-[10px] font-bold text-white bg-slate-900 rounded-full uppercase tracking-widest">
            Sign Up
          </button>
        </div>
      </header>

      {/* TITLE */}
      <h1 className="text-6xl font-serif text-center mt-16 text-[#D17842]">
        Create Your Account!
      </h1>

      {/* CARD */}
      <section className="flex justify-center mt-10 px-4">
        <div className="bg-white w-full max-w-2xl rounded-3xl shadow-lg p-12 border transition-all duration-300 hover:shadow-xl">

          <h2 className="text-4xl font-serif text-[#5a463f] mb-10 text-center">
            Tourist Information
          </h2>

          <div className="space-y-6">
            <Input label="Full Name" name="name" onChange={handleChange} />
            <Input label="E-mail" name="email" placeholder="name@example.com" onChange={handleChange} />
            <Input label="Password" name="password" type="password" onChange={handleChange} />
            <Input label="Confirm Password" name="confirmPassword" type="password" onChange={handleChange} />
          </div>

          {/* SUBMIT */}
          <div className="flex justify-center mt-12">
            <button onClick={handleSubmit} className="bg-slate-900 text-white px-12 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#D17842] transition-all transform hover:-translate-y-1 hover:shadow-lg">
              Create Account
            </button>
          </div>

          {/* EXTRA */}
          <div className="mt-10 space-y-6 text-center">

            <p className="text-sm text-gray-500">
              Do you have an account?{' '}
              <span onClick={() => router.push('/login')} className="text-[#D17842] cursor-pointer font-semibold hover:underline">
                Login
              </span>
            </p>

            <p className="text-sm text-gray-400">Or continue with</p>

            {/* GOOGLE */}
            <button onClick={handleGoogle} className="w-full border border-gray-400 rounded-lg py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition-all">
              <span className="text-lg">🌐</span>
              <span className="text-sm font-medium text-gray-700">
                Continue with Google
              </span>
            </button>

          </div>

        </div>
      </section>
    </main>
  )
}

/* INPUT */

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
        required
        className="w-full mt-2 bg-[#d6cec3] rounded-md px-4 py-3 outline-none placeholder:text-gray-500 transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-[#D17842] focus:shadow-md hover:bg-[#e2d9cd]"
      />
    </div>
  )
}