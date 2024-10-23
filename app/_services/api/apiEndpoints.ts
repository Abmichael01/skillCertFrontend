import apiClient from "./apiClient";
import { Category, SignupData, ActivationData, User, TestSchema, QuestionSchema, Test, BannerUploadData, SubmitTestData, AttemptedTest } from "@/app/_types";


export const loginUser = async (email: string, password: string) => {
  const response = await apiClient.post("/jwt/create/", {
    email,
    password,
  });
  return response.data;
};

export const signupUser = async (data: SignupData) => {
  if (data.password !== data.re_password) {
    throw new Error("Passwords do not match");
  }
  const response = await apiClient.post("/users/", data);
  return response.data;
};

export const activateUser = async (data: ActivationData) => {
  console.log(data)
  const response = await apiClient.post("/users/activation/", data);
  return response.data;
};

export const getCategories = async () => {
  const response = await apiClient.get<Category[]>("/categories/");
  return response.data;
};

export const getUser = async () => {
  const response = await apiClient.get<User>("/users/me/")
  return response.data
};

export const getTests = async () => {
  const response = await apiClient.get<Test[]>("/tests/")
  return response.data
}

export const getTest = async (slug: string) => {
  const response = await apiClient.get<Test>(`/test/${slug}/`)
  return response.data
}

export const createEditTest = async (data: TestSchema, action: string) => {
  const response = await apiClient.post(`/${action}-test/`, data)
  return response.data
}

export const getTestAndQuestions = async (slug: string) => {
  const response = await apiClient.get(`/get-test-and-questions/${slug}`)
  return response.data
}

export const addEditQuestion = async (data: QuestionSchema, action: string) => {
  const response = await apiClient.post(`/${action}-question/`, data)
  return response.data
}

export const deleteQuestion = async (id: number) => {
  const response = await apiClient.post(`/delete-question/`, id)
  return response.data
}

export const attemptTest = async (testId: number ) => {
  const { data } = await apiClient.post(`/attempt-test/`, testId)
  return data 
}

export const submitTest = async (data: SubmitTestData) => {
  const response = await apiClient.post(`/submit-test/`, data)
  return response.data 
}

export const testsByUser = async (id: number) => {
  const { data } = await apiClient.get(`/tests-by-user/${id}/`)
  return data
}

export const uploadBanner = async (data: BannerUploadData) => {
  const response = await apiClient.post("/upload-banner/", data)
  return response.data
}
  
export const publishTest = async (slug: string) => {
  const response = await apiClient.post("/publish-test/", {slug: slug})
  return response.data
}

export const attemptAnswers = async (id: number) => {
  const response = await apiClient.get(`/attempt-answers/${id}/`)
  return response.data
}

export const attemptedTests = async () => {
  const response = await apiClient.get("/attempted-tests/")
  return response.data as AttemptedTest[]
} 

export const testsByCategory = async (id: number) => {
  const response = await apiClient.get(`/tests-by-category/${id}/`)
  return response.data
}

export const userProfile = async (id: number) => {
  const response = await apiClient.get(`/user-profile/${id}/`)
  return response.data
}

export const search = async (query: string) => {
  const response = await apiClient.get(`/search/`, {params: {query} })
  return response.data
}