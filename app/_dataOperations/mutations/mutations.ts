"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    addEditQuestion,
  attemptTest,
  createEditTest,
  deleteQuestion,
  publishTest,
  submitTest,
  uploadBanner
} from "@/app/_services/api/apiEndpoints";
import { TestSchema, QuestionSchema, SubmitTestData, BannerUploadData } from "@/app/_types";
import apiError from "@/app/_services/api/apiError";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation"


interface createEditTestProps {
    data: TestSchema, action: string
}

export const useCreateEditTestMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: createEditTestProps) => createEditTest(data.data, data.action),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['testAndQuestions'] });
        },
        onError: (error) => {
            apiError(error)
        }
    })
}

export const useAddEditQuestionMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (props: {data: QuestionSchema, action: string}) => addEditQuestion(props.data, props.action),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['testAndQuestions'] });
        },
        onError: (error) => {
            apiError(error)
        }
    })
}

export const useDeleteQuestionMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => deleteQuestion(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['testAndQuestions'] });
        },
        onError: (error) => {
            apiError(error)
        }
    })
}

export const useAttemptTestMutation = () => {
    return useMutation({
        mutationFn: (testId: number) => attemptTest(testId),
    })
}

export const useSubmitTestMutation = () => {
    return useMutation({
        mutationFn: (data: SubmitTestData) =>  submitTest(data),
        onError: (error) => {
            apiError(error)
        }
    })
}

export const useUploadBannerMutation = () => {
    return useMutation({
        mutationFn: (data: BannerUploadData) =>  uploadBanner(data),
        onError: (error) => {
            apiError(error)
        }
    })
}

export const usePublishTestMutation = () => {
    return useMutation({
        mutationFn: (slug: string) => publishTest(slug),
        onError: (error) => {
            apiError(error)
        }
    })
}
