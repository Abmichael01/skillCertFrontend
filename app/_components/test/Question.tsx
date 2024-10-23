"use client";

import { Question as QuestionType } from "@/app/_types";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TestAttemptAnswerSchema } from "@/app/_schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTestAttemptStore } from "@/app/_stores";

const schema = TestAttemptAnswerSchema;

const Question = ({
  question,
  index,
}: {
  question: QuestionType;
  index: number;
}) => {
  const { register, handleSubmit, control, setValue } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      question: question.id,
      selected_option: -1,
    },
  });

  const questions = useTestAttemptStore((state) => state.questions);
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
  const addAnswer = useTestAttemptStore(
    (state) => state.addAnswer
  );
  const updateAnswer = useTestAttemptStore(
    (state) => state.updateAnswer
  );
  const answers = useTestAttemptStore(
    (state) => state.answers
  );

  const next = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    console.log(answers)
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
          {question.options.map((option, optionIndex) => (
            <div key={option.id} className="flex gap-5">
              <input
                type="radio"
                name={`${question.id}`}
                value={option.id}
                id={`question${question.id}Ans${optionIndex + 1}`}
                className="border hidden group cursor-pointer peer text-primary-500 border-zinc-500 w-4 h-4"
                onChange={(e) => {
                  setAnsweredQuestionsIndex(currentQuestionIndex);
                  
                  if(answeredQuestionsIndex.includes(currentQuestionIndex)){
                    updateAnswer(question.id, Number(e.target.value))
                    console.log("updated")
                  }else{
                    addAnswer({question: question.id, selected_option: Number(e.target.value)})
                    console.log("answered")
                  }
                  
                }}
              />
              <label
                htmlFor={`question${question.id}Ans${optionIndex + 1}`}
                className="cursor-pointer peer-checked:border-primary peer-checked:bg-primary-100/70 peer-checked:text-primary-500 text-zinc-600 text-[16px] text-wrap mb-3 border-zinc-300 items-center px-5 py-3 border-[1px] group rounded-sm w-full peer-checked:shadow-sm shadow-primary-300"
              >
                {option.option}
              </label>
            </div>
          ))}
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

export default Question;
