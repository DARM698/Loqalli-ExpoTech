import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import Link from 'next/link';
import ExperienceActions from '@/components/experiences/ExperiencesActions';
import ProfileImageUploader from '@/components/ProfileImageUploader';

interface ProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id: profileId } = await params;
  console.log("--- DEBUG: Perfil cargado ---");
  console.log("ID recibido en params:", profileId); 
  console.log("Typeof profileId:", typeof profileId);

  console.log("Buscando usuario con ID:", profileId);
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;
  
  let currentUserId: string | null = null;

  if (token) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET || 'un_secret_muy_largo_y_seguro_de_mas_de_32_caracteres')
      );
      currentUserId = payload.id as string;
    } catch (error) {
      console.error("Error verificando sesión:", error);
    }
  }

  // Determinar si el visitante es el dueño del perfil
  const isOwner = currentUserId === profileId;

  // 2. Consulta a la base de datos (buscamos el usuario por el ID de la URL)
  const user = await prisma.user.findUnique({
    where: { id: profileId },
    include: {
      experiences: true,
      Booking: { include: { Experience: true } },
      receivedReviews: { include: { author: { select: { fullName: true } } } }
    }
  });

  if (!user) return <div className="p-10 text-center">Usuario no encontrado.</div>;

  const reviews = user.receivedReviews;
  const experiences = user.experiences;
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <main className="bg-[#f8f6f3] min-h-screen text-slate-800 pb-20">
      {/* HERO */}
      <section className="max-w-7xl mx-auto mt-8 px-6">
        <div className="relative h-[420px] rounded-3xl overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('https://tv.joycemeyer.org/espanol/wp-content/uploads/sites/3/2021/12/2115-768x448.jpg')" }}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute bottom-8 left-8 flex items-end gap-6">
            <div className="relative">
              <img 
                src={user.profileImage || "/avatar.png"} 
                alt={user.fullName} 
                className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-xl" 
              />
              {/* Solo el dueño puede editar su foto */}
              {isOwner && <ProfileImageUploader userId={user.id} />}
            </div>
            <div className="text-white">
              <h2 className="text-5xl font-bold font-serif">{user.fullName}</h2>
              <p className="mt-2 text-lg uppercase tracking-wider text-sm opacity-90">{user.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 mt-8">
        <div className="bg-white rounded-3xl shadow-sm p-10 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Rating</p>
            {averageRating ? (
              <h3 className="text-5xl font-bold mt-4">{averageRating}</h3>
            ) : <p className="mt-8 text-gray-500 italic">No ratings yet</p>}
          </div>
          <div className="flex items-center justify-center">
            {/* Solo el dueño ve el botón de gestionar */}
            {isOwner && user.role === 'HOST' && (
              <button className="bg-[#D17842] text-white px-10 py-4 rounded-xl font-semibold">
                Manage Workshops
              </button>
            )}
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
              {user.role === 'HOST' ? 'Experiences' : 'Participated'}
            </p>
            <h3 className="text-5xl font-bold mt-4">
              {user.role === 'HOST' ? experiences.length : (user.Booking?.length || 0)}
            </h3>
          </div>
        </div>
      </section>

      {/* EXPERIENCIAS (Si es HOST) */}
      {user.role === 'HOST' && (
        <section className="max-w-7xl mx-auto px-6 pt-20">
          <h2 className="text-5xl font-serif font-bold mb-12">Micro-experiences</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {experiences.map((exp) => (
              <div key={exp.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col relative">
                
                {/* Solo el dueño puede ver los botones de editar/eliminar */}
                {isOwner && <ExperienceActions experienceId={exp.id} />}

                {exp.images && exp.images.length > 0 && (
                  <img src={exp.images[0]} alt={exp.title} className="w-full h-64 object-cover" />
                )}
                <div className="p-8 flex-grow">
                  <h3 className="text-3xl font-serif font-bold">{exp.title}</h3>
                  <p className="text-slate-600 mt-4 line-clamp-3">{exp.description}</p>
                </div>
                <div className="px-8 pb-8">
                  <Link 
                    href={`/microexperience/${exp.id}`}
                    className="inline-block bg-[#D17842] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#b86532] transition-colors"
                  >
                    Explore Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* REVIEWS */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <h2 className="text-5xl font-serif font-bold mb-12">Tourist Reviews</h2>
        {reviews.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-8 rounded-3xl shadow-sm">
                <p className="font-bold text-lg">{review.author.fullName}</p>
                <p className="text-[#D17842]">{'★'.repeat(review.rating)}</p>
                <p className="text-slate-600 mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : <p className="text-gray-500 text-lg italic">No reviews yet.</p>}
      </section>
    </main>
  );
}