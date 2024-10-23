"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { TestAttemptAnswerSchema } from "@/app/_schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTestAttemptStore } from "@/app/_stores";
import Answer from "./Answer";
import { Question as QuestionType } from "@/app/_types";

const schema = TestAttemptAnswerSchema;

const Answers = () => {

  const questions = useTestAttemptStore((state) => state.questions);
  console.log(questions)
  return (
    <div className="border border-zinc-300 md:p-10 px-4 py-10 rounded-md flex-grow bg-white">
      {questions?.map((question, index) => (
        <div key={index}>
          <Answer question={question} index={index} />
        </div>
      ))}
    </div>
  );
};

export default Answers;
