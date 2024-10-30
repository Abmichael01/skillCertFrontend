"use client"

import { useTestsByCategoryQuery } from '@/app/_dataOperations/queries/queries';
import { useParams, useSearchParams } from 'next/navigation';
import React from 'react';
import Tests from '../Tests';

const TestsByCategory = () => {
    const params = useParams()
    const categoryId = params.id
	const searchParams = useSearchParams()
  	const page = searchParams.get("page")
    const { data, isPending } = useTestsByCategoryQuery(Number(categoryId))

    return (
        <div>
            <Tests title={`Tests In Category`} tests={data} isPending={isPending} />
        </div>
    );
};

export default TestsByCategory;