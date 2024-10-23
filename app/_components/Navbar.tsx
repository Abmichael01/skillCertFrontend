"use client";

import Link from "next/link";
import MainPaddingLayout from "../_layouts/MainPaddingLayout";
import { AppWindowIcon, Boxes, PlusCircle, TypeIcon } from "lucide-react";
import { useAuthStore, useUserStore } from "../_stores";
import { Button } from "@/components/ui/button";
import UserDropdown from "./UserDropdown"
import Logo from "./Logo";

const Navbar = () => {
  const { user } = useUserStore();
  const { isAuthenticated } = useAuthStore();
  return (
    <div className="fixed top-0 left-0 py-5 border-b right-0 bg-white z-[999]">
      <MainPaddingLayout>
        <div className="flex justify-between items-center">
          <div className="flex gap-10 items-center">
            <Logo />
            {/* <h1 className="flex items-center gap-1 cursor-pointer px-5 py-2 rounded-md bg-zinc-200">
              <Boxes />
              Categories
            </h1> */}
          </div>
          <nav className="flex gap-3 items-center">
            {isAuthenticated ? (
              <div className="flex items-center gap-10">
                <Link href="/my-tests/new?tab=overview">
                  <Button className="px-5 py-2 text-[15px] bg-primary text-white rounded-md items-center gap-2 hidden sm:flex">
                    <PlusCircle />
                    Create Test
                  </Button>
                </Link>
                <UserDropdown />
              </div>
            ) : (
              <div>
                <Link
                  href="/auth/login"
                  className="px-5 py-2 text-[15px] bg-primary text-white rounded-md"
                >
                  Login
                </Link>
              </div>
            )}
          </nav>
        </div>
      </MainPaddingLayout>
    </div>
  );
};

export default Navbar;
