"use client";

import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/app/_layouts/ProtectedRoute";
import MainPaddingLayout from "@/app/_layouts/MainPaddingLayout";
import Input from "@/app/_components/Input";
import CreateEditTestOverview from "@/app/_components/my-tests/CreateTestOverview";
import CreateTestNav from "@/app/_components/my-tests/CreateTestNav";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Questions from "@/app/_components/my-tests/Questions";
import Gallery from "@/app/_components/my-tests/Gallery"
import Publish from "@/app/_components/my-tests/Publish"
import { useTestQuestionsQuery } from "@/app/_dataOperations/queries/queries";
import { Test, Question } from "@/app/_types";


const test = {
  id: 98,
  title: "Ths is a title",
  category: "2",
  duration: 6,
  difficulty: "simple"
}

const page = () => {
  const searchParams = useSearchParams();
  const pathnameList = usePathname().split("/");
  const tab = searchParams.get("tab");
  const slug = pathnameList[2];

  const { data, isLoading, error, refetch } = useTestQuestionsQuery(slug);
  const [test, setTest] = useState(data)

  // useEffect(() => {
  //   refetch();
  // }, [slug]);

  return (
    <div>
      <ProtectedRoute>
        <MainPaddingLayout>
          <div className="mt-5 flex flex-col gap-8">
            <CreateTestNav />
            {!isLoading && (
              <div>
                {tab === "overview" && <CreateEditTestOverview test={data?.test} />}
                {tab === "questions" && <Questions questions={data?.questions as Question[]} />}
                {tab === "gallery" && <Gallery />}
                {tab === "publish" && <Publish />}
              </div>
            )}
            {isLoading && (
              <div className="flex items-center justify-center border h-[50vh] text-xl w-full">
                Loading...
              </div>
            )}
          </div>
        </MainPaddingLayout>
      </ProtectedRoute>
    </div>
  );
};

export default page;
