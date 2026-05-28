'use client';
import { useState } from 'react';
import Image from 'next/image';
import NavbarUser from '@/components/shared/navbar';

export default function LoqalliReviewPage() {
 
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [story, setStory] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos enviados a Loqalli:', { rating, story });
    alert('Your story has been published to the Heritage Gallery!');
    setRating(0);
    setStory('');
  };

  return (
    <div className="min-h-screen bg-[#FCFAF6] text-[#2D2A26] font-serif selection:bg-[#9A4421]/10 flex flex-col justify-between">
      {/* 2. CONTENIDO PRINCIPAL */}
      <main className="w-full max-w-4xl mx-auto px-6 py-12 flex-grow">
        
        {/* Fila del Título y la Mini Card de la Experiencia */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12">
          <div className="max-w-xl space-y-3">
            <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#9A4421] font-semibold">
             Comments
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-[#4A3933] mb-8">
              Every journey is <br />
              <span className="italic text-[#9A4421] font-normal">a story told.</span>
            </h1>
            <p className="text-zinc-600 text-sm font-sans leading-relaxed pt-2 max-w-md">
              Take a moment to recount your time spent with our local masters. Your words help preserve these disappearing crafts.
            </p>
          </div>

          
           {}
  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0">
    <Image 
      src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=150" 
      alt="Pottery with Doña María" 
      fill 
      className="object-cover"
    />
  </div>
  <div className="font-sans">
    <span className="text-[9px] tracking-wider uppercase text-zinc-400 font-medium block mb-0.5">
      Recent Journey
    </span>
    <h4 className="text-xs font-semibold text-zinc-800 leading-tight">
      Pottery with Doña María
    </h4>
    <p className="text-[10px] text-[#9A4421] mt-0.5 font-medium">
      Lourdes, La Libertad
    </p>
  </div>
</div>
      

        {/* Review Form  */}
        <form onSubmit={handleSubmit} className="space-y-12">
          
          {/* Sction 1: Rating */}
          <div className="space-y-4">
            <h3 className="text-sm tracking-wide text-zinc-800 font-medium">Rate Your Experience</h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setRating(num)}
                  onMouseEnter={() => setHoverRating(num)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="text-2xl transition-transform duration-100 transform active:scale-90 focus:outline-none"
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

          {/* Section 2: Comment  */}
          <div className="space-y-4">
            <h3 className="text-sm tracking-wide text-zinc-800 font-medium">Share how your Experience was</h3>
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
          <div className="space-y-4">
            <h3 className="text-sm tracking-wide text-zinc-800 font-medium">
              Visual Echoes <span className="text-xs text-zinc-400 font-sans font-normal ml-1">(Optional)</span>
            </h3>
            <div className="flex gap-4 items-center">
              {/* Button for optional photos */}
              <button type="button" className="w-28 h-28 rounded-2xl border-2 border-dashed border-zinc-300 bg-[#F5F2EB]/50 flex flex-col items-center justify-center gap-2 hover:border-[#9A4421] transition-all group">
                <span className="text-zinc-400 group-hover:text-[#9A4421] text-lg">📷</span>
                <span className="text-[9px] font-sans uppercase tracking-wider text-zinc-400 group-hover:text-[#9A4421] font-semibold">Add Photos</span>
              </button>

              {/* Example uploaded photo*/}
              <div className="w-28 h-28 rounded-2xl overflow-hidden relative shadow-sm border border-zinc-200/20">
                <Image 
                  src="https://images.unsplash.com/photo-1590736969955-71cc94801759?w=300" 
                  alt="Uploaded Echo" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Submit Button and Disclaimer*/}
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
              Publish Your Story
            </button>
          </div>

        </form>
      </main>

      {/* 3. FOOTER */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-8 border-t border-zinc-200/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans text-zinc-400">
        <div>
          <span className="font-serif italic font-semibold text-zinc-600 mr-2 text-sm">Loqalli</span>
          © 2026 Loqalli Heritage Travel. Crafted with intention.
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-zinc-600">Privacy Policy</a>
          <a href="#" className="hover:text-zinc-600">Ethical Charter</a>
          <a href="#" className="hover:text-zinc-600">Press Kit</a>
          <a href="#" className="hover:text-zinc-600">Contact</a>
        </div>
      </footer>

    </div>
  );
}