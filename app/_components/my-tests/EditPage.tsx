"use client";

import React, { useState } from "react";
import CreateEditTestOverview from "@/app/_components/my-tests/CreateTestOverview";
import CreateTestNav from "@/app/_components/my-tests/CreateTestNav";
import { useSearchParams, usePathname } from "next/navigation";
import Questions from "@/app/_components/my-tests/Questions";
import Gallery from "@/app/_components/my-tests/Gallery"
import Publish from "@/app/_components/my-tests/Publish"
import { useTestQuestionsQuery } from "@/app/_dataOperations/queries/queries";
import { Question } from "@/app/_types";

const EditPage = () => {
		const searchParams = useSearchParams();
	  const pathnameList = usePathname().split("/");
	  const tab = searchParams.get("tab");
	  const slug = pathnameList[2];

	  const { data, isLoading,  } = useTestQuestionsQuery(slug);

	  // useEffect(() => {
	  //   refetch();
	  // }, [slug]);
    return (
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
    );
};

export default EditPage;