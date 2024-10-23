"use client"

import React from 'react'
import { useAttemptedTestsQuery } from "@/app/_dataOperations/queries/queries"
import  Link  from "next/link"
import Image from 'next/image'
import DynamicBanner from '../DynamicBanner'
import { Button } from '@/components/ui/button'
import NoDataFound from '../NoDataFound'


const AttemptedTests = () => {
  const { data } = useAttemptedTestsQuery()
  console.log(data)
  return (
    <div className="flex flex-col gap-10 ">
      <div className="flex justify-between pb-5 border-b">
        <h1 className="text-xl font-bold">Attempted Tests</h1>
      </div>
      <div className='grid grid-cols-1 vsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8 mt-4'>
        {data?.map((attempt, index) => (
          <div
            key={index}
            className={`border border-zinc-300  p-3 rounded-md shadow-sm group cursor-pointer flex flex-col gap-3 justify-between `}
          >

            <div className={`w-full h-40 border rounded-md overflow-hidden  `} >
              {attempt.test.banner !== null ? (
                <Image
                  src={attempt.test.banner}
                  width={50}
                  height={50}
                  alt="anything"
                  className="w-full h-full object-cover group-hover:scale-105 transition "
                />
              ) : (
                <DynamicBanner />
              )}
            </div>
            <div className=''>
              <h1 className='font-semibold text-lg'>{attempt.test.title}</h1>
            </div>
            <div className='grid grid-cols-2 gap-[4px]'>
              <Link href={`/attempted-tests/${attempt.id}/result`}>
                <Button variant={`outline`} className='w-full'>Result</Button>
              </Link>
              <Link href={`/attempted-tests/${attempt.id}/result`}>
                <Button className='w-full bg-primary'>Certificate</Button>
              </Link>
            </div>
          </div>
        ))}

      </div>
      { data?.length === 0 && <NoDataFound information="You Haven't Taken Any Test "/> }
    </div>
  )
}

export default AttemptedTests



