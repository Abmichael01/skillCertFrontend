"use client"

import React from 'react'
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const navigation = [
  {
    name: "My Tests",
    slug: "my-tests"
  },
  {
    name: "Attempted Tests",
    slug: "attempted-tests"
  }
]

const MyTestsNav = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const pathnameList = usePathname().split("/")
  const tab = searchParams.get("tab")

  const changeTab = (tabName: string) => {
    router.push(`${pathname}?tab=${tabName}`)
  }

  return (
    <div className="border-b flex gap-10">
      {navigation.map((nav, index) => (
        <div
          key={index}
          onClick={() => { changeTab(nav.slug) }}
          className={`flex items-center gap-3  font-semibold cursor-pointer pb-3 ${tab === nav.slug ? "text-primary-800 border-b-2 border-primary" : "text-zinc-500"
            } `}>
          <span>{nav.name}</span>
        </div>
      ))}
    </div >
  )
}

export default MyTestsNav
