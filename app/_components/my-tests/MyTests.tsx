
"use client"


import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { PlusCircle, TypeIcon } from "lucide-react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import PublicTests from "@/app/_components/my-tests/PublicTests"
import PrivateTests from "@/app/_components/my-tests/PrivateTests"
import DraftTests from "@/app/_components/my-tests/DraftTests"
import { useTestsByUserQuery } from "@/app/_dataOperations/queries/queries"
import { Test } from "@/app/_types"
import { useUserStore } from '@/app/_stores';


const filters = [
  {
    name: "Public",
    slug: "public"
  },
  {
    name: "Private",
    slug: "private"
  },
  {
    name: "Drafts",
    slug: "drafts"
  },

]

const MyTests = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const filter = searchParams.get("filter")
  
  const changeFilter = (filterName: string) => {
    router.push(`${pathname}?filter=${filterName}`)
  }

  const user = useUserStore(state=>state.user)
  const { data } = useTestsByUserQuery(Number(user?.id))
  const publicTests = data?.filter(test=> test.published && test.public) ?? []
  const privateTests = data?.filter(test=> test.published && !test.public) ?? []
  const drafts = data?.filter(test=> !test.published) ?? []
  
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">My Tests</h1>
        <Link href="/my-tests/new?tab=overview">
          <Button className="px-5 py-2 text-[15px] border border-primary text-primary bg-primary-100 hover:bg-primary-100/80 rounded-md items-center gap-2 hidden sm:flex">
            <PlusCircle />
            New Test
          </Button>
        </Link>
      </div>
      <div>
        <div className="border-b flex gap-5 px-5">
          {filters.map((nav, index)=>(
          <div key={index} onClick={()=> changeFilter(nav.slug)} className={`flex gap-2 items-center text-sm cursor-pointer py-3 px-4 font-semibold ${
            filter == nav.slug ? "border-b border-primary text-primary-700" : "text-zinc-500 bg-white"
          }`}>
            {nav.name} 
            <span>(
              { nav.slug === "public" && publicTests?.length }
              { nav.slug === "private" && privateTests?.length }
              { nav.slug === "drafts" && drafts?.length })
            </span>
          </div>
          ))}
        </div>
        { filter === "public" && <PublicTests tests={publicTests as Test[]} /> }
        { filter === "private" && <PrivateTests tests={privateTests as Test[]} /> }
        { filter === "drafts" && <DraftTests tests={drafts as Test[]} /> }
      </div>
    </div>
  )
}

export default MyTests
