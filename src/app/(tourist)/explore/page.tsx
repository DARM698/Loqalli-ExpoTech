import { prisma } from '@/lib/prisma';
import ExperienceCard from '@/components/experiences/cardExperience';
import HostNavbar from '@/components/shared/navbar';

export default async function HomePage() {
  const experiences = await prisma.experience.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-white">
      <HostNavbar />
      
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-[#4A3933] mb-8">
            Growing economies, connecting identities
          </h1>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-grow relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></span>
              <input 
                type="text" 
                placeholder="Search experiences..." 
                className="w-full pl-12 pr-4 py-3 border border-gray-300 text-gray-700 rounded-md focus:ring-1 focus:ring-[#D2693E] outline-none"
              />
            </div>
            <button className="bg-[#D2693E] text-white px-8 py-3 rounded-md font-bold flex items-center gap-2">
              <span></span> Filter
            </button>
            <select className="border border-gray-200 rounded-md px-4 py-3 bg-white text-gray-600 outline-none">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
            </select>
          </div>
        </section>

        {/* Grid de Experiencias */}
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
              image={exp.images[0]} // Usamos la primera imagen subida a Supabase
            />
          ))}
        </div>
      </main>
    </div>
  );
}