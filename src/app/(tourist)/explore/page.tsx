// app/explore/page.tsx
import { prisma } from '@/lib/prisma';
import ExperienceCard from '@/components/experiences/cardExperience';
import HostNavbar from '@/components/shared/navbar';
import ExploreFilters from '@/components/experiences/sortExperience';

interface PageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    priceRange?: string;
  }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  // En Next.js 15+ los searchParams son promesas, los resolvemos con await
  const { search, category, priceRange } = await searchParams;

  // Construcción del filtro condicional de Prisma
  const whereClause: any = {
    status: 'PUBLISHED',
  };

  // 1. Filtrado por barra de búsqueda (Títulos o descripciones que contengan la palabra)
  if (search) {
    whereClause.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }

  // 2. Filtrado por categoría exacta
  if (category) {
    whereClause.category = category;
  }

  // 3. Filtrado por rangos de precio usando gte (>=) y lte (<=) basándonos en tu modelo
  if (priceRange) {
    if (priceRange === '1-20') {
      whereClause.pricePerPerson = { gte: 1, lte: 20 };
    } else if (priceRange === '20-40') {
      whereClause.pricePerPerson = { gte: 20, lte: 40 };
    } else if (priceRange === '40+') {
      whereClause.pricePerPerson = { gte: 40 };
    }
  }

  // Ejecutamos la consulta reactiva a Postgres
  const experiences = await prisma.experience.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-white">
      <HostNavbar />
      
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Hero Section */}
        <section className="mb-6">
          <h1 className="text-4xl md:text-5xl font-serif text-[#4A3933] mb-8">
            Growing economies, connecting identities
          </h1>

          {/* Componente de Filtros del Cliente */}
          <ExploreFilters />
        </section>

        {/* Grid de Experiencias */}
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
    </div>
  );
}