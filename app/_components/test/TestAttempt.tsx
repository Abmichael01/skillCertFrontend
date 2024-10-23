"use client";

import Questions from "@/app/_components/test/Questions";
import QuestionsNav from "@/app/_components/test/QuestionsNav";
import {
  useTestQuestionsQuery,
} from "@/app/_dataOperations/queries/queries";
import MainPaddingLayout from "@/app/_layouts/MainPaddingLayout";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useTestAttemptStore } from "@/app/_stores";
import { Question } from "@/app/_types";


const TestAttempt = () => {
  const resetStore = useTestAttemptStore(state=>state.reset)
  const setQuestions = useTestAttemptStore((state) => state.setQuestions);
  const setDuration = useTestAttemptStore(state => state.setDuration)
  const duration = useTestAttemptStore(state => state.duration)
  const pathnameList = usePathname()?.split("/");
  const slug = pathnameList?.[pathnameList.length - 2];
  const { data } = useTestQuestionsQuery(slug);
  setQuestions(data?.questions as Question[]);
  setDuration(data?.test?.duration as number)
  const questions = useTestAttemptStore((state) => state.questions);

  useEffect(()=>{
    resetStore()
  }, [])
  
  return (

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-5 border border-zinc-300 px-5 py-3 lg:sticky top-24 bg-white z-20">
            <h1>{data?.test.title}</h1>
            <div className="flex items-center gap-2">
              <p>Time Remaining:</p>
              <p className="animate-pulse">{duration}:00</p>
            </div>
          </div>
          <div className="flex gap-5 flex-col-reverse lg:flex-row">
            <Questions />
            <QuestionsNav />
            <div className="fixed hidden bottom-[20%] right-2 rounded-xl px-4 py-2 border shadow-xl bg-white gap-2 items-center flex-col cursor-pointer" >
              <div className={`w-10 h-10 flex items-center justify-center text-xl rounded-full border border-primary transition cursor-pointerborder-zinc-300 hover:bg-zinc-100`}>
                      1
              </div>
              <div className="w-1 h-1 rounded-full bg-primary"></div>
              <div className="w-1 h-1 rounded-full bg-primary"></div>
              <div className="w-1 h-1 rounded-full bg-primary"></div>
              <div className={`w-10 h-10 flex items-center justify-center text-xl rounded-full border border-primary transitioncursor-pointerborder-zinc-300 hover:bg-zinc-100`}>
                {questions?.length}
              </div>
            </div>
          </div>
        </div>
  );
};

export default TestAttempt;
