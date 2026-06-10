'use client'; 
import Link from 'next/link';
// Importamos tu Navbar personalizado
import NavbarLogin from '@/components/navbarlogin';

export default function RegisterWelcomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#D17842] selection:text-white flex flex-col justify-between">
      
      <NavbarLogin/>

      <div className="flex flex-1 items-center justify-center px-3 py-12 pb-1">
        <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center space-y-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D17842]/10 text-[#D17842] font-bold text-[10px] tracking-[0.2em] uppercase">
            Join our community
          </div>
 
          <h1 className="text-4xl font-serif font-medium text-slate-900 md:text-5xl leading-tight">
            Welcome to <span className="italic text-[#D17842]">Loqalli</span>
          </h1>
 
          <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-sm">
            How would you like to sign up, as a tourist or a host?
          </p>
 
          <div className="w-full space-y-4 pt-2">
            <Link
              href="/register/turista"
              className="flex w-full items-center justify-center rounded-full bg-slate-50/50 py-4 text-xs font-bold uppercase tracking-widest text-slate-700 border border-slate-200 transition-all hover:bg-[#D2693E] hover:text-white hover:shadow-lg active:scale-[0.98]">
              Tourist
            </Link>
 
            <Link
              href="/register/host"
              className="flex w-full items-center justify-center rounded-full bg-slate-50/50 py-4 text-xs font-bold uppercase tracking-widest text-slate-700 border border-slate-200 transition-all hover:bg-[#D2693E] hover:text-white hover:shadow-lg active:scale-[0.98]">
              Host
            </Link>
          </div>
        </div>
      </div>
  </main>
  );
}