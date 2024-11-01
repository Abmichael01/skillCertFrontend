"use client"

import React, { useEffect } from 'react'
import TestResult from "@/app/_components/attempted-tests/TestResult"
import {
    useAttemptAnswersQuery,
  } from "@/app/_dataOperations/queries/queries";
import Answers from '@/app/_components/attempted-tests/Answers'
import AnswersNav from '@/app/_components/attempted-tests/AnswersNav'
import { usePathname } from "next/navigation"
import { useTestAttemptStore, useAttemptAnswersStore } from "@/app/_stores";
import { Question, Answer } from "@/app/_types";
import QuestionAndAnswersSkeleton from '../Skeletons/QuestionAndAnswersSkeleton';

const TestResultPage = () => {
  const id = usePathname().split("/")[2]
    const resetStore = useTestAttemptStore((state) => state.reset);
    // useEffect(()=>{
    //     resetStore()
    // })
    resetStore()
    const { data, isPending } = useAttemptAnswersQuery(Number(id))
    const setQuestions = useTestAttemptStore((state) => state.setQuestions);
    const setAttemptAnswers = useAttemptAnswersStore(state => state.setAttemptAnswers)
    setAttemptAnswers(data?.answers as Answer[])
    setQuestions(data?.test.questions as Question[]);
    console.log(data)
  return (
    <div>
      <TestResult score={data?.score as number} isPending={isPending} />
      <div className="mt-20 flex gap-5 flex-col-reverse lg:flex-row">
          <Answers />
          <AnswersNav /> 
      </div>
      {/*<QuestionAndAnswersSkeleton />*/}
    </div>
  )
}

export default TestResultPage
