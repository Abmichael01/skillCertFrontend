import EditPage from "@/app/_components/my-tests/EditPage";
import MainPaddingLayout from "@/app/_layouts/MainPaddingLayout";
import ProtectedRoute from "@/app/_layouts/ProtectedRoute";


const Page = () => {
  return (
    <div>
      <ProtectedRoute>
        <MainPaddingLayout>
          <EditPage />
        </MainPaddingLayout>
      </ProtectedRoute>
    </div>
  );
};

export default Page;
