'use client'; 
import Link from 'next/link';
// Importamos tu Navbar personalizado
import NavbarLogin from '@/components/navbarlogin';

export default function RegisterWelcomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#D17842] selection:text-white flex flex-col justify-between">
      
      <NavbarLogin/>

      <div className="my-auto pt-32 flex w-full max-w-md flex-col items-center space-y-10 text-center mx-auto px-6">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D17842]/10 text-[#D17842] font-bold text-[10px] tracking-[0.2em] uppercase">
          Join our community
        </div>

        {/* Título Principal */}
        <h1 className="text-4xl font-serif font-medium text-slate-900 md:text-5xl leading-tight">
          Welcome to <span className="italic text-[#D17842]">Loqalli</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-sm">
          How would you like to log in, as a tourist or a host?
        </p>
        <div className="w-full space-y-4 pt-2">
          <Link 
            href="/Login/login-tourist" 
            className="flex w-full items-center justify-center rounded-full bg-slate-50/50 py-4 text-xs font-bold uppercase tracking-widest text-slate-700 transition-all hover:bg-[#D2693E] hover:text-white hover:border-slate-900 hover:shadow-lg transform active:scale-[0.98]"
          >
            Tourist
          </Link>
          
          <Link 
            href="/Login/login-host" 
            className="flex w-full items-center justify-center rounded-full bg-slate-50/50 py-4 text-xs font-bold uppercase tracking-widest text-slate-700 transition-all hover:bg-[#D2693E] hover:text-white hover:border-slate-900 hover:shadow-lg transform active:scale-[0.98]"
          >
            Host
          </Link>
        </div>
      </div>

      {/* 3. FOOTER / ACCESO A LOGIN */}
      <div className="flex flex-col items-center space-y-1 pb-10 text-xs tracking-wider uppercase font-bold text-slate-400">
        <Link 
          href="/login" 
          className="text-[#D17842] hover:text-[#b05e30] transition-colors underline underline-offset-4"> Log in
        </Link>
      </div>
    </main>
  );
}