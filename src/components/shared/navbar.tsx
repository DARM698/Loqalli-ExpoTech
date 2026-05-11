'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HostNavbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Create Experience', href: '/host/create' },
    { name: 'Agenda / Calendar', href: '/host/agenda' },
    { name: 'Profile', href: '/host/profile' },
  ];

  return (
    <nav className="w-full bg-white border-b border-[#F3D9CF] px-6 py-4 flex items-center justify-between sticky top-0 z-[100]">
      {/* Lado Izquierdo: Logo y Enlaces */}
      <div className="flex items-center gap-12">
        {/* Logo Loqalli */}
        <Link href="/host" className="text-2xl font-serif font-bold text-[#D2693E]">
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

      {/* Lado Derecho: Barra de Búsqueda */}
      <div className="relative max-w-sm w-full hidden lg:block">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg
            className="w-4 h-4 text-[#4A3933]/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search experiences..."
          className="w-full pl-10 pr-4 py-2 bg-white border border-[#F3D9CF] rounded-md text-sm outline-none focus:ring-1 focus:ring-[#D2693E] focus:border-[#D2693E] transition-all placeholder:text-[#4A3933]/40 text-[#4A3933]"
        />
      </div>
    </nav>
  );
}