import * as z from "zod";
import { TestSchema, QuestionSchema, TestAttemptAnswerSchema } from "@/app/_schemas/testSchema"

export type Category = {
    id: number;
    name: string;
    icon: string;
}

export type SignupData = {
    email: string;
    username: string;
    password: string;
    re_password: string; 
}

export type LoginData = {
    email: string;
    password: string;
}

export type ActivationData = {
    uid: string;
    token: string;
}

export type FormField = {
    name: string;
    type: string;
    label: string;
}

export type User = {
    id: number | null;
    email: string;
    username: string;
    is_admin: boolean;
}

export type Test = { 
    id: number;
    title: string;
    category: number;
    slug: string;
    difficulty: string;
    duration: number;
    banner: string;
    published: boolean;
    public: boolean;
    questions?: Question[];
}

export type Option = {
        id: number;
        question: number;
        option: string;
        is_correct: boolean;
}

export type Question = {
    id: number;
    question: string;
    options: Option[];
}

export type TestSchema = z.infer<typeof TestSchema>

export type QuestionSchema = z.infer<typeof QuestionSchema>

export type TestAttemptAnswer = z.infer<typeof TestAttemptAnswerSchema>

export type SubmitTestData = {
    attemptId: number;
    answers: TestAttemptAnswer[];
}

export type BannerUploadData = {
    slug: string;
    banner: File;
}

export type Answer = {
    id: number;
    test_attempt: number;
    question: number;
    selected_option: number;
}

export type AttemptAnswers = {
    id: number;
    test: Test;
    score: number;
    answers: Answer[];
}

export type AttemptedTest = {
    id: number;
    user: number;
    test: Test;
}

