"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import AddEditQuestion from "./AddEditQuestion";
import { Question } from "@/app/_types";

interface QuestionsProps {
  questions: Question[];
}

const Questions: React.FC<QuestionsProps> = ({ questions }) => {
  const addQuestionContainer = useRef<HTMLDivElement | null>(null)
  const scrollToElement = () => {
    if (addQuestionContainer.current) {
      addQuestionContainer.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-5 border border-zinc-300 p-4 md:p-10 :w-[85%]">
        <h1 className="text-xl mb-5">Questions</h1>
        <hr />
        <div className="mt-5 flex flex-col gap-10">
          <Button
            type="submit"
            className="self-end w-fit px-6 border-zinc-300 bg-zinc-700 text-white hover:bg-zinc-700/90"
            onClick={scrollToElement}
          >
            Add New Question
          </Button>
          {questions?.map((question, index) => (
            <AddEditQuestion
              key={question.id}
              question={question}
              action="edit"
              number={index + 1}
            />
          ))}
          <div ref={addQuestionContainer}>
            <AddEditQuestion action="add" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
