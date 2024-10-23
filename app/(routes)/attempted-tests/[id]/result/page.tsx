"use client"

import React from 'react'
import TestResult from "@/app/_components/attempted-tests/TestResult"
import ProtectedRoute from "@/app/_layouts/ProtectedRoute";
import MainPaddingLayout from "@/app/_layouts/MainPaddingLayout";
import {
    useTestQuery,
    useTestQuestionsQuery,
    useAttemptAnswersQuery,
  } from "@/app/_dataOperations/queries/queries";
import Answers from '@/app/_components/attempted-tests/Answers'
import AnswersNav from '@/app/_components/attempted-tests/AnswersNav'
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useTestAttemptStore, useAttemptAnswersStore } from "@/app/_stores";
import { Question, Answer } from "@/app/_types";


const page = () => {
    const id = usePathname().split("/")[2]
    const resetStore = useTestAttemptStore((state) => state.reset);
    resetStore()
    const { data } = useAttemptAnswersQuery(Number(id))
    const setQuestions = useTestAttemptStore((state) => state.setQuestions);
    const setAttemptAnswers = useAttemptAnswersStore(state => state.setAttemptAnswers)
    setAttemptAnswers(data?.answers as Answer[])
    setQuestions(data?.test.questions as Question[]);
    console.log(data)
    
    return ( 
        <ProtectedRoute>
            <MainPaddingLayout>
                <TestResult score={data?.score as number} />
                <div className="mt-20 flex gap-5 flex-col-reverse lg:flex-row">
                    <Answers />
                    <AnswersNav />
                </div>
            </MainPaddingLayout>
        </ProtectedRoute>
    )
}

export default page
