"use client"

import React, { useEffect } from "react";
import { useTestAttemptStore, useAttemptAnswersStore } from "@/app/_stores";
import { Answer, Option, Question } from "@/app/_types";

const AnswersNav = () => {
  const questions = useTestAttemptStore((state) => state.questions);
  const attemptAnswers = useAttemptAnswersStore(state => state.attemptAnswers)
  console.log(attemptAnswers)
  const currentQuestionIndex = useTestAttemptStore(
    (state) => state.currentQuestionIndex
  );
  const setCurrentQuestionIndex = useTestAttemptStore(
    (state) => state.setCurrentQuestionIndex
  );
  const answeredQuestionsIndex = useTestAttemptStore(
    (state) => state.answeredQuestionsIndex
  );
  const setAnsweredQuestionsIndex = useTestAttemptStore(
    (state) => state.setAnsweredQuestionsIndex
  );
  
  return (
    <div className="border border-zinc-300 h-fit p-5 col-span-2 lg:sticky top-[170px] rounded-md w-full lg:w-[350px] 3xl:w-[500px] z-10">
      <div className="flex flex-wrap gap-3">
        {questions.map(
          (question, index) => {
            const userAnswer = attemptAnswers.find(answer => answer.question === question.id) as Answer
            const correctOption = question.options.find(option => option.is_correct) as Option
            const answeredCorrectly = userAnswer.selected_option === correctOption.id
              return (
                  !(index == 0) && (
                    <div
                      key={index}
                      onClick={() => {
                        setCurrentQuestionIndex((index));
                      }}
                      className={`w-10 h-10 flex items-center justify-center text-xl rounded-full border transition cursor-pointer  ${
                        (currentQuestionIndex === index && answeredCorrectly) ? "bg-emerald-500 text-white hover:bg-emerald-500 border-emerald-500"
                        : (currentQuestionIndex === index && !answeredCorrectly) ? "bg-rose-500 text-white hover:bg-rose-500 border-rose-500" : ""

                      } `}
                    >
                      {index+1}
                    </div>
                  )
                )
            }
        )}
      </div>
    </div>
  );
};

export default AnswersNav;
