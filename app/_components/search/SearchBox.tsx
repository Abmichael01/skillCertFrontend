"use client"

import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { FormEventHandler, useState } from 'react';

const SearchBox = () => {
	const params = useSearchParams()
	const [query, setQuery] = useState(params.get("query"))
	const router = useRouter()

	const search = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (query != ""){
			router.push(`/search?query=${query}`)
		}
	}

    return (
        <form onSubmit={search} className="flex flex-col justify-center sm:flex-row gap-2 items-center w-full">
	        <input
	          
	          type="text"
	          placeholder="Search Test..."
	          value={query}
	          onChange={(e)=>setQuery(e.target.value)}
	          className="border-[1.5px] border-zinc-400 h-full px-3 py-2 rounded-md md:w-[500px] w-full outline-1 outline-primary"
	        />
	        <Button  className="px-5 py-2 flex justify-center w-fit items-center gap-2 hover:shadow-xl transition">
	          <SearchIcon />
	          Search
	        </Button>
      </form>
    );
};

export default SearchBox;