"use client"

import { Brain, Pencil, Plus, Share, UserCircle } from 'lucide-react';
import React from 'react';
import { useUserProfileQuery } from '@/app/_dataOperations/queries/queries';
import { useParams } from 'next/navigation';
import Image from 'next/image';

const UserInfo = () => {
	const params = useParams()
    const userId = params.id
	const { data } = useUserProfileQuery(Number(userId))
    return (
        <div>
            <div className=' md:w-[300px] w-full border border-300 rounded-sm relative overflow-hidden'>
            	<div className='absolute w-full h-[125px] top-0 left-0 bg-gradient-to-tr from-primary-200 to-primary-400'></div>
            	<div className='flex flex-col gap-3 relative z-10 pt-14 px-5'>
            		<div className='w-[150px] h-[150px] rounded-full border-white border-2 overflow-hidden flex items-center justify-center'>
            			<Image src="/demo.jpg" width={100} height={100} alt="user image" className='w-full h-full object-cover object-center ' />
            		</div>
            		<p className="font-semibold">@{data?.username}</p>
            		<div className="flex items-center gap-2 " >
            			<button className="py-2 flex-grow flex justify-center gap-2 bg-primary text-white rounded-full ">
            				<Plus />
            				Follow
            			</button>
            			<button className="w-14  h-10 flex items-center justify-center border bg-gray-100 rounded-full">
            				<Pencil />
            			</button>
            			<button className="w-14  h-10 flex items-center justify-center border bg-gray-100 rounded-full">
            				<Share />
            			</button>
            		</div>
            		<div className="flex flex-col mt-5">
            			<div className="flex justify-between border-t py-4">
	            			<div className="flex gap-2"> <UserCircle /> Followers</div>
	            			<p>1000</p>
	            		</div>
	            		<div className="flex justify-between border-t py-4">
	            			<div className="flex gap-2"> <Brain /> Tests Published</div>
	            			<p>8</p>
	            		</div>
	            		</div>
            	</div>
            </div>
        </div>
    );
};

export default UserInfo;