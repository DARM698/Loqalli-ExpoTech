'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarUserProps {
  role: 'TOURIST' | 'HOST';
}

export default function NavbarUser({ role }: NavbarUserProps) {
  const pathname = usePathname();
  const isTourist = role === 'TOURIST';

  // Definición de enlaces dinámicos según el rol del usuario
  const navLinks = isTourist
    ? [
        { name: 'Explore', href: '/explore' },
        { name: 'About us', href: '/aboutUs' },
        { name: 'Profile', href: '/profile' },
      ]
    : [
        { name: 'Explore', href: '/explore' },
        { name: 'Create Experience', href: '/uploadMicroexperiences' },
        { name: 'Agenda / Calendar', href: '/host/agenda' },
        { name: 'Profile', href: '/host/profile' },
      ];

  return (
    <nav className="w-full bg-white border-b border-[#F3D9CF] px-6 py-4 flex items-center justify-between sticky top-0 z-[100]">
      {/* Lado Izquierdo: Logo y Enlaces */}
      <div className="flex items-center gap-12">
        {/* Logo Loqalli */}
        <Link href={isTourist ? "/explore" : "/host"} className="text-2xl font-serif font-bold text-[#D2693E]">
          Loqalli
        </Link>

        {/* Enlaces de Navegación */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#D2693E] ${
                  isActive ? 'text-[#D2693E]' : 'text-[#4A3933]/70'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>

    </nav>
  );
}