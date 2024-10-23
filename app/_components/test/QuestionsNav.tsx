"use client"

import { ArrowRight } from "lucide-react";
import React, { useEffect } from "react";
import { useTestAttemptStore } from "@/app/_stores";
import { useSearchParams } from "next/navigation";
import { useSubmitTestMutation } from "@/app/_dataOperations/mutations/mutations";
import { submitTest } from './../../_services/api/apiEndpoints';
import { useRouter, usePathname } from "next/navigation";
import { ConfirmActionDialog } from "../ConfirmActionDialog";


const QuestionsNav = () => {
  const router = useRouter();
  const questions = useTestAttemptStore((state) => state.questions);
  const currentQuestionIndex = useTestAttemptStore((state) => state.currentQuestionIndex);
  const setCurrentQuestionIndex = useTestAttemptStore((state) => state.setCurrentQuestionIndex);
  const answeredQuestionsIndex = useTestAttemptStore((state) => state.answeredQuestionsIndex);
  const setAnsweredQuestionsIndex = useTestAttemptStore((state) => state.setAnsweredQuestionsIndex);
  const answers = useTestAttemptStore((state) => state.answers);
  const duration = useTestAttemptStore(state => state.duration)
  const setDuration = useTestAttemptStore(state => state.setDuration)

  const searchParams = useSearchParams()
  const attemptId = searchParams.get("attemptId")
  
  const { mutate, isPending } = useSubmitTestMutation()

  const submitTest = () => {
    const data = {
      attemptId: Number(attemptId),
      answers: answers
    }
   
    mutate(data, {
      onSuccess: (res) => {
        router.push(`/attempted-tests/${res.id}/result`)
      }
    })
   
  }

  const autoSubmitTest = () => {
    const data = {
      attemptId: Number(attemptId),
      answers: answers
    }
    mutate(data, {
      onSuccess: () => {
        alert("Form Submitted")
      }
    })
  }

  if(duration === 0){
    autoSubmitTest()
  }


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
      
      <ConfirmActionDialog
          title="Confirm Submit"
          description="You still have 5:00 mins left. Are you sure you want to submit?"
          confirmLabel="Yes, Submit"
          actionType="default" 
          cancelLabel="Back To Test" 
          onConfirm={submitTest}
          isPending={isPending}
          pendingText="Submitting Test..."
          trigger={<button className="px-4 py-2 border border-primary text-primary rounded-md mt-5 group flex items-center gap-2">
                      Finish Test
                      <ArrowRight className="group-hover:translate-x-2 transition" />
                    </button>}       
      />
    </div>
  );
};

export default QuestionsNav;
