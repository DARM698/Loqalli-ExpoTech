'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) params.set('search', term);
    else params.delete('search');
    router.push(`/?${params.toString()}`);
  };

  return (
    <input 
      type="text" 
      placeholder="Search experiences..." 
      defaultValue={searchParams.get('search')?.toString()}
      onChange={(e) => handleSearch(e.target.value)}
      className="w-full pl-12 pr-4 py-3 border border-gray-300 text-gray-700 rounded-md focus:ring-1 focus:ring-[#D2693E] outline-none"
    />
  );
}