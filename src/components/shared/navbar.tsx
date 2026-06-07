'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
 
interface NavbarUserProps {
  role: 'TOURIST' | 'HOST';
  userId: string;
}
 
export default function NavbarUser({ role, userId }: NavbarUserProps) {
  const pathname = usePathname();
  const router = useRouter();
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
 
  const handleSignOut = () => {router.push('/')};
 
  return (
    <nav className="w-full bg-white border-b border-[#F3D9CF] px-4 flex flex-wrap items-center justify-between sticky top-0 z-[100] gap-2 py-1">
 
      <Link href="/">
        <Image src="/logo1.png" alt="Logo" width={150} height={150} className="w-16 md:w-38" />
      </Link>
 
      <div className="flex flex-wrap items-center gap-3 md:gap-8">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[10px] md:text-sm font-medium transition-colors hover:text-[#D2693E] ${isActive ? 'text-[#D2693E]' : 'text-[#4A3933]/70'}`}> {link.name} </Link> );
              }
            )
          }
      </div>

      <button onClick={handleSignOut} className="px-3 py-1.5 text-[9px] md:text-[10px] font-bold text-white bg-[#DA653B] rounded-full hover:shadow-lg transition-all active:scale-95 uppercase tracking-widest"> Sign out </button>
 
    </nav>
  );
}
 