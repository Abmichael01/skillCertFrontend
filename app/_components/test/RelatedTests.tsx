"use client"

import Tests from "../Tests";
import { useTestsQuery } from "@/app/_dataOperations/queries/queries";
import { Test } from "@/app/_types";

export const shuffleArray = <T,>(array: T[]): T[] => {
  let currentIndex = array.length, temporaryValue: T, randomIndex: number;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const RelatedTests = ({categoryId}: {categoryId: number}) => {
  const { data, isPending } = useTestsQuery();
  let relatedTests = data?.filter(test => test.category === categoryId) ?? [];
  relatedTests = shuffleArray(relatedTests) as Test[]

  return (
    <>
      <Tests tests={relatedTests?.splice(0, 8)} title="Related Tests" isPending={isPending} />
    </>
  );
};

export default RelatedTests;
