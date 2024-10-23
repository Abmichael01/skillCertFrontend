"use client"

import RelatedTests, { shuffleArray } from "@/app/_components/test/RelatedTests";
import { useTestQuery } from "@/app/_dataOperations/queries/queries";
import { useAttemptTestMutation } from "@/app/_dataOperations/mutations/mutations"
import MainPaddingLayout from "@/app/_layouts/MainPaddingLayout";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation"
import Image from "next/image";
import DynamicBanner from "@/app/_components/DynamicBanner";
import { ConfirmActionDialog } from "@/app/_components/ConfirmActionDialog";

const page = () => {
  const pathnameList = usePathname()?.split("/")
  const slug = pathnameList?.[pathnameList.length - 1]
  const router = useRouter()
  const { data } = useTestQuery(slug)
  const { mutate, isPending } = useAttemptTestMutation()

  const attemptTest = () => {
    mutate(data?.id as number, {
      onSuccess: (dataR) => {
        router.push(`/tests/${data?.slug}/attempt-test/?attemptId=${dataR.id}`)
      }
    })
  }

  return (
    <MainPaddingLayout>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-center w-full">
          <div className="md:w-[500px] h-[220px] w-full md:h-[300px] overflow-hidden rounded-md">
            {data?.banner !== null ? (
              <Image
                src={data?.banner as string}
                width={50}
                height={50}
                alt="anything"
                className="w-full h-full object-cover group-hover:scale-105 transition "
              />
            ) : (
              <DynamicBanner />
            )}
          </div>
          <div className="flex flex-col gap-2 items-center mt-5">
            <h1 className="text-[18px] font-semibold">{data?.title}</h1>
            <p className="text-sm"><strong>Duration:</strong> {data?.duration}mins </p>
            <div className="flex gap-2 text-sm items-center">
              <strong>Difficulty: </strong>
              {data?.difficulty === "S" && (
                <p className="px-3 py-[1px] rounded-md border border-green-500 bg-green-100 text-green-500 text-[12px]">
                  Simple
                </p>
              )}
              {data?.difficulty === "M" && (
                <p className="px-3 py-[1px] rounded-md border border-yellow-500 bg-yellow-100 text-yellow-500 text-[12px]">
                  Moderate
                </p>
              )}
              {data?.difficulty === "H" && (
                <p className="px-3 py-[1px] rounded-md border border-red-500 bg-red-100 text-red-500 text-[12px]">
                  Hard
                </p>
              )}
            </div>
          </div>
          
          <ConfirmActionDialog
            title="Confirm Action"
            description="Are you sure you want to attempt this test?"
            confirmLabel="Yes, Attempt Test"
            cancelLabel="Not Now"
            trigger={
              <Button
                className="w-fit px-6 text-center text-[16px] hover:shadow-md transition bg-primary text-white flex items-center justify-center rounded-md mt-5 gap-2 py-3 group">
                <Brain className="w-5 h-5" />
                {isPending ? "Starting Attempt..." : "Attempt Test"}
              </Button>
            }
            onConfirm={attemptTest}
            isPending={isPending}
            pendingText="Starting Attempt..."
          />
        </div>
        <RelatedTests categoryId={7} />
      </div>
    </MainPaddingLayout>
  );
};

export default page;
