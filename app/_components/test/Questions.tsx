"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { TestAttemptAnswerSchema } from "@/app/_schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTestAttemptStore } from "@/app/_stores";
import Question from "./Question";
import { shuffleArray } from "./RelatedTests";
import { Question as QuestionType } from "@/app/_types";

const schema = TestAttemptAnswerSchema;

const Questions = () => {

  const questions = useTestAttemptStore((state) => state.questions);

  return (
    <div className="border border-zinc-300 md:p-10 px-4 py-10 rounded-md flex-grow bg-white">
      {questions?.map((question, index) => (
        <div
        key={index}
        >
          <Question question={question} index={index} />
        </div>
      ))}
    </div>
  );
};

export default Questions;
