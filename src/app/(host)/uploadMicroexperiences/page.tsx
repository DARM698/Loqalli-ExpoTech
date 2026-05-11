'use client';
import { useState, useEffect, useRef } from 'react'; // 1. Añadimos useRef
import { createExperience } from '../../actions';
import dynamic from 'next/dynamic';
import HostNavbar from '@/components/shared/navbar';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation'; // 2. Añadimos useRouter
import 'react-day-picker/dist/style.css';

const DynamicMap = dynamic(() => import('@/components/Map'), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#F3D9CF]/10 animate-pulse flex items-center justify-center text-[#D2693E] text-xs font-bold uppercase tracking-widest">
      Loading Map...
    </div>
  )
});

const CATEGORIES = ["Ceramics & Pottery", "Textiles", "Gastronomy", "Adventure"];

const calendarStyles = `
  .rdp { 
    --rdp-accent-color: #D2693E; 
    --rdp-background-color: #F3D9CF; 
    margin: 0;
    font-family: inherit;
  }
  .rdp-day_selected:not([disabled]), 
  .rdp-day_selected:focus:not([disabled]), 
  .rdp-day_selected:hover:not([disabled]) { 
    background-color: var(--rdp-accent-color) !important; 
  }
  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
    background-color: #F3D9CF !important;
    color: #D2693E;
  }
`;

