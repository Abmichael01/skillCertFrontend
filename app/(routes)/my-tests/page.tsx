"use client"

import React from 'react'
import ProtectedRoute from '@/app/_layouts/ProtectedRoute'
import MainPaddingLayout from '@/app/_layouts/MainPaddingLayout'
import MyTests from '@/app/_components/my-tests/MyTests';


const Page = () => {
  return (
    <ProtectedRoute>
        <MainPaddingLayout>
            <div className='mt-5 flex flex-col gap-8'>
              <MyTests />
            </div>
        </MainPaddingLayout>
    </ProtectedRoute>
    
  )
}

export default Page
