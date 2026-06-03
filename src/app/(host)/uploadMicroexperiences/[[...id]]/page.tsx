import { prisma } from '@/lib/prisma';
import CreateExperienceForm from '@/components/CreateExperienceForm/page';

export default async function EditExperiencePage({ 
  params 
}: { 
  params: { id?: string[] } 
}) {
  // 1. Resolvemos los parámetros (Next.js 15+ requiere await en params)
  const resolvedParams = await params;
  const idArray = resolvedParams.id;
  const experienceId = idArray && idArray.length > 0 ? idArray[0] : null;

  // 2. CASO: Crear nueva experiencia (si no hay ID o es "new")
  if (!experienceId || experienceId === 'new') {
    return <CreateExperienceForm initialData={null} />;
  }

  // 3. CASO: Editar experiencia existente
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

  // 4. Normalización de datos para que el formulario los entienda perfectamente
  const sanitizedData = {
    ...experience,
    // Mapeo de campos de Prisma al formato esperado por tu Formulario
    price: experience.pricePerPerson ? Number(experience.pricePerPerson) : 0,
    participants: experience.maxParticipants ? Number(experience.maxParticipants) : 1,
    
    // Manejo de horas: asumiendo que en DB guardas "HH:MM"
    startHour: experience.startTime ? parseInt(experience.startTime.split(":")[0]) : 9,
    startMin: experience.startTime ? parseInt(experience.startTime.split(":")[1]) : 0,
    endHour: experience.endTime ? parseInt(experience.endTime.split(":")[0]) : 12,
    endMin: experience.endTime ? parseInt(experience.endTime.split(":")[1]) : 0,
    
    // Mapeo de arreglos
    selectedDays: experience.days || [],
    images: experience.images || [],
    arrivalImages: experience.arrivalImages || [],
  };

  return <CreateExperienceForm initialData={sanitizedData} />;
}