"use client";

import React from "react";
import ProtectedRoute from "@/app/_layouts/ProtectedRoute";
import MainPaddingLayout from "@/app/_layouts/MainPaddingLayout";
import CreateEditTestOverview from "@/app/_components/my-tests/CreateTestOverview";
import CreateTestNav from "@/app/_components/my-tests/CreateTestNav";
import { useSearchParams, useRouter } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  return (
    <div>
      <ProtectedRoute>
        <MainPaddingLayout>
          <div className="mt-5 flex flex-col gap-8">
            <CreateTestNav />
            <h1 className="text-2xl font-semibold">
              Create A New <span className="text-primary">Test</span>
            </h1>
            {tab === "overview" && <CreateEditTestOverview />}
            {tab === "questions" && <p>Questions</p>}
          </div>
        </MainPaddingLayout>
      </ProtectedRoute>
    </div>
  );
};

export default page;
