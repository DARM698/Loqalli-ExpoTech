'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { signOut } from '@/app/actions'; // Asegúrate de que esta ruta sea correcta

interface NavbarUserProps {
  role: 'TOURIST' | 'HOST';
  userId: string;
}

export default function NavbarUser({ role, userId }: NavbarUserProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isTourist = role === 'TOURIST';
  const profileHref = `/profile/${userId}`;

  const navLinks = isTourist
    ? [
        { name: 'Explore', href: '/explore' },
        { name: 'About us', href: '/aboutUs' },
        { name: 'Profile', href: profileHref },
      ]
    : [
        { name: 'Explore', href: '/explore' },
        { name: 'Create Experience', href: '/uploadMicroexperiences' },
        { name: 'Agenda / Calendar', href: '/dashboard' },
        { name: 'Profile', href: profileHref },
      ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="relative w-full bg-white border-b border-[#F3D9CF] px-4 flex flex-wrap items-center justify-between sticky top-0 z-[100] gap-2 py-1">
      
      <Link href="aboutUs">
        <Image src="/logo1.png" alt="Logo" width={150} height={150} className="w-16 md:w-38" />
      </Link>

      {/* Botón de Hamburguesa */}
      <button 
        className="md:hidden p-2 text-[#4A3933]" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className={`${isOpen ? 'flex' : 'hidden'} absolute top-full left-0 w-full bg-white border-b border-[#F3D9CF] p-4 flex-col gap-4 md:static md:w-auto md:bg-transparent md:border-none md:p-0 md:flex md:flex-row md:items-center md:gap-8`}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-[10px] md:text-sm font-medium transition-colors hover:text-[#D2693E] ${isActive ? 'text-[#D2693E]' : 'text-[#4A3933]/70'}`}
            > 
              {link.name} 
            </Link>
          );
        })}
        
        <button 
          onClick={handleSignOut} 
          className="w-full md:w-auto px-3 py-1.5 text-[9px] md:text-[10px] font-bold text-white bg-[#DA653B] rounded-full hover:shadow-lg transition-all active:scale-95 uppercase tracking-widest"
        > 
          Sign out 
        </button>
      </div>
    </nav>
  );
}