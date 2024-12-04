import LoginForm from "@/app/_components/forms/LoginForm";
import AuthFormWrapper from "@/app/_layouts/AuthFormWrapper";
import GoogleAuthButton from "@/app/_components/GoogleAuthButton";
import AuthPageLinker from "@/app/_components/AuthPageLinker";
import MainPaddingLayout from "@/app/_layouts/MainPaddingLayout";

const page = () => {
  return (
    <MainPaddingLayout>
      <div className="flex justify-center">
        <AuthFormWrapper>
          <h1 className="text-xl text-center">Welcome Back!</h1>
          <LoginForm />
          {/* <GoogleAuthButton /> */}
          <AuthPageLinker
            link="/auth/signup"
            linkText="Signup"
            text="Are you a new member?"
          />
        </AuthFormWrapper>
      </div>
    </MainPaddingLayout>
  );
};

export default page;
