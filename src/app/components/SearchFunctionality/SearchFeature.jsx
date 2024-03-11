"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';


export default function Search() {
  const searchParams = useSearchParams();
  const usePath = usePathname();
  const { replace } = useRouter();
  const [term, setTerm] = useState("")

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace (`${usePath}?${params.toString()}`);
  }, 300)

  useEffect(() => {
    handleSearch(term);
  }, [term, handleSearch])

  return (
      <input className='bg-green-100 p-4 m-2 ml-4'
      placeholder='Search Blogs'
      onChange={(e) => setTerm(e.target.value)}
      defaultValue={searchParams.get('query')?.toString()}
/>
  );
}



