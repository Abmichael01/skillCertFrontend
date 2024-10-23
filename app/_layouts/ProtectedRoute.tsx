"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "../_stores";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ProtectedRouteProps{
  children: React.ReactNode;
}

interface AuthStorageData{
  isAuthenticated: boolean;
  accessToken: string;
  refreshToken: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const { isAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();


  useEffect(() => {
    const checkAndRedirect = async () =>{
      if (!isAuthenticated) {
        const nextUrl = window.location.pathname + window.location.search;
        router.push(`/auth/login?next=${nextUrl}`);
        toast.info("Please login to continue");
      }
    }
    
    checkAndRedirect()
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // or loading spinner, or any other component to show during redirection
  }

  return <div>{children}</div>;
  
    
};

export default ProtectedRoute;
