import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-md">
        {/* Decorative Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D17842]/10 text-[#D17842] font-bold text-[10px] tracking-[0.2em] uppercase">
          Under Construction
        </div>
        
        {/* Title and Message */}
        <h1 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
          Privacy is <br/> 
          <span className="italic text-[#D17842]">a priority</span>
        </h1>
        
        <p className="text-slate-500 text-sm leading-relaxed">
          We are currently updating our Privacy Policy to ensure the highest standards of data protection for our community. We will be back with all the details shortly.
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