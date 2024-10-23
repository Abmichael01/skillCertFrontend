import { Question } from "./../../_types/types";
import { useQueries, useQuery } from "@tanstack/react-query";
import {
  getCategories,
  getUser,
  getTestAndQuestions,
  getTests,
  getTest,
  testsByUser,
  attemptAnswers,
  attemptedTests,
  testsByCategory,
  userProfile,
  search
} from "@/app/_services/api/apiEndpoints";
import { Category, User, Test, AttemptAnswers, AttemptedTest } from "@/app/_types";

export const useUserQuery = () => {
  return useQuery<User, Error>({
    queryKey: ["currentUser"],
    queryFn: () => getUser(),
  });
};

export const useCategoriesQuery = () => {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

export const useTestsQuery = () => {
  return useQuery<Test[], Error>({
    queryKey: ["tests"],
    queryFn: getTests,
  });
};

export const useTestQuery = (slug: string) => {
  return useQuery({
    queryKey: ["test", slug],
    queryFn: () => getTest(slug),
  });
};

export const useTestQuestionsQuery = (slug: string) => {
  return useQuery<{test: Test, questions: Question[]}>({
    queryKey: ["testAndQuestions", slug],
    queryFn: () => getTestAndQuestions(slug),
  });
};

export const useTestsByUserQuery = (id: number) => { 
  return useQuery<Test[]>({
    queryKey: ["testsByUser"], 
    queryFn: () =>  testsByUser(id),
  })
}

export const useAttemptAnswersQuery = (id: number) => {
  return useQuery<AttemptAnswers>({
    queryKey: ["attemptAnswers", id],
    queryFn: () => attemptAnswers(id),
  })
}

export const useAttemptedTestsQuery = () => {
  return useQuery<AttemptedTest[]>({
    queryKey: ["attemptedTests"],
    queryFn: attemptedTests,
  })
}

export const useTestsByCategoryQuery = (id: number) => {
  return useQuery<Test[]>({
    queryKey: ["attemptedTests"],
    queryFn: () => testsByCategory(id),
  })
}

export const useUserProfileQuery = (id: number) => {
  return useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => userProfile(id),
  })
}

export const  useSearchQuery = (query: string) => {
  return useQuery<Test[]>({
    queryKey: ["search", query],
    queryFn: () => search(query),
  })
}
