'use client'

import { useRouter } from 'next/navigation'


export default function SignUpPage() {
  const router = useRouter()

  const handleSelect = (role: string) => {
    router.push(`/register/${role}`)
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-slate-800 font-sans">

      {/* NAVBAR */}
      <header className="w-full flex items-center justify-between px-10 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-[#D17842] italic">Loqalli</h1>

        <nav className="hidden md:flex gap-8 text-sm text-slate-500 font-medium">
          <a href="#" className="hover:text-[#D17842] transition-colors duration-200">Experiences</a>
          <a href="#" className="hover:text-[#D17842] transition-colors duration-200">Hosts</a>
          <a href="#" className="hover:text-[#D17842] transition-colors duration-200">About us</a>
        </nav>

        <div className="flex items-center gap-3">
  {/* LOGIN */}
  <button
    onClick={() => router.push('/login')}
    className="px-6 py-2.5 text-[10px] font-bold text-white bg-[#D17842] rounded-full hover:shadow-lg hover:brightness-110 transition-all transform hover:-translate-y-0.5 uppercase tracking-widest"
  >
    Login
  </button>

  {/* SIGN UP (ACTIVO) */}
  <button
    className="px-6 py-2.5 text-[10px] font-bold text-white bg-slate-900 rounded-full shadow-md uppercase tracking-widest cursor-default"
  >
    Sign Up
  </button>
</div>
      </header>

      {/* CARD */}
      <section className="flex justify-center mt-24 px-4">
        <div className="bg-white w-full max-w-3xl rounded-3xl shadow-lg p-14 text-center border border-gray-100">

          <h2 className="text-5xl font-semibold text-[#D17842] mb-6 tracking-tight">
            Welcome to Loqalli
          </h2>

          <p className="text-gray-500 text-base mb-10">
            How would you like to join — as a Tourist or a Host?
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col gap-6">
            <button
              onClick={() => handleSelect('tourist')}
              className="bg-[#d6cec3] hover:bg-[#c9c0b5] hover:scale-[1.02] transition-all duration-200 py-5 rounded-xl text-lg font-medium w-full shadow-sm hover:shadow-md uppercase tracking-wide"
            >
              Tourist
            </button>

            <button
  onClick={() => handleSelect('host')}
  className="bg-[#d6cec3] hover:bg-[#c9c0b5] transition py-4 rounded-md text-lg font-medium"
>
  Host
</button>
          </div>

          {/* LOGIN */}
          <p className="mt-12 text-sm text-gray-500">
            Already have an account?
          </p>
          <button className="text-[#D17842] text-sm mt-2 hover:underline">
            Log in
          </button>

        </div>
      </section>
    </main>
  )
}