import * as z from "zod";
import { BannerUploadData } from '@/app/_types';

export const TestSchema = z.object({
    title: z.string().min(10, "Title cannot be less than 10"),
    category: z.string().min(1, "Category is required"),
    duration: z.preprocess((val)=> Number(val), z.number().min(5, "Duration cannot be less than 5 mins")),
    difficulty: z.string().min(1, "Category is required"),
    public: z.string()
})

const OptionSchema = z.object({
    id: z.number().optional(),
    option: z.string().min(1, "Option cannot be empty"),
    is_correct: z.boolean().default(false)
})

export const QuestionSchema = z.object({
    testSlug: z.string(),
    id: z.number().optional(),
    question: z.string().min(1, "Question is required"),
    options: z.array(OptionSchema).min(2, "At least 2 options are required"),
})

export const TestAttemptAnswerSchema = z.object({
    question: z.number().optional(),
    selected_option: z.number().optional(),
})



