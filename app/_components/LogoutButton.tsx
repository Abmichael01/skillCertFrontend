import React from "react";
import { LogOutIcon } from "lucide-react";
import { useAuthenticateUser } from "../_hooks";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
    const { logoutUser } = useAuthenticateUser();
    const router = useRouter()

    const handleLogout = () =>{
        router.push("/auth/login");
        setTimeout(()=>{
          logoutUser();
        }, 1000)
    }
  return (
    <div onClick={handleLogout} className="flex items-center gap-1 w-full">
        <LogOutIcon className="text-zinc-800 w-4 h-4" />
        Logout
    </div>
  );
};

export default LogoutButton;
