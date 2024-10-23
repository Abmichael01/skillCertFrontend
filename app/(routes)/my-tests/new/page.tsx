
import React from "react";
import ProtectedRoute from "@/app/_layouts/ProtectedRoute";
import MainPaddingLayout from "@/app/_layouts/MainPaddingLayout";
import NewPage from "@/app/_components/my-tests/NewPage";


const Page = () => {
  
  return (
    <div>
      <ProtectedRoute>
        <MainPaddingLayout>
          <NewPage />
        </MainPaddingLayout>
      </ProtectedRoute>
    </div>
  );
};

export default Page;
