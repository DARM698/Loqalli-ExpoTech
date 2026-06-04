'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface ReviewFormClientProps {
  experienceId: string;
  touristId: string;
  hostId: string;
  dbTitle: string;
  dbLocation: string;
  dbImage?: string;
}

export default function ReviewFormClient({
  experienceId, touristId, hostId, dbTitle, dbLocation, dbImage
}: ReviewFormClientProps) {

  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [story, setStory] = useState<string>('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const experienceImage = dbImage || "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400";

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
      alert("Por favor, selecciona una calificación usando las estrellas.");
      return;
    }

   
    const reviewData = {
      rating: rating,
      comment: story, 
      experienceId: experienceId, 
      authorId: touristId,   
      targetUserId: hostId,    
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
                alt={dbTitle} 
                fill 
                className="object-cover"
              />
            </div>
            
            <div className="font-sans space-y-2 flex-grow">
              <span className="text-xs tracking-widest uppercase text-zinc-400 font-semibold block">
                Recent Journey
              </span>
              <h4 className="text-xl font-bold text-zinc-800 leading-snug">
                {dbTitle}
              </h4>
              <p className="text-base text-[#9A4421] font-medium">
                {dbLocation}
              </p>
            </div>
          </div>
        </div>

        {}
        <form onSubmit={handleSubmit} className="space-y-12">
          
          {/* Sección 1: Estrellas */}
          <div className="space-y-4">
            <h3 className="text-2xl tracking-wide text-zinc-800 font-medium">Rate Your Experience</h3>
            <div className="text-6xl inline-block flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  type="button" key={num}
                  onClick={() => setRating(num)}
                  onMouseEnter={() => setHoverRating(num)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="text-6xl transition-transform duration-100 focus:outline-none"
                >
                  <span className={`inline-block ${num <= (hoverRating || rating) ? 'text-[#9A4421]' : 'text-zinc-300'}`}>
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
                required rows={6}
                className="w-full bg-transparent text-sm text-zinc-800 placeholder-zinc-400/80 focus:outline-none resize-none font-serif italic leading-relaxed"
                placeholder="Write from the heart... What moments stayed with you? The smell of the earth, the warmth of the kiln, the stories shared over coffee..."
              />
              <div className="text-[9px] text-zinc-400 font-sans text-right uppercase tracking-wider mt-2">
                Journaled Real Time
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}