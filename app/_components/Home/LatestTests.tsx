"use client"

import Tests from "../Tests";
import { useTestsQuery } from "@/app/_dataOperations/queries/queries";

const LatestTests = () => {
  const { data, isPending } = useTestsQuery();
  return (
    <>
      <Tests tests={data?.splice(0, 8)} title="Latest Tests" isPending={isPending} />
    </>
  );
};

export default LatestTests;
