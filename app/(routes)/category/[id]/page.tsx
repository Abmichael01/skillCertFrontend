import TestsByCategory from '@/app/_components/category/TestsByCategory';
import Categories from '@/app/_components/Home/Categories';
import MainPaddingLayout from '@/app/_layouts/MainPaddingLayout';
import React from 'react';

const page = () => {
    return (
        <MainPaddingLayout>
        	<div className='flex flex-col gap-10'>
                <Categories />
                <TestsByCategory />   
            </div>
        </MainPaddingLayout>
    );
};

export default page;