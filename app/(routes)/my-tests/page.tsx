"use client"

import React from 'react'
import ProtectedRoute from '@/app/_layouts/ProtectedRoute'
import MainPaddingLayout from '@/app/_layouts/MainPaddingLayout'
import { useSearchParams, useRouter } from "next/navigation";
import MyTests from '@/app/_components/my-tests/MyTests';
import AttemptedTests from '@/app/_components/attempted-tests/AttemptedTests';
import MyTestsNav from '@/app/_components/my-tests/MyTestsNav';


const page = () => {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab")
  return (
    <ProtectedRoute>
        <MainPaddingLayout>
            <div className='mt-5 flex flex-col gap-8'>
              {/* <MyTestsNav />
                { tab == "my-tests" && <MyTests /> }
                { tab == "attempted-tests" && <AttemptedTests /> } */}
              <MyTests />
            </div>
        </MainPaddingLayout>
    </ProtectedRoute>
    
  )
}

export default page
