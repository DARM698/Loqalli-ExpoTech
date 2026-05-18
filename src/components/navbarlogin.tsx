export default function NavbarLogin() {
    return(
    <>
        <nav className={`fixed w-full z-50 transition-all top-4 duration-500 px-6 md:px-10'py-4 bg-white/90 backdrop-blur-md shadow-sm' : 'py-8 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#D17842] tracking-tighter italic">Loqalli</h1>
          
          <div className="hidden lg:flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
            <a href="#" className="hover:text-[#D17842] transition-colors">About us</a>
          </div>
 
          <div className="flex items-center gap-3">
            <button className="px-6 py-2.5 text-[10px] font-bold text-white bg-[#D17842] rounded-full hover:shadow-lg hover:brightness-110 transition-all transform hover:-translate-y-0.5 uppercase tracking-widest">
              Log in
            </button>
            <button className="px-6 py-2.5 text-[10px] font-bold text-white bg-[#D17842] rounded-full hover:shadow-lg hover:brightness-110 transition-all transform hover:-translate-y-0.5 uppercase tracking-widest">
              Sign Up
            </button>
          </div>
        </div>
        </nav>
        </>
     )
}