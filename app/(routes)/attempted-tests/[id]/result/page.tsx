import React from 'react'
import ProtectedRoute from "@/app/_layouts/ProtectedRoute";
import MainPaddingLayout from "@/app/_layouts/MainPaddingLayout";
import TestResultPage from '@/app/_components/attempted-tests/TestResultPage';


const Page = () => {
    return ( 
        <ProtectedRoute>
            <MainPaddingLayout>
                <TestResultPage />
            </MainPaddingLayout>
        </ProtectedRoute>
    )
}

export default Page
