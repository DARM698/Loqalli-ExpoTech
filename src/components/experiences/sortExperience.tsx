'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set('sort', value);
    else params.delete('sort');
    router.push(`/?${params.toString()}`);
  };

  return (
    <select 
      onChange={(e) => handleSort(e.target.value)}
      defaultValue={searchParams.get('sort') || ""}
      className="border border-gray-200 rounded-md px-4 py-3 bg-white text-gray-600 outline-none cursor-pointer"
    >
      <option value="">Sort by: Featured</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
    </select>
  );
}