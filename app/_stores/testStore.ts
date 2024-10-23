"use client";

import { create } from "zustand";
import { Test, Question, TestAttemptAnswer, Answer } from "../_types";
import { AttemptAnswers } from '@/app/_types';


interface TestState {
  test: Test;
  questions: Question[];
  setTest: (test: Test, questions: Question[]) => void;
}

// export const useTestStore = create<TestState>((set) => ({
//     test: {
//         id: 0,
//         title: '',
//         category: 0,
//         duration: 0,
//         difficulty: '',
//     },
//     questions: [],
//     setTest: (test: Test, questions: Question[]) => {
//         set({
//             test: test,
//             questions: questions,
//         })
//     }
// }))

interface TestAttemptStore {
  duration: number;
  currentQuestionIndex: number;
  answeredQuestionsIndex: number[];
  answers: TestAttemptAnswer[];
  questions: Question[];
  setDuration: (number: number) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setAnsweredQuestionsIndex: (index: number) => void;
  addAnswer: (answer: TestAttemptAnswer) => void;
  setQuestions: (questions: Question[]) => void;
  updateAnswer: (question: number, selected_option: number) => void;
  reset: () => void; // Add reset method
}

export const useTestAttemptStore = create<TestAttemptStore>((set) => ({
  duration: 0,
  currentQuestionIndex: 0,
  answeredQuestionsIndex: [],
  answers: [],
  questions: [],
  setDuration: (number) => set({ duration: number }),
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  setAnsweredQuestionsIndex: (index) =>
    set((state) => ({
      answeredQuestionsIndex: [...state.answeredQuestionsIndex, index],
    })),
  addAnswer: (answer) =>
    set((state) => ({
      answers: [...state.answers, answer],
    })),
  setQuestions: (questions) => set({ questions: questions }),
  updateAnswer: (question, selected_option) =>
    set((state) => ({
      answers: state.answers.map((answer) =>
        answer.question === question ? { ...answer, selected_option } : answer
      ),
    })),
  reset: () => set({ // Reset method implementation
    duration: 0,
    currentQuestionIndex: 0,
    answeredQuestionsIndex: [],
    answers: [],
    questions: [],
  }),
}));


interface AttemptAnswersStore {
  attemptAnswers: Answer[];
  setAttemptAnswers: (answers: Answer[]) => void;
}


export const useAttemptAnswersStore = create<AttemptAnswersStore>((set) => ({
  attemptAnswers: [],
  setAttemptAnswers: (answers) => set({attemptAnswers: answers})
}))