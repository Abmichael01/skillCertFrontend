"use client"

import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const navigations = [
  {
    number: 1,
    name: "Overview",
  },
  {
    number: 2,
    name: "Questions",
  },
  {
    number: 3,
    name: "Gallery",
  },
  {
    number: 4,
    name: "Publish",
  }
];

const CreateTestNav = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const pathnameList = usePathname().split("/")
  const tab = searchParams.get("tab")

  const changeTab = (tabName: string) =>{
    if(pathnameList.includes("edit")){
      router.push(`${pathname}?tab=${tabName.toLowerCase()}`)
    }
  }

  return (
    <div className="border-b flex gap-2 vsm:gap-5 sm:gap-10 pb-5 flex-wrap">
      {navigations.map((navigation, index) => (
        <div
          key={index}
          onClick={()=>{changeTab(navigation.name)}}
          className={`flex items-center gap-1 vsm:gap-3  font-semibold cursor-pointer ${
            tab === navigation.name.toLowerCase() ? "text-zinc-500" : "text-zinc-300"
          } `}
        >
          <div className={`w-8 h-8 flex items-center font-bold justify-center rounded-full  text-white ${
            tab === navigation.name.toLowerCase() ? "bg-primary" : "bg-zinc-400"
          }`}>
            {navigation.number}
          </div>
          {navigation.name}
          {navigation.name !== "Publish" && <FaAngleRight /> }
        </div>
          
      ))}

  </div>
  );
};

export default CreateTestNav;
