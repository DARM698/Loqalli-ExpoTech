import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import NavbarUser from '@/components/shared/navbar'; // Asegúrate de que esta ruta sea la correcta
import Link from 'next/link';
import Image from 'next/image';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'un_secret_muy_largo_y_seguro_de_mas_de_32_caracteres'
);

export default async function AboutPage() {
  // Lógica para obtener el usuario actual desde la cookie
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;
  let userSession = { role: 'TOURIST' as 'TOURIST' | 'HOST', id: '' };

  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      userSession = {
        role: (payload.role as 'TOURIST' | 'HOST') || 'TOURIST',
        id: payload.id as string
      };
    } catch (err) {
      console.error("Error al validar sesión:", err);
    }
  }

  return (
    <main className="flex flex-col font-sans text-slate-800">
      {/* Navbar integrado */}
      <NavbarUser role={userSession.role} userId={userSession.id} />

      <section
        className="relative h-[500px] flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/foto-gratis/hermosos-artesanos-sentados-banco-rueda-alfarero-haciendo-vasijas-barro-productos-hechos-mano_257488-4022.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay*/}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>

        {/* Contenido */}
        <div className="relative z-10 px-6 text-white max-w-4xl">
          <h1 className="text-7xl md:text-8xl font-serif font-medium tracking-tight">
            About Us
          </h1>

          <p className="mt-6 text-lg text-gray-200 leading-relaxed">
            Local knowledge and tourists curiosity by offering unique
            micro-experiences hosted by local individuals.
          </p>
        </div>
      </section>

      {/* BLOQUE 1 */}
      <section className="py-16 px-10 bg-gray-100">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h2 className="text-3xl font-serif font-semibold text-[#D17842] mb-4">
              The Soul of the Journey
            </h2>
            <p className="text-gray-600 font-sans">
              We connect travelers with authentic cultural experiences and
              local artisans, creating journeys that matter.
            </p>
          </div>

          <img 
            src="https://artepopularchihuahua.mx/ap/images/pintura-artesanal-tarahumara-madera-chihuahua.jpg"
            alt="Artisan hands"
          />

        </div>
      </section>

      {/* BLOQUE 2 */}
      <section className="py-16 px-10 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <img 
            src="https://images.unsplash.com/photo-1621846323386-a60faf26f962?blend=000000&blend-alpha=10&blend-mode=normal&blend-w=1&crop=faces%2Cedges&h=630&mark=https:%2F%2Fimages.unsplash.com%2Fopengraph%2Flogo.png&mark-align=top%2Cleft&mark-pad=50&mark-w=64&w=1200&auto=format&fit=crop&q=60&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzAzOTAzMDIwfA&ixlib=rb-4.0.3" 
            className="w-full h-full object-cover"
            alt="Artisan hands"
          />

          <div>
            <h2 className="text-3xl font-serif font-semibold text-[#D17842] mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 font-sans">
              Create a digital bridge where travelers can connect with the real
              soul of each destination through local experiences.
            </p>
          </div>

        </div>
      </section>

      {/* BLOQUE BEIGE */}
      <section className="py-16 px-10 bg-[#e6d2b5]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h3 className="text-2xl font-serif font-semibold text-[#D17842] mb-4">
              Bridging Worlds with Intention
            </h3>
            <p className="text-slate-700 font-sans">
              We offer unique micro-experiences rooted in Salvadoran culture,
              led by local artisans who share their traditions and knowledge.
            </p>
          </div>

          <img 
            src="https://i.ytimg.com/vi/6D3JLA5dX0I/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGHIgTyg-MA8=&rs=AOn4CLCc1_oLx17lW38tLOe4ixz8jmDzsw"
            alt="Artisan hands"
          />

        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 px-10 bg-white">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-serif font-semibold text-[#D17842]">
            Our Values
          </h2>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3">Authenticity</h3>
            <p className="text-gray-600 text-sm">
              Real cultural experiences guided by local traditions.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3">Connection</h3>
            <p className="text-gray-600 text-sm">
              We connect people through meaningful interactions.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3">Impact</h3>
            <p className="text-gray-600 text-sm">
              Supporting local communities and preserving heritage.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}