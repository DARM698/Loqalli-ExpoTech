'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarUserProps {
  role: 'TOURIST' | 'HOST';
  userId: string;
}

export default function NavbarUser({ role, userId }: NavbarUserProps) {
  console.log("--- DEBUG: Navbar props ---");
  console.log("Role recibido:", role);
  console.log("UserId recibido:", userId);

  const pathname = usePathname();
  const isTourist = role === 'TOURIST';
  const profileHref = `/profile/${userId}`;
  console.log("Link generado:", profileHref);

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

  return (
    <nav className="w-full bg-white border-b border-[#F3D9CF] px-6 py-4 flex items-center justify-between sticky top-0 z-[100]">
      <div className="flex items-center gap-12">
        <Link href={isTourist ? "/explore" : "/host"} className="text-2xl font-serif font-bold text-[#D2693E]">
          Loqalli
        </Link>
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