import React from "react"
import AttemptedTests from "@/app/_components/attempted-tests/AttemptedTests"
import ProtectedRoute from "@/app/_layouts/ProtectedRoute";
import MainPaddingLayout from "@/app/_layouts/MainPaddingLayout";

const Page = () => {
    return (
        <ProtectedRoute>
        <MainPaddingLayout>
            <div className='mt-5 flex flex-col gap-8'>
                <AttemptedTests />
            </div>
        </MainPaddingLayout>
    </ProtectedRoute>
    );
};

export default Page;