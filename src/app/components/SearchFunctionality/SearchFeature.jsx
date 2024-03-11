"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation';


export default function Search() {
  const searchParams = useSearchParams();
  const usePath = usePathname();
  const { replace } = useRouter();
  const [term, setTerm] = useState("")

  function handleSearch(){
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace (`${usePath}?${params.toString()}`);
  }

  return (
      <input className='bg-green-100 p-4 m-2'
      placeholder='Search Blogs'
      onChange={(e) => {
      setTerm(e.target.value);
      handleSearch();
      }}
      defaultValue={searchParams.get('query')?.toString()}
      >
      </input>
  )
}



