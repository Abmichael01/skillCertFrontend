"use client"

import { Test as TestType } from "@/app/_types"
import { AlertTriangle, BarChart2, Edit, Trash } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link"
import { FaAngleDown, FaAngleUp } from "react-icons/fa";


const Test = ({test}: {test: TestType}) => {
    return (
        <div className="flex justify-between items-center even:bg-primary-100/50 py-3 px-5">
            <h1>{test.title}</h1>
            <div className="flex items-center gap-4 text-sm">
                {/* <div className="flex items-end">
                    <BarChart2 className="text-zinc-800 w-4 h-4" /> (23)
                </div> */}
                <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                    <div
                        className="gap-1 border outline-none px-3 py-2 rounded-md text-16px group"
                    >
                        <FaAngleDown className="text-zinc-500 w-4 h-4 font-light" />
                    </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className=" z-[9999] ">
                    <DropdownMenuItem>
                        <Link href={`/my-tests/${test.slug}/edit?tab=overview`} target="_blank" className="flex gap-2 items-center">
                            <Edit className=" w-4 h-4 text-zinc-800" />
                            Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="#" className="flex gap-2 items-center">
                            <Trash className=" w-4 h-4 text-zinc-800" />
                            Delete
                        </Link>
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
};

export default Test;