'use client'; 
import { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, Users, Palette, Heart, Send, ArrowRight } from 'lucide-react';

export default function Home() {
  const [imgIndex, setImgIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const images = [
    "https://guanacos.com/wp-content/uploads/2022/10/GUANACOS-ALFARERIA-EN-ILOBASCO-1536x1024.jpg",
    "https://i1.wp.com/revistaaventurero.com.mx/wp-content/uploads/2017/10/MU%C3%91ECOS-Amealco-Qro.-Turismo-facebook.jpg?fit=960%2C640&ssl=1",
    "https://perrocronico.com/wp-content/uploads/2021/10/foto3_juchitan.jpg",
    "https://elsalvadorviajar.com/wp-content/uploads/2022/05/Bailes-y-trajes-tipicos-de-El-Salvador.jpg",
    "https://i.ytimg.com/vi/3i6YXanz094/maxresdefault.jpg"
  ];

  useEffect(() => {
    // 1. Manejo del Header
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // 2. Carrusel automático
    const timer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % images.length);
    }, 9000); 

    // 3. EFECTO SCROLL (Intersection Observer)
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [images.length]);

  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#D17842] selection:text-white">
      
  
      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s ease-out;
        }
        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* 1. NAVEGACIÓN (Botones Idénticos) */}
      <nav className={`fixed w-full z-50 transition-all duration-500 px-6 md:px-10 ${
        isScrolled ? 'py-4 bg-white/90 backdrop-blur-md shadow-sm' : 'py-8 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#D17842] tracking-tighter italic">Loqalli</h1>
          
          <div className="hidden lg:flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
            <a href="#" className="hover:text-[#D17842] transition-colors">Experiences</a>
            <a href="#" className="hover:text-[#D17842] transition-colors">Hosts</a>
            <a href="#" className="hover:text-[#D17842] transition-colors">About us</a>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-6 py-2.5 text-[10px] font-bold text-white bg-[#D17842] rounded-full hover:shadow-lg hover:brightness-110 transition-all transform hover:-translate-y-0.5 uppercase tracking-widest">
              Login
            </button>
            <button className="px-6 py-2.5 text-[10px] font-bold text-white bg-[#D17842] rounded-full hover:shadow-lg hover:brightness-110 transition-all transform hover:-translate-y-0.5 uppercase tracking-widest">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION (Aparece primero) */}
      <section className="relative pt-40 pb-20 px-10 max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center reveal">
        <div className="lg:col-span-5 space-y-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D17842]/10 text-[#D17842] font-bold text-[10px] tracking-[0.2em] uppercase">
            Authentic Micro-Experiences
          </div>
          <h2 className="text-6xl xl:text-7xl font-serif font-medium leading-[1.1] text-slate-900">
            The heart of El Salvador, <br/> 
            <span className="italic text-[#D17842]">One Experience</span> at a Time
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed max-w-md">
            Skip the generic tours. Connect with master artisans in curated journeys that preserve a thousand years of heritage.
          </p>
          <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-xs tracking-widest hover:bg-[#D17842] transition-all flex items-center gap-2 group uppercase">
            Explore Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="lg:col-span-7 relative h-[600px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
          {images.map((img, idx) => (
            <img 
              key={idx}
              src={img} 
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1.5s] ease-in-out ${idx === imgIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
              alt="Salvadoran Culture"
            />
          ))}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10 bg-black/20 backdrop-blur-md p-3 rounded-full">
            {images.map((_, idx) => (
              <button key={idx} onClick={() => setImgIndex(idx)} className={`h-1.5 rounded-full transition-all duration-500 ${idx === imgIndex ? 'bg-white w-10' : 'bg-white/40 w-2'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURES (Aparecen al bajar) */}
      <section className="max-w-7xl mx-auto px-10 py-32 border-t border-slate-50 reveal">
        <div className="grid md:grid-cols-3 gap-16">
          {[
            { i: <Sparkles />, t: "Discover", d: "Uncover hidden workshops and unique crafts tucked away in the vibrant villages of El Salvador." },
            { i: <Users />, t: "Connect", d: "Engage in private conversations and intimate storytelling with masters of traditional arts." },
            { i: <Palette />, t: "Create", d: "Learn the ancestral techniques yourself in hands-on workshops led by generational artisans." }
          ].map((f, i) => (
            <div key={i} className="group space-y-6">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#D17842] group-hover:bg-[#D17842] group-hover:text-white transition-all duration-500 shadow-sm">
                {f.i}
              </div>
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">{f.t}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SECCIÓN DE CITA */}
      <section className="grid md:grid-cols-2 bg-[#F5E6D3] min-h-[600px] reveal">
        <div className="relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1621846323386-a60faf26f962?blend=000000&blend-alpha=10&blend-mode=normal&blend-w=1&crop=faces%2Cedges&h=630&mark=https:%2F%2Fimages.unsplash.com%2Fopengraph%2Flogo.png&mark-align=top%2Cleft&mark-pad=50&mark-w=64&w=1200&auto=format&fit=crop&q=60&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzAzOTAzMDIwfA&ixlib=rb-4.0.3" 
            className="w-full h-full object-cover"
            alt="Artisan hands"
          />
        </div>
        <div className="flex flex-col justify-center p-12 md:p-24 space-y-10">
          <span className="text-8xl text-[#D17842] font-serif leading-none opacity-40">"</span>
          <p className="text-3xl md:text-5xl font-serif italic text-slate-800 leading-tight">
            When we share our craft, we share the soul of our ancestors. These workshops are <span className="text-[#D17842]">bridges between worlds</span>.
          </p>
          <div className="flex items-center gap-6">
            <div className="w-16 h-[1px] bg-[#D17842]"></div>
            <p className="text-[10px] tracking-[0.4em] font-black text-[#D17842] uppercase">The Artisan's Promise</p>
          </div>
        </div>
      </section>

      {/* 5. EXPERIENCIAS (Atol Chuco y Tradiciones) */}
      <section className="max-w-7xl mx-auto px-10 py-32 reveal">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="space-y-4">
            <p className="text-[#D17842] tracking-[0.3em] font-bold text-[10px] uppercase">Curated Selections</p>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900">Featured Journeys</h2>
          </div>
          <button className="text-xs font-bold text-slate-400 hover:text-[#D17842] transition-colors border-b border-slate-200 pb-2 uppercase tracking-widest">
            View All
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            { 
              loc: "SUCHITOTO", 
              price: "$45", 
              title: "Secrets of Atol Chuco", 
              rating: "4.9", 
              img: "https://tse4.mm.bing.net/th/id/OIP.2toWbnT2DyxyOmhpgq3wVgFJC9?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
              desc: "Deep in the markets, learn the ancient fermentation of black corn. Serve this ritualistic drink in traditional 'morro' husks with salty beans and alhuashte powder."
            },
            { 
              loc: "CULTURAL IMMERSION", 
              price: "$45", 
              title: "Rhythms & Folklore", 
              rating: "5.0", 
              img: "https://www.honduras.com/wp-content/uploads/2021/05/folk-2.jpg",
              desc: "Experience the vibrant 'Danza de los Historiantes'. Learn the steps of Salvadoran folk dances and the storytelling behind the colorful handmade costumes."
            },
            { 
              loc: "ILOBASCO", 
              price: "$65", 
              title: "The Art of Miniatures", 
              rating: "4.8", 
              img: "https://programasaberfazer.gov.pt/_next/image?url=https:%2F%2Fprogramasaberfazer.gov.pt%2Fuploads%2F20230529_Olaria_Xico_Tarefa_163312_0046_2d5e09fd21.jpg&w=750&q=70",
              desc: "Join a master potter to shape volcanic clay into world-famous 'sorpresas'. A journey through generational techniques of miniature ceramic sculpting."
            }
          ].map((item, idx) => (
            <div key={idx} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-8 shadow-sm">
                <img src={item.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.title} />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                  <span className="text-[#D17842]">★</span> {item.rating}
                </div>
              </div>
              <div className="flex justify-between items-center mb-3">
                <p className="text-[10px] font-black tracking-[0.2em] text-[#D17842] uppercase">{item.loc}</p>
                <p className="text-sm font-serif font-bold text-slate-900">{item.price}<span className="text-[10px] text-slate-400 font-sans ml-1">/ pers</span></p>
              </div>
              <h3 className="text-2xl font-serif text-slate-900 mb-4 group-hover:text-[#D17842] transition-colors">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-3">{item.desc}</p>
              <button className="text-[10px] font-bold tracking-[0.2em] uppercase border-b border-slate-200 hover:border-slate-900 pb-1 transition-all">Details</button>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="bg-[#D17842] py-32 text-center px-10 reveal">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">Ready to see the unseen?</h2>
          <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Join us in redefining travel through intentional connection and the preservation of culture.
          </p>
          <div className="flex justify-center pt-6">
            <button className="bg-white text-[#D17842] px-12 py-5 rounded-xl font-bold text-xs tracking-widest uppercase shadow-2xl hover:bg-slate-50 transition-all transform hover:-translate-y-1">
              Start your journey
            </button>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-white pt-32 pb-12 px-10 border-t border-slate-100 reveal">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-[#D17842] tracking-tighter italic">Loqalli</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Crafting connections across the artisanal landscape of El Salvador.</p>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold tracking-[0.3em] text-slate-900 uppercase">Resources</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              <li><a href="#" className="hover:text-[#D17842] transition-colors">Host an Experience</a></li>
              <li><a href="#" className="hover:text-[#D17842] transition-colors">Safety & Standards</a></li>
              <li><a href="#" className="hover:text-[#D17842] transition-colors">Help Center</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold tracking-[0.3em] text-slate-900 uppercase">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              <li><a href="#" className="hover:text-[#D17842] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#D17842] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold tracking-[0.3em] text-slate-900 uppercase">Newsletter</h4>
            <div className="flex border-b border-slate-200 pb-3 group-focus-within:border-[#D17842] transition-colors">
              <input type="email" placeholder="Your email address" className="bg-transparent outline-none text-sm flex-1 text-slate-600 italic" />
              <button className="text-[#D17842] hover:translate-x-1 transition-transform"><Send size={18} /></button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-50 text-center text-[9px] text-slate-400 font-bold tracking-[0.4em] uppercase">
          © 2026 Loqalli — Preserving Culture Through Micro-Experiences
        </div>
      </footer>
    </main>
  );
}
