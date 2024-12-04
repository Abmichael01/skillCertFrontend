import React from "react"
import Link from "next/link";
import Logo from "@/app/_components/Logo"

const AuthFormWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
      <div className="flex flex-col gap-5 vsm:px-10 py-10 rounded-lg md:shadow-md md:border w-full vsm:w-[500px]">
        <Link href="/" className="text-xl flex gap-3 flex-col text-center items-center w-fit self-center">
          <Logo />
        </Link>
        {children}
        
      </div>
  );
};

export default AuthFormWrapper;
