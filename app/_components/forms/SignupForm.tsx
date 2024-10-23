"use client";

import Form from "./Form";
import { SignupData } from "@/app/_types";
import { useSignupMutation } from "@/app/_dataOperations/mutations/authMutations";
import { SignupSchema } from "@/app/_schemas";



const SignupForm = () => {
  const fields = [
    { name: "email", type: "text", label: "Email" },
    { name: "username", type: "text", label: "Username" },
    { name: "password", type: "password", label: "Password" },
    { name: "re_password", type: "password", label: "Confirm Password" },
  ];

  const { mutate, isSuccess, isPending } = useSignupMutation();


  const onSubmit = (data: SignupData) => {
    mutate(data);
  };

  return (
    <div>
      <Form
        title="Signup"
        schema={SignupSchema}
        fields={fields}
        onSubmit={onSubmit}
        isLoading={isPending}
      />
    </div>
  );
};

export default SignupForm;
