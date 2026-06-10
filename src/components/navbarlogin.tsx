'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
 
export default function NavbarLogin() {
  const pathname = usePathname();
 
  const isHostRoute = pathname.includes('host');
  const loginHref = isHostRoute ? "/Login/login-host" : "/Login/login-tourist";
  const signUpHref = isHostRoute ? "/register/host" : "/register/turista";
 
  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-[#F1EBE0] bg-white shadow-md">
      <div className="w-full px-8">
        <div className="flex justify-between items-center h-16.5">
 
          <div className="flex-shrink-0">
            <Link href="/">
              <Image src="/logo1.png" alt="Logo" width={150} height={150} />
            </Link>
          </div>
 
          <div className="flex items-center gap-3">
            <Link href="/Login" className="px-4 py-2 text-[10px] font-bold text-[#56423D] hover:text-[#DA653B] transition-colors uppercase tracking-widest">
              Log in
            </Link>
            <Link href="/register" className="px-5 py-2 text-[10px] font-bold text-white bg-[#DA653B] rounded-full hover:shadow-lg transition-all active:scale-95 uppercase tracking-widest">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
 