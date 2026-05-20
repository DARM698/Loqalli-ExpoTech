'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarLogin() {
  const pathname = usePathname();

  // Lógica de rutas para Loqalli
  const isHostRoute = pathname.includes('host');
  const loginHref = isHostRoute ? "/Login/login-host" : "/Login/login-tourist";
  const signUpHref = isHostRoute ? "/register/host" : "/register/turista";

  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-[#F1EBE0] bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14"> {/* Altura reducida para ser más elegante */}
          
          {/* Logo con el estilo de tu marca */}
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-2xl font-bold text-[#D17842] tracking-tighter italic cursor-pointer">
                Loqalli
              </h1>
            </Link>
          </div>

          {/* Botones de navegación con colores sólidos */}
          <div className="flex items-center gap-3">
            <Link 
              href={loginHref}
              className="px-4 py-2 text-[10px] font-bold text-[#56423D] hover:text-[#DA653B] transition-colors uppercase tracking-widest"
            >
              Log in
            </Link>

            <Link 
              href={signUpHref}
              className="px-5 py-2 text-[10px] font-bold text-white bg-[#DA653B] rounded-full hover:shadow-lg transition-all active:scale-95 uppercase tracking-widest"
            >
              Sign Up
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}