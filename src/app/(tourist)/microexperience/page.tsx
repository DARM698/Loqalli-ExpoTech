// Cambiamos el @ por puntos para asegurar que encuentre la carpeta
import CardExperience from "../../../components/experiences/cardExperience";

export default function MicroexperiencePage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-32 p-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Mis Avances de Microexperiencias
      </h1>

      <div className="flex justify-center gap-6 flex-wrap">
        <CardExperience 
          title="Caminata al Volcán"
          price={35}
          location="Santa Ana"
          img="https://picsum.photos/400/300"
        />
      </div>
    </main>
  );
}
