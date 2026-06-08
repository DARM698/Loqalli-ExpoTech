// components/Footer/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white pt-20 pb-12 px-6 border-t border-slate-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-[#D17842] tracking-tighter italic">Loqalli</h3>
          <p className="text-slate-400 text-sm leading-relaxed">Crafting connections across the artisanal landscape of El Salvador.</p>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold tracking-[0.2em] text-slate-900 uppercase">Resources</h4>
          <ul className="space-y-3 text-sm text-slate-500 font-medium">
            <li><Link href="/Login/login-host" className="hover:text-[#D17842] transition-colors">Host an Experience</Link></li>
            <li><Link href="/aboutUs" className="hover:text-[#D17842] transition-colors">About Us</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-bold tracking-[0.2em] text-slate-900 uppercase">Legal</h4>
          <ul className="space-y-3 text-sm text-slate-500 font-medium">
            <li><Link href="/Terms" className="hover:text-[#D17842] transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-[#D17842] transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-bold tracking-[0.2em] text-slate-900 uppercase">Connect</h4>
          <p className="text-sm text-slate-500 font-medium">loqalliOfficial@.com</p>
        </div>
      </div>
    </footer>
  );
}