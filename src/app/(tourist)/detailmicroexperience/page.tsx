import BookingButton from "@/components/experiences/BookingButton";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma"; 

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function ExperienceDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const experienceId = resolvedParams.id;


  let experience: any = null;

  try {
    experience = await prisma.experience.findUnique({
      where: { id: experienceId },
      include: {
        User: true, 
      },
    });
  } catch (error) {
    console.error("Error al consultar Supabase con Prisma 7:", error);
  }

 
  if (!experience) {
    notFound();
  }

  
  const mainImage = experience.images && experience.images.length > 0 
    ? experience.images[0] 
    : "https://images.stockcake.com/public/d/3/7/d378e63d-eb24-4b4e-8697-ba64c98b6e14_large/indigo-dyeing-tradition-stockcake.jpg";

  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans pb-20">
      
      {/* NAVBAR */}
      <nav className="w-full px-8 py-6 flex justify-between items-center border-b bg-white max-w-5xl mx-auto">
        <h1 className="text-2xl font-serif italic text-[#D17842] font-medium">Loqalli</h1>
        <div className="flex gap-6 text-sm font-semibold text-gray-600">
          <span className="cursor-pointer">experiences</span>
          <span className="cursor-pointer">hosts/collective</span>
          <span className="cursor-pointer">profile</span>
          <span className="cursor-pointer">values</span>
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search experiences..." 
            className="border rounded-full pl-4 pr-10 py-1.5 text-xs outline-none bg-gray-50 w-48 text-gray-400"
          />
          <span className="absolute right-3 top-2 text-xs text-gray-400">🔍</span>
        </div>
      </nav>

      {/* container style */}
      <div className="max-w-4xl mx-auto px-6 mt-8">
        
        <p className="text-xs text-gray-400 mb-2 font-mono uppercase tracking-widest">Experience Details (Desktop)</p>
        
        {/*  */}
        <div className="w-full h-[380px] rounded-lg overflow-hidden relative shadow-sm">
          <img 
            src={mainImage} 
            alt={experience.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/*  */}
        <div className="flex gap-4 text-xs text-gray-500 mt-3 px-1">
          <span>⭐ 5.0 (48 Reviews)</span>
          <span>📍 {experience.address}</span>
          <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 text-[10px] font-bold uppercase">
            {experience.category}
          </span>
        </div>

        {/* price section  'pricePerPerson' */}
        <div className="mt-8 border-t pt-6 max-w-2xl">
          <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">From per person</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-4xl font-serif font-bold text-slate-900">
              ${experience.pricePerPerson}
            </span>
            <span className="text-sm text-gray-500">/ person</span>
          </div>
          
          <div className="text-sm text-slate-700 mt-4 font-medium flex flex-col gap-1.5">
            <p>🕒 Disponibilidad de días: <span className="text-gray-500 font-normal">{experience.days.join(", ")}</span></p>
            <p>👥 Cupos máximos por sesión: <span className="text-gray-500 font-normal">{experience.maxParticipants} personas</span></p>
          </div>
        </div>

        {/*  */}
        <div className="mt-8 p-5 border rounded-xl bg-gray-50/50 flex items-center gap-4 max-w-2xl">
          <img 
            src={experience.User.profileImage || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"} 
            alt={experience.User.fullName}
            className="w-14 h-14 rounded-full object-cover border-2 border-[#D17842]/20"
          />
          <div>
            <p className="text-xs text-[#D17842] font-mono font-bold tracking-wider">
              {experience.User.role}
            </p>
            <h3 className="text-2xl font-serif font-semibold text-slate-800">
              {experience.User.fullName}
            </h3>
          </div>
        </div>

        {/*  */}
        <div className="mt-6 max-w-2xl">
          <BookingButton experience={experience} />
        </div>

        {/* TABS DE DETALLES USANDO CAMPOS REALES */}
        <div className="mt-12 grid grid-cols-3 gap-6 border-t pt-8 text-sm max-w-2xl">
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-2">About the experience</h4>
            <p className="text-gray-600 leading-relaxed text-xs">{experience.description}</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-2">Host Bio</h4>
            <p className="text-gray-600 leading-relaxed text-xs">
              {experience.User.bio || "No biography provided by the host yet."}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-2">Available Slots</h4>
            <p className="text-gray-600 leading-relaxed text-xs">
              {experience.slots.length > 0 ? experience.slots.join(" - ") : "Check with the host"}
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}