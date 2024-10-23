import SignupForm from "@/app/_components/forms/SignupForm";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-5 px-20 py-10 rounded-lg shadow-lg border">
        <h1 className="text-xl">
          Signup to
          <span className="text-2xl">
            Skill<span className="text-primary">Cert</span>
          </span>
        </h1>
        <SignupForm />
        <div>
          Are you part of us? <Link href="/auth/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default page;