export default function CreateExperiencePage() {
  const router = useRouter(); // Inicializamos el router
  const formRef = useRef<HTMLFormElement>(null); // Referencia para resetear el form
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [category, setCategory] = useState("Ceramics & Pottery");
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [startPeriod, setStartPeriod] = useState("AM");
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [endPeriod, setEndPeriod] = useState("PM");
  const [isEndOpen, setIsEndOpen] = useState(false);

  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [location, setLocation] = useState({ lat: 13.689, lng: -89.187 });
  const [address, setAddress] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => { 
    setMounted(true); 
  }, []);

  // Función para limpiar todos los campos
  const clearForm = () => {
    formRef.current?.reset(); // Limpia inputs nativos (title, description, price...)
    setCategory("Ceramics & Pottery");
    setSelectedDates([]);
    setImageFiles([]);
    setPreviews([]);
    setAddress("");
    setLocation({ lat: 13.689, lng: -89.187 });
  };

  const handleSearchLocation = async () => {
    if (!address || typeof window === 'undefined') return;
    try {
        const { OpenStreetMapProvider } = await import('leaflet-geosearch');
        const provider = new OpenStreetMapProvider({
          params: { 'accept-language': 'es', countrycodes: 'sv', addressdetails: 1 },
        });
        const results = await provider.search({ query: address });
        if (results && results.length > 0) setLocation({ lat: results[0].y, lng: results[0].x });
    } catch (error) { console.error(error); }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImageFiles(prev => [...prev, ...newFiles]);
      setPreviews(prev => [...prev, ...newFiles.map(file => URL.createObjectURL(file))]);
    }
  };

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try { 
      formData.delete('images');
      formData.append('category', category);
      formData.append('startPeriod', startPeriod);
      formData.append('endPeriod', endPeriod);
      
      const formattedDates = selectedDates.map(date => format(date, 'yyyy-MM-dd'));
      formData.append('selectedDays', JSON.stringify(formattedDates)); 
      
      formData.append('lat', location.lat.toString());
      formData.append('lng', location.lng.toString());
      
      imageFiles.forEach((file) => {
        formData.append('images', file);
      });

      const result = await createExperience(formData);
      if (result?.error) {
        alert(result.error);
        return;
      }

      // Si todo sale bien:
      clearForm(); // 1. Limpiamos campos
      router.push('/explore'); // 2. Redirigimos
      
    } 
    catch (error) { 
      console.error("Error fatal en el cliente:", error); 
      alert("Error crítico al intentar guardar.");
    } 
    finally {
      setLoading(false);
    }
  }

  const noArrowsClass = "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <div suppressHydrationWarning>
      <HostNavbar />
      
      {!mounted ? (
        <div className="min-h-screen bg-white p-8 animate-pulse flex items-center justify-center">
             <div className="text-[#D2693E] font-serif text-xl">Loading experience creator...</div>
        </div>
      ) : (
        <div className="min-h-screen bg-white p-4 md:p-8 md:pt-12 font-sans text-[#4A3933]">
          <style>{calendarStyles}</style>
          
          <header className="max-w-5xl mx-auto text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-serif text-[#D2693E] mb-4">List a Micro-experience</h1>
          </header>

          <form ref={formRef} action={handleSubmit} className="max-w-5xl mx-auto space-y-8 pb-20">
            
            {/* SECCIÓN BASIC INFO */}
            <section className="border border-[#F3D9CF] rounded-xl p-6 space-y-4 shadow-sm">
              <h2 className="font-bold text-lg border-b border-[#F3D9CF] pb-2">Basic Info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500">Experience Title</label>
                  <input name="title" required type="text" placeholder="e.g. Traditional Indigo" className="w-full p-3 bg-[#F3D9CF]/30 border border-[#F3D9CF] rounded-lg outline-none focus:ring-2 focus:ring-[#D2693E]" />
                </div>

                <div className="space-y-2 relative">
                  <label className="text-sm font-medium text-gray-500">Craft Category</label>
                  <div 
                    onClick={() => setIsCatOpen(!isCatOpen)}
                    className="w-full p-3 bg-[#F3D9CF]/30 border border-[#F3D9CF] rounded-lg flex justify-between items-center cursor-pointer hover:bg-[#F3D9CF]/50 transition-colors"
                  >
                    <span>{category}</span>
                    <svg className={`h-4 w-4 transition-transform ${isCatOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                  {isCatOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-[#F3D9CF] rounded-lg shadow-xl overflow-hidden">
                      {CATEGORIES.map((cat) => (
                        <div 
                          key={cat}
                          onClick={() => { setCategory(cat); setIsCatOpen(false); }}
                          className="p-3 hover:bg-[#D2693E] hover:text-white cursor-pointer transition-colors"
                        >
                          {cat}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* SECCIÓN DETAILS */}
            <section className="border border-[#F3D9CF] rounded-xl p-6 space-y-6 shadow-sm">
              <h2 className="font-bold text-lg border-b border-[#F3D9CF] pb-2">Experience Details</h2>
              <textarea name="description" required rows={4} placeholder="Describe the magic of your craft..." className="w-full p-3 bg-[#F3D9CF]/30 border border-[#F3D9CF] rounded-lg resize-none outline-none focus:ring-2 focus:ring-[#D2693E]" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="price" required type="number" step="0.01" placeholder="Price ($)" className={`w-full p-3 bg-[#F3D9CF]/30 border border-[#F3D9CF] rounded-lg outline-none ${noArrowsClass}`} />
                <input name="participants" required type="number" placeholder="Max People" className={`w-full p-3 bg-[#F3D9CF]/30 border border-[#F3D9CF] rounded-lg outline-none ${noArrowsClass}`} />
              </div>
            </section>

            {/* SECCIÓN LOCATION */}
            <section className="border border-[#F3D9CF] rounded-xl p-6 shadow-sm">
              <h2 className="font-bold text-lg border-b border-[#F3D9CF] pb-2">Location</h2>
              <div className="space-y-4 pt-4">
                <div className="flex gap-2">
                  <input 
                    name="address" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    type="text" 
                    placeholder="Search address in El Salvador..." 
                    className="flex-1 p-3 bg-[#F3D9CF]/30 border border-[#F3D9CF] rounded-lg outline-none focus:ring-2 focus:ring-[#D2693E]" 
                  />
                  <button type="button" onClick={handleSearchLocation} className="bg-[#D2693E] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#b05832] transition-colors">Find</button>
                </div>
                <div className="w-full h-64 rounded-xl overflow-hidden z-0 border border-[#F3D9CF]">
                  <DynamicMap lat={location.lat} lng={location.lng} />
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* SECCIÓN AVAILABILITY */}
              <section className="border border-[#F3D9CF] rounded-xl p-6 shadow-sm flex flex-col items-center">
                <h2 className="font-bold text-lg border-b border-[#F3D9CF] pb-2 w-full mb-4">Availability</h2>
                <div className="bg-[#F3D9CF]/10 rounded-lg p-2 border border-[#F3D9CF]/50">
                  <DayPicker
                    mode="multiple"
                    selected={selectedDates}
                    onSelect={(dates) => setSelectedDates(dates || [])}
                    disabled={{ before: new Date() }}
                    className="border-none"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-4 self-start">
                  {selectedDates.length > 0 
                    ? `${selectedDates.length} dates selected` 
                    : "Click on the dates you'll be hosting."}
                </p>
              </section>

              {/* SECCIÓN SCHEDULE */}
              <section className="border border-[#F3D9CF] rounded-xl p-6 shadow-sm">
                <h2 className="font-bold text-lg border-b border-[#F3D9CF] pb-2">Schedule</h2>
                <div className="space-y-4 mt-4">
                  {[ {label: 'From', state: startPeriod, setState: setStartPeriod, open: isStartOpen, setOpen: setIsStartOpen, hName: 'startHour', mName: 'startMin'},
                     {label: 'To', state: endPeriod, setState: setEndPeriod, open: isEndOpen, setOpen: setIsEndOpen, hName: 'endHour', mName: 'endMin'}
                  ].map((time, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="text-xs font-bold text-gray-400 w-12 uppercase">{time.label}</span>
                      <div className="flex bg-[#F3D9CF]/30 border border-[#F3D9CF] rounded-lg overflow-visible flex-1">
                        <input name={time.hName} type="number" defaultValue={9} className={`w-full p-2 bg-transparent outline-none text-center font-medium ${noArrowsClass}`} />
                        <span className="flex items-center text-[#D2693E] font-bold">:</span>
                        <input name={time.mName} type="number" defaultValue={0} className={`w-full p-2 bg-transparent outline-none text-center font-medium ${noArrowsClass}`} />
                        
                        <div className="relative">
                          <div 
                            onClick={() => time.setOpen(!time.open)}
                            className="bg-[#D2693E] text-white text-xs font-bold px-4 h-full flex items-center cursor-pointer min-w-[60px] justify-center hover:bg-[#b05832] transition-colors"
                          >
                            {time.state}
                          </div>
                          {time.open && (
                            <div className="absolute right-0 top-full mt-1 bg-white border border-[#F3D9CF] rounded shadow-xl z-[60] overflow-hidden">
                              {["AM", "PM"].map(p => (
                                <div 
                                  key={p} 
                                  onClick={() => { time.setState(p); time.setOpen(false); }}
                                  className="px-4 py-2 text-[#4A3933] hover:bg-[#F3D9CF] cursor-pointer"
                                >
                                  {p}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* SECCIÓN PHOTOS */}
            <section className="border border-[#F3D9CF] rounded-xl p-6 shadow-sm">
              <h2 className="font-bold text-lg border-b border-[#F3D9CF] pb-2">Photos</h2>
              <div className="flex flex-wrap gap-4 mt-4">
                <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-[#F3D9CF] rounded-lg cursor-pointer hover:bg-[#F3D9CF]/10 transition-colors">
                  <span className="text-2xl text-[#D2693E]">+</span>
                  <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
                {previews.map((src, i) => (
                  <img key={i} src={src} className="w-24 h-24 object-cover rounded-lg border border-[#F3D9CF]" alt="Preview" />
                ))}
              </div>
            </section>

            {/* FOOTER CON LOS DOS BOTONES */}
            <footer className="flex justify-end gap-4 pt-4 items-center">
              {/* Botón de Cancelar / Ir al Catálogo */}
              <button 
                type="button" 
                onClick={() => router.push('/explore')}
                className="text-gray-500 font-bold px-6 py-2 hover:text-[#D2693E] transition-colors"
              >
                View
              </button>

              {/* Botón de Publicar */}
              <button 
                disabled={loading}
                type="submit" 
                className="bg-[#D2693E] text-white px-12 py-4 rounded-xl font-bold shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              >
                {loading ? 'Publishing...' : 'Publish Experience'}
              </button>
            </footer>
          </form>
        </div>
      )}
    </div>
  );
}