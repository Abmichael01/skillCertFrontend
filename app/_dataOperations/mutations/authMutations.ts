"use client";

import { useMutation } from "@tanstack/react-query";
import {
  loginUser,
  signupUser,
  activateUser,
} from "@/app/_services/api/apiEndpoints";
import { useAuthenticateUser } from "@/app/_hooks";
import { SignupData, LoginData, ActivationData } from "@/app/_types";
import apiError from "@/app/_services/api/apiError";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation"

export const useLoginMutation = () => {
  const { authenticateUser } = useAuthenticateUser()
  const searchParams = useSearchParams()
  const nextUrl = searchParams.get("next") || "/"
  const router = useRouter()

  return useMutation({
    mutationFn: (credentials: LoginData) =>
      loginUser(credentials.email, credentials.password),
    onSuccess: (data: { access: string; refresh: string }) => {
      authenticateUser(data)
      router.push(nextUrl);
      setTimeout(()=> {toast.success("Login Successful")}, 1000);
    },
    onError: (error) => {
      console.log(error);
      apiError(error);
    },
  });
};

export const useSignupMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: (signupData: SignupData) => signupUser(signupData),
    onSuccess: () => {
      router.push("/auth/login");
      toast.success("Your account has been created, check your email to activate your account");
    },
    onError: (error: unknown) => {
      apiError(error);
      console.log(error);
    },
  });
};

export const useActivationMutation = () => {
  return useMutation({
    mutationFn: (activationData: ActivationData) =>
      activateUser(activationData),
    onSuccess: () => {
      console.log("activated");
    },
    onError: (error) => {
      console.log(error);
      apiError(error);
    },
  });
};
