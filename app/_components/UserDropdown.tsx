"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { useUserStore } from "../_stores";
import { Brain, Settings, User, UserCircle } from "lucide-react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import LogoutButton from "./LogoutButton"
import Link from "next/link"

const UserDropdown = () => {
  const { user } = useUserStore();
  const [isActive, setIsActive] = useState(false);
  const handleToggle = ()=>{
    setIsActive(!isActive);
    alert(121);  // remove this line for actual use
    console.log(88888)
  }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <div
            onClick={handleToggle}
            className="flex items-center gap-1 border outline-none px-3 py-2 rounded-md text-16px group"
          >
            <UserCircle className="text-zinc-600" />
            {/* {user.username} */}
            <FaAngleDown
              className={`text-zinc-500 w-5 h-5 ${
                isActive ? "rotate-0" : "" // rotate dropdown menu icon when it is open
              }`}
            />
          </div>
          {/* <FaAngleUp className="text-zinc-500 w-5 h-5" /> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" z-[9999]">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`/profile/${user.id}`} className="flex gap-1 items-center">
                <User className="text-zinc-800 w-4 h-4" />
                Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/attempted-tests" className="flex gap-1 items-center">
                <Brain className="text-zinc-800 w-4 h-4" />
                Attempted Tests
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/my-tests?filter=public" className="flex gap-1 items-center">
                <Brain className="text-zinc-800 w-4 h-4" />
                My Tests
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="#" className="flex gap-1 items-center">
                <Settings className="text-zinc-800 w-4 h-4" />
                Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropdown;
