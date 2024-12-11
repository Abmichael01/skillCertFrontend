"use client";

import Form from "./Form";
import { LoginData } from "@/app/_types";
import { useLoginMutation } from "@/app/_dataOperations/mutations/authMutations";
import { LoginSchema } from "@/app/_schemas";
import { useAuthenticateUser } from "@/app/_hooks"
import { useSearchParams } from "next/navigation";



const LoginForm = () => {
  //  const searchParams = useSearchParams()
  // const nextUrl = searchParams.get("next") || ""
  const fields = [
    { name: "email", type: "text", label: "Email" },
    { name: "password", type: "password", label: "Password" },
  ];

  const { mutate, isSuccess, isPending } = useLoginMutation();
  const { authenticateUser } = useAuthenticateUser()

  const onSubmit = (data: LoginData) => {
    mutate(data);
  };

  return (
    <div>
      <Form
        title="Login"
        schema={LoginSchema}
        fields={fields}
        onSubmit={onSubmit}
        isLoading={isPending}
      />
    </div>
  )
}

export default LoginForm
