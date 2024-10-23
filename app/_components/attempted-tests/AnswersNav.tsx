"use client"

import React, { useEffect } from "react";
import { useTestAttemptStore, useAttemptAnswersStore } from "@/app/_stores";

const AnswersNav = () => {
  const questions = useTestAttemptStore((state) => state.questions);
  const currentQuestionIndex = useTestAttemptStore((state) => state.currentQuestionIndex);
  const setCurrentQuestionIndex = useTestAttemptStore((state) => state.setCurrentQuestionIndex);
  const answeredQuestionsIndex = useTestAttemptStore((state) => state.answeredQuestionsIndex);
  const setAnsweredQuestionsIndex = useTestAttemptStore((state) => state.setAnsweredQuestionsIndex);
  
  return (
    <div className="border border-zinc-300 h-fit p-5 col-span-2 lg:sticky top-[170px] rounded-md w-full lg:w-[350px] 3xl:w-[500px] z-10">
      <div className="flex flex-wrap gap-3">
        {Array.from({ length: questions?.length + 1 }).map(
          (_, index) =>
            !(index == 0) && (
              <div
                key={index}
                onClick={() => {
                  setCurrentQuestionIndex((index-1));
                }}
                className={`w-10 h-10 flex items-center justify-center text-xl rounded-full border transition cursor-pointer  ${
                  currentQuestionIndex + 1 === index ? "bg-primary text-white hover:bg-primary border-primary"
                  :answeredQuestionsIndex.includes((index-1)) ? "border-primary-500 border-2"
                  :"border-zinc-300 hover:bg-zinc-100"

                } `}
              >
                {index}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default AnswersNav;
