'use client';

import { Edit2, Trash2 } from 'lucide-react';
import { deleteExperience } from '@/app/actions';
import { useRouter } from 'next/navigation';

export default function ExperienceActions({ experienceId }: { experienceId: string }) {
  const router = useRouter();

  return (
    <div className="absolute top-4 right-4 flex gap-2 z-10">
      <button 
        onClick={() => router.push(`/uploadMicroexperiences/${experienceId}`)}
        className="bg-white p-2 rounded-full shadow-md hover:bg-slate-100 transition-colors"
      >
        <Edit2 className="w-5 h-5 text-slate-700 cursor-pointer" />
      </button>
      <button 
        onClick={async () => {
          if (confirm('Are you sure you want to delete this experience? This action cannot be undone.')) {
            await deleteExperience(experienceId);
            router.refresh(); 
          }
        }}
        className="bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
      >
        <Trash2 className="w-5 h-5 text-red-500 cursor-pointer" />
      </button>
    </div>
  );
}