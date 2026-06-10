'use client'; 
import { useState, useEffect } from 'react';
import { Search, Sparkles, Users, Palette, Send, ArrowRight } from 'lucide-react';
// IMPORTANTE: Importamos Link para la navegación nativa
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [imgIndex, setImgIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const images = [
    "https://guanacos.com/wp-content/uploads/2022/10/GUANACOS-ALFARERIA-EN-ILOBASCO-1536x1024.jpg",
    "https://perrocronico.com/wp-content/uploads/2021/10/foto3_juchitan.jpg",
    "https://elsalvadorviajar.com/wp-content/uploads/2022/05/Bailes-y-trajes-tipicos-de-El-Salvador.jpg",
    "https://i.ytimg.com/vi/3i6YXanz094/maxresdefault.jpg"
  ];

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const timer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % images.length);
    }, 9000); 

    let observer: IntersectionObserver | null = null;
    
    const timeoutId = setTimeout(() => {
      const observerOptions = { threshold: 0.1 };
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-[30px]');
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        });
      }, observerOptions);

      document.querySelectorAll('.reveal').forEach((el) => observer?.observe(el)); }, 100);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
      if (observer) observer.disconnect();
    };
  }, [images.length]);

  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#D17842] selection:text-white">
      
      {/* 1. NAVEGACIÓN */}
      <nav className={`fixed w-full z-50 transition-all duration-500 px-2 md:px-5 ${
        mounted && isScrolled ? 'py-2 bg-white shadow-sm' : 'py-2 bg-white  shadow-md'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          <div className="flex-shrink-0">
            <Image src="/logo1.png" alt="Logo" width={150} height={150} />
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/Login" 
              className="px-3 py-2.5 text-[10px] font-bold text-white bg-[#D17842] rounded-full hover:shadow-lg hover:brightness-110 transition-all transform hover:-translate-y-0.5 uppercase tracking-widest text-center"
            >
              Log in
            </Link>
            <Link 
              href="/register" 
              className="px-3 py-2.5 text-[10px] font-bold text-white bg-[#D17842] rounded-full hover:shadow-lg hover:brightness-110 transition-all transform hover:-translate-y-0.5 uppercase tracking-widest text-center"
>
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      
      <section className="relative pt-40 pb-20 px-10 max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center reveal opacity-0 translate-y-[30px] transition-all duration-[1000ms] ease-out">
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
        </div>

        <div className="lg:col-span-7 relative h-[600px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
          {images.map((img, idx) => (
            <img 
              key={idx}
              src={img} 
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1.5s] ease-in-out ${idx === imgIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
              alt="Salvadoran Culture"/>
          ))}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10 bg-black/20 backdrop-blur-md p-3 rounded-full">
            {images.map((_, idx) => (
              <button key={idx} onClick={() => setImgIndex(idx)} className={`h-1.5 rounded-full transition-all duration-500 ${idx === imgIndex ? 'bg-white w-10' : 'bg-white/40 w-2'}`} />
            ))}
          </div>
        </div>
      </section>

      
      <section className="max-w-7xl mx-auto px-10 py-32 border-t border-slate-50 reveal opacity-0 translate-y-[30px] transition-all duration-[1000ms] ease-out">
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

      <section className="grid md:grid-cols-2 bg-[#F5E6D3] min-h-[600px] reveal opacity-0 translate-y-[30px] transition-all duration-[1000ms] ease-out">
        <div className="relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1621846323386-a60faf26f962?blend=000000&blend-alpha=10&blend-mode=normal&blend-w=1&crop=faces%2Cedges&h=630&mark=https:%2F%2Fimages.unsplash.com%2Fopengraph%2Flogo.png&mark-align=top%2Cleft&mark-pad=50&mark-w=64&w=1200&auto=format&fit=crop&q=60&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzAzOTAzMDIwfA&ixlib=rb-4.0.3" 
            className="w-full h-full object-cover"
            alt="Artisan hands"/>
        </div>
        <div className="flex flex-col justify-center p-12 md:p-24 space-y-10">
          <span className="text-8xl text-[#D17842] font-serif leading-none opacity-40">&ldquo;</span>
          <p className="text-3xl md:text-5xl font-serif italic text-slate-800 leading-tight">
            When we share our craft, we share the soul of our ancestors. These workshops are <span className="text-[#D17842]">bridges between worlds</span>.
          </p>
          <div className="flex items-center gap-6">
            <div className="w-16 h-[1px] bg-[#D17842]"></div>
            <p className="text-[10px] tracking-[0.4em] font-black text-[#D17842] uppercase">The Artisan's Promise</p>
          </div>
        </div>
      </section>

      
      <section className="max-w-7xl mx-auto px-10 py-32 reveal opacity-0 translate-y-[30px] transition-all duration-[1000ms] ease-out">
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

     
      <section className="bg-[#D17842] py-32 text-center px-10 reveal opacity-0 translate-y-[30px] transition-all duration-[1000ms] ease-out">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">Ready to see the unseen?</h2>
          <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Join us in redefining travel through intentional connection and the preservation of culture.
          </p>
          <div className="flex justify-center pt-6">
            <Link href="/register" className="bg-white text-[#D17842] px-12 py-5 rounded-xl font-bold text-xs tracking-widest uppercase shadow-2xl hover:bg-slate-50 transition-all transform hover:-translate-y-1">
              Start your journey
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}