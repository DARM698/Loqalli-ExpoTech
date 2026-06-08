import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import NavbarUser from '@/components/shared/navbar'; // Ajusta la ruta si es necesario
import CreateExperienceForm from '@/components/CreateExperienceForm/page';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'un_secret_muy_largo_y_seguro_de_mas_de_32_caracteres'
);

export default async function EditExperiencePage({ 
  params 
}: { 
  params: { id?: string[] } 
}) {
  // 1. Obtener sesión del usuario para el Navbar
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
      console.error("Error validando sesión:", err);
    }
  }

  // 2. Resolvemos los parámetros
  const resolvedParams = await params;
  const idArray = resolvedParams.id;
  const experienceId = idArray && idArray.length > 0 ? idArray[0] : null;

  // 3. Lógica de creación vs edición
  let initialData = null;

  if (experienceId && experienceId !== 'new') {
    const experience = await prisma.experience.findUnique({
      where: { id: experienceId },
    });

    if (!experience) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl text-gray-600">Experience not found.</p>
        </div>
      );
    }

    initialData = {
      ...experience,
      price: experience.pricePerPerson ? Number(experience.pricePerPerson) : 0,
      participants: experience.maxParticipants ? Number(experience.maxParticipants) : 1,
      startHour: experience.startTime ? parseInt(experience.startTime.split(":")[0]) : 9,
      startMin: experience.startTime ? parseInt(experience.startTime.split(":")[1]) : 0,
      endHour: experience.endTime ? parseInt(experience.endTime.split(":")[0]) : 12,
      endMin: experience.endTime ? parseInt(experience.endTime.split(":")[1]) : 0,
      selectedDays: experience.days || [],
      images: experience.images || [],
      arrivalImages: experience.arrivalImages || [],
    };
  }

  return (
    <>
      <NavbarUser role={userSession.role} userId={userSession.id} />
      <CreateExperienceForm initialData={initialData} />
    </>
  );
}