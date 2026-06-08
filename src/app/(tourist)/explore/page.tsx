// app/explore/page.tsx
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers'; 
import { jwtVerify } from 'jose'; 
import ExperienceCard from '@/components/experiences/cardExperience';
import ExploreFilters from '@/components/experiences/sortExperience';
import NavbarUser from '@/components/shared/navbar';
import Footer from '@/components/Footer/Footer';
 
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'un_secret_muy_largo_y_seguro_de_mas_de_32_caracteres'
);

interface PageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    priceRange?: string;
  }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const { search, category, priceRange } = await searchParams;

  // 1. LEER EL TOKEN DE SESIÓN REAL (Igual que en tu middleware)
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;
  
  let currentRole: 'TOURIST' | 'HOST' = 'TOURIST';

  if (token) {
    try {
      // Desencriptamos el JWT directamente en el servidor
      const { payload } = await jwtVerify(token, JWT_SECRET);
      
      if (payload.role === 'HOST' || payload.role === 'TOURIST') {
        currentRole = payload.role as 'TOURIST' | 'HOST';
      }
    } catch (err) {
      console.error("Error verificando token en Explore:", err);
    }
  }

  const whereClause: any = { status: 'PUBLISHED' };
  if (search) {
    whereClause.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }
  if (category) whereClause.category = category;
  if (priceRange) {
    if (priceRange === '1-20') whereClause.pricePerPerson = { gte: 1, lte: 20 };
    else if (priceRange === '20-40') whereClause.pricePerPerson = { gte: 20, lte: 40 };
    else if (priceRange === '40+') whereClause.pricePerPerson = { gte: 40 };
  }

  const experiences = await prisma.experience.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-white">
      <NavbarUser role={currentRole} />
      
      <main className="max-w-7xl mx-auto px-6 py-10">
        <section className="mb-6">
          <h1 className="text-4xl md:text-5xl font-serif text-[#4A3933] mb-8">
            Growing economies, connecting identities
          </h1>
          <ExploreFilters />
        </section>

        {experiences.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-200 rounded-2xl">
            <p className="text-gray-400 font-medium">No micro-experiences match your current filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-700">
            {experiences.map((exp) => (
              <ExperienceCard 
                key={exp.id}
                id={exp.id}
                title={exp.title}
                description={exp.description}
                price={exp.pricePerPerson}
                category={exp.category}
                address={exp.address}
                image={exp.images[0]} 
              />
            ))}
          </div>
        )}
      </main>
       <Footer />
    </div>
  );
}