import Search from '@/app/_components/search/Search';
import MainPaddingLayout from '@/app/_layouts/MainPaddingLayout';
import React from 'react';

const Page = () => {
    return (
        <MainPaddingLayout>
        	<div className='w-full'>
        		<Search />
        	</div>
        </MainPaddingLayout>
    );
};

export default Page;