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
import { useRouter } from "next/navigation";



const UserDropdown = () => {
  const { user } = useUserStore();
  const router = useRouter()
  const [isActive, setIsActive] = useState(false);
  const handleToggle = () => {
    setIsActive(!isActive);
    alert(121);  // remove this line for actual use
    console.log(88888)
  }

  const items = [
    {
      name: "Profile",
      icon: <User />,
      link: `/profile/${user.id}`,
    },
    {
      name: "Attempted Tests",
      icon: <Brain />,
      link: "/attempted-tests"
    },
    {
      name: "My Tests",
      icon: <Brain />,
      link: "/my-tests?filter=public"
    },
    {
      name: "Settings",
      icon: <Settings />,
      link: "/"
    },
  
  ]

  const navigate = (link: string) => {
    router.push(link)
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
              className={`text-zinc-500 w-5 h-5 ${isActive ? "rotate-0" : "" // rotate dropdown menu icon when it is open
                }`}
            />
          </div>
          {/* <FaAngleUp className="text-zinc-500 w-5 h-5" /> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" z-[9999]">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items.map((item, index) => (
            <DropdownMenuItem onClick={() => navigate(item.link)} key={index}>
             {item.icon}
             <span>{item.name}</span>
            </DropdownMenuItem>
          ))}

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
