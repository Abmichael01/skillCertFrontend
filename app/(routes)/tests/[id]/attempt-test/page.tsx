import TestAttempt from "@/app/_components/test/TestAttempt";
import MainPaddingLayout from "@/app/_layouts/MainPaddingLayout";
import ProtectedRoute from "@/app/_layouts/ProtectedRoute";

const Page = () => {

  
  return (
    <ProtectedRoute>
      <MainPaddingLayout>
        <TestAttempt />
      </MainPaddingLayout>
    </ProtectedRoute>
  );
};

export default Page;
