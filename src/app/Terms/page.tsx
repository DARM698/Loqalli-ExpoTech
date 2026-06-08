import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-md">
        {/* Decorative Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D17842]/10 text-[#D17842] font-bold text-[10px] tracking-[0.2em] uppercase">
          Under Construction
        </div>
        
        {/* Title and Message */}
        <h1 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
          We're refining <br/> 
          <span className="italic text-[#D17842]">the details</span>
        </h1>
        
        <p className="text-slate-500 text-sm leading-relaxed">
          We are working hard to provide you with a better experience and to ensure all our legal information is clear and ready for you. Thank you for your patience.
        </p>

        {/* Home Button */}
        <div className="pt-8">
          <Link 
            href="/" 
            className="inline-block px-8 py-4 bg-[#D17842] text-white rounded-xl font-bold text-xs tracking-widest hover:bg-[#D17842] transition-all uppercase"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}