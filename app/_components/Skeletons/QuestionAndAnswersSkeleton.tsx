import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const QuestionAndAnswersSkeleton = () => {
    return (
        <div className=" mt-20 flex gap-5 flex-col-reverse lg:flex-row">
            <div className='flex flex-col gap-5 border p-5 rounded-md'>
            	<Skeleton className="w-full" />
            </div>
            <div className='g'>
            	
            </div>
        </div>
    );
};

export default QuestionAndAnswersSkeleton;