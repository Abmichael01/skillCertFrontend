import React from 'react';
import Lottie from 'lottie-react';
import noDataAnimation from "@/public/NoData.json"

const NoDataFound = ({information}: {information?: string}) => {
    return (
        <div className="flex items-center justify-center flex-col gap-5 w-full mt-10">
            <h1 className="text-3xl text-gray-300 text-center font-bold">{information}</h1>
            <Lottie animationData={noDataAnimation} className='w-[500px] -mt-28' />
        </div>
    );
};

export default NoDataFound;