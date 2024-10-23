"use client"

import React from 'react';
import Tests from '../Tests';
import { useSearchQuery } from '@/app/_dataOperations/queries/queries';
import { useSearchParams } from 'next/navigation';
import SearchBox from './SearchBox';
import NoDataFound from '../NoDataFound';

const Search = () => {
	const searchParams = useSearchParams()
	const query = searchParams.get("query") as string
	const { data } = useSearchQuery(query)
    return (
    	<div className="flex flex-col items-center mt-5 gap-10">
	      <SearchBox />
	      {data?.length === 0 ? <NoDataFound  information='No Data Found' /> : <Tests title='Search Result' tests={data} /> }
	    </div>
    );
};

export default Search;