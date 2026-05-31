'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

export default function LoqalliReviewPage({ params }: { params: { id: string } }) {

  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [story, setStory] = useState<string>('');


  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const experienceTitle = "Pottery with Doña María";
  const experienceLocation = "Lourdes, La Libertad";
  const experienceImage = "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400";


  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImagesUrls = filesArray.map((file) => URL.createObjectURL(file));
      setSelectedImages((prevImages) => [...prevImages, ...newImagesUrls]);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    
    if (rating === 0) {
      alert("Please, select a rating.");
      return;
    }


    const reviewData = {
      rating: rating,
      comment: story, 
      experienceId: "clx123_id_de_la_experiencia", 
      authorId: "clt456_id_del_turista_logueado",   
      targetUserId: "clh789_id_del_host_dueño",     
    };

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        alert("¡Tu reseña ha sido publicada en Loqalli!");
      
        setRating(0);
        setStory("");
        setSelectedImages([]);
      } else {
        alert("Hubo un problema al guardar la reseña en el servidor.");
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
      alert("Error de red. Inténtalo más tarde.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFAF6] text-[#2D2A26] font-serif selection:bg-[#9A4421]/10 flex flex-col justify-between">
      
      <main className="w-full max-w-4xl mx-auto px-6 py-12 flex-grow">
        
        {}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          
          <div className="max-w-xl space-y-3">
            <h1 className="text-4xl md:text-6xl font-serif text-[#4A3933] mb-8">
              Every journey is <br />
              <span className="italic text-[#9A4421] font-normal">a story told.</span>
            </h1>
          </div>

          {}
          <div className="bg-white px-8 py-20 rounded-3xl shadow-sm border border-zinc-100 flex items-center gap-6 w-full max-w-xl self-start md:self-auto transition-all hover:shadow-md">
            <div className="relative w-48 h-48 rounded-2xl overflow-hidden bg-zinc-100 flex-shrink-0 shadow-sm">
              <Image 
                src={experienceImage} 
                alt={experienceTitle} 
                fill 
                className="object-cover"
              />
            </div>
            
            <div className="font-sans space-y-2 flex-grow">
              {}
              <span className="text-xs tracking-widest uppercase text-zinc-400 font-semibold block">
                Recent Journey
              </span>
              {}
              <h4 className="text-xl font-bold text-zinc-800 leading-snug">
                {experienceTitle}
              </h4>
              {}
              <p className="text-base text-[#9A4421] font-medium">
                {experienceLocation}
              </p>
            </div>
          </div>

        </div>

        {}
        <form onSubmit={handleSubmit} className="space-y-12">
          
          {}
          <div className="space-y-4">
            <h3 className="text-2xl tracking-wide text-zinc-800 font-medium">Rate Your Experience</h3>
            <div className="text-6xl inline-block flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setRating(num)}
                  onMouseEnter={() => setHoverRating(num)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="text-6xl transition-transform duration-100 focus:outline-none"
                >
                  <span
                    className={`inline-block ${
                      num <= (hoverRating || rating)
                        ? 'text-[#9A4421]'
                        : 'text-zinc-300'
                    }`}
                  >
                    ★
                  </span>
                </button>
              ))}
            </div>
          </div>

          {}
          <div className="space-y-4">
            <h3 className="text-2xl tracking-wide text-zinc-800 font-medium">Share how your Experience was</h3>
            <div className="relative bg-[#F5F2EB] rounded-2xl p-6 border border-zinc-200/40">
              <textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                required
                rows={6}
                className="w-full bg-transparent text-sm text-zinc-800 placeholder-zinc-400/80 focus:outline-none resize-none font-serif italic leading-relaxed"
                placeholder="Write from the heart... What moments stayed with you? The smell of the earth, the warmth of the kiln, the stories shared over coffee..."
              />
              <div className="text-[9px] text-zinc-400 font-sans text-right uppercase tracking-wider mt-2">
                Journaled at 12:45 PM
              </div>
            </div>
          </div>

          {}
          <div className="space-y-4 font-sans">
            <h3 className="text-2xl tracking-wide text-zinc-800 font-medium">
              Visual Echoes <span className="text-2xl text-zinc-400 font-sans font-normal ml-1">(Optional)</span>
            </h3>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              multiple 
              accept="image/*" 
              className="hidden" 
            />

            <div className="flex flex-wrap gap-4 items-center">
              <button 
                type="button" 
                onClick={handleButtonClick}
                className="w-28 h-28 rounded-2xl border-2 border-dashed border-zinc-300 bg-[#F5F2EB]/50 flex flex-col items-center justify-center gap-2 hover:border-[#9A4421] transition-all group"
              >
                <span className="text-zinc-400 group-hover:text-[#9A4421] text-lg">📷</span>
                <span className="text-[9px] uppercase tracking-wider text-zinc-400 group-hover:text-[#9A4421] font-semibold">
                  Add Photos
                </span>
              </button>

              <div className="w-28 h-28 rounded-2xl overflow-hidden relative shadow-sm border border-zinc-200/20">
                <Image 
                  src="https://media.istockphoto.com/id/2151717007/es/foto/imagen-de-cerca-y-recortada-de-un-alfarero-anciano-pintando-y-decorando-la-cer%C3%A1mica.jpg?s=612x612&w=0&k=20&c=1h-nBJNvNBoN94ZwuxDQMeM8prihbDJ6kSc19-E_Mk8=" 
                  alt="Uploaded Echo" 
                  fill 
                  className="object-cover"
                />
              </div>

              {selectedImages.map((imageSrc, index) => (
                <div key={index} className="w-28 h-28 rounded-2xl overflow-hidden relative shadow-sm border border-zinc-200/20 group">
                  <Image 
                    src={imageSrc} 
                    alt={`User Echo ${index + 1}`} 
                    fill 
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1.5 right-1.5 bg-white/90 hover:bg-white text-zinc-600 hover:text-red-600 p-1 rounded-xl transition-all shadow-sm opacity-0 group-hover:opacity-100"
                  >
                    {}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Submit Button */}
          <div className="pt-6 border-t border-zinc-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-wider text-zinc-400 font-medium">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#9A4421]" />
              Your story will be curated for our heritage gallery.
            </div>
            <button
              type="submit"
              disabled={rating === 0 || !story.trim()}
              className="w-full sm:w-auto bg-[#9A4421] hover:bg-[#833819] disabled:bg-zinc-200 disabled:text-zinc-400 text-white text-xs uppercase tracking-widest font-semibold px-8 py-4 rounded-full transition-all shadow-md active:scale-[0.98]"
            >
              Publish Your Review
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}