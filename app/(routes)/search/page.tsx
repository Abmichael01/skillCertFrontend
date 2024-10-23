import Search from '@/app/_components/search/Search';
import MainPaddingLayout from '@/app/_layouts/MainPaddingLayout';
import React from 'react';

const page = () => {
    return (
        <MainPaddingLayout>
        	<div>
        		<Search />
        	</div>
        </MainPaddingLayout>
    );
};

export default page;