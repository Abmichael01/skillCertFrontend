"use client"

import { useUserStore } from '@/app/_stores';
import React from 'react';
import { useTestsByUserQuery, useUserProfileQuery } from '@/app/_dataOperations/queries/queries';
import TestCard from '../TestCard';
import { useParams } from 'next/navigation';
import Tests from '../Tests';
 
 const TestsByUser = () => {
 	const params = useParams()
    const userId = params.id
 	const { data, isPending } = useTestsByUserQuery(Number(userId))
    const publicTests = data?.filter(test=> test.published && test.public) ?? []
    const { data: user } = useUserProfileQuery(Number(userId))
     return (
         <div className='flex flex-col gap-5'>
             <div className="pb-5 border-b">
             	<h2 className="font-semibold">Tests by @{user?.email}</h2>
             </div>
             <div className="grid grid-cols-1 vsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8 mt-4">
                <Tests tests={publicTests} isPending={isPending} />
            </div>
         </div>
     );
 };
 
 export default TestsByUser;