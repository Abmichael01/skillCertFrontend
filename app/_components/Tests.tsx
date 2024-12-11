import React from "react";
import { Test } from "../_types";
import TestCard from "./TestCard";
import { Skeleton } from "@/components/ui/skeleton"


const Tests = ({
  tests,
  title,
  isPending
}: {
  tests: Test[] | undefined;
  title?: string;
  isPending: boolean;
}) => {
  return (
    <div className="flex flex-col gap-3 mt-3 w-full">
      {title && <h1 className="text-center text-xl font-semibold">{title}</h1>}
      <div className="grid grid-cols-1 vsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8 mt-4 w-full">
        {tests?.map((test, index) => (
          <div key={index}>
            <TestCard test={test} index={index} />
          </div>
        ))}
        {isPending && (
          Array.from({length:8}).map((_, index)=>(
          <div key={index} className="flex flex-col gap-3 w-full">
            <Skeleton className=" h-[160px] bg-slate-100" />
            <Skeleton className="h-[20px]" />
            <Skeleton className="h-[40px]" />
          </div>
        ))
        )}
      </div>
    </div>
  );
};

export default Tests;
