"use client"

import SignupForm from "@/app/_components/forms/SignupForm";
import React, { useEffect } from "react";
import AuthFormWrapper from "@/app/_layouts/AuthFormWrapper";
import GoogleAuthButton from "@/app/_components/GoogleAuthButton";
import AuthPageLinker from "@/app/_components/AuthPageLinker";
import MainPaddingLayout from "@/app/_layouts/MainPaddingLayout";
import { useAuthStore } from "@/app/_stores";
import { useAuthenticateUser } from "@/app/_hooks";
import { useRouter } from "next/navigation";

const page = () => {
  // const { logoutUser } = useAuthenticateUser()
  // logoutUser()
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()
  useEffect(()=>{
    if(isAuthenticated){
      router.push("/")
    }
  })
 
  return (
    <MainPaddingLayout>
      <div className="flex justify-center">
        <AuthFormWrapper>
          <h1 className="text-xl text-center">Signup</h1>
          <SignupForm />
          <GoogleAuthButton />
          <AuthPageLinker
            link="/auth/login"
            linkText="Login"
            text="I have an account"
          />
        </AuthFormWrapper>
      </div>
    </MainPaddingLayout>
  );
};

export default page;
