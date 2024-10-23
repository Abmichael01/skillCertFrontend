"use client";

import { Question as QuestionType } from "@/app/_types";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { TestAttemptAnswerSchema } from "@/app/_schemas";
import { useTestAttemptStore, useAttemptAnswersStore } from "@/app/_stores";
import { CheckCircle, XCircleIcon } from "lucide-react";

const schema = TestAttemptAnswerSchema;

const Answer = ({
  question,
  index,
}: {
  question: QuestionType;
  index: number;
}) => {
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

  const next = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    
  };

  const prev = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  return (
    <form
      key={question.id}
      className={`flex flex-col ${
        !(currentQuestionIndex === index) && "hidden"
      }`}
    >
      <div key={index} className={`bg-white z-[${-index}]`}>
        <p className="text-xl ">
          {index + 1}. {question.question}
        </p>
        <hr className="mt-5" />
        <div className="mt-5">
          {question.options.map((option, optionIndex) => {
            const userAnswer = attemptAnswers.find(answer => answer.question === question.id);

            const isSelected = userAnswer && userAnswer.selected_option === option.id;

            const isCorrect = option.is_correct;

            const isSelectedCorrect = isSelected && isCorrect;

            const noOptionSelected = !userAnswer;

            const optionClasses = `cursor-pointer text-[16px] text-wrap mb-3 items-center px-5 py-3 border-[1px] group rounded-sm w-full flex justify-between
              ${isSelectedCorrect ? "text-emerald-500 border-emerald-500" : ""}
              ${isSelected && !isCorrect ? "text-rose-500 border-rose-500" : ""}
              ${!isSelected && isCorrect ? "border-emerald-500 text-emerald-500" : ""}`;

            return (
              <div key={option.id} className="flex gap-5">
                <div className={optionClasses}>
                  {option.option}

                  {!noOptionSelected && (
                    <>
                      {isSelectedCorrect && <CheckCircle />}
                      {isSelected && !isCorrect && <XCircleIcon />}
                      {!isSelected && isCorrect && <CheckCircle />}
                    </>
                  )}
                </div>
              </div>
            );
          })}

        </div>
      </div>
        <div className="flex items-center justify-between mt-8">
        
          <Button
            onClick={prev}
            className="px-5 py-2 bg-gray-500 hover:bg-gray-500/90 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed "
            disabled={currentQuestionIndex === 0}
            type="button"
          >
            Prev
          </Button>
          <Button
            onClick={next}
            className="px-5 py-2 disabled:cursor-not-allowed disabled:bg-primary-300"
            disabled={currentQuestionIndex === questions.length - 1}
            type="button"
          >
            Next
          </Button>
        </div>
    </form>
  );
};

export default Answer;
