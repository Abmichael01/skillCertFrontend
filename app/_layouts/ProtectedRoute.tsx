"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "../_stores";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAuthStore(state=>state.isAuthenticated);
  

  const router = useRouter();

  // useInitializeAuth();

  // const storedAuthData = localStorage.getItem("auth-storage");
  // const { state } = JSON.parse(storedAuthData); // Destructure the state from the parsed object
  // const { isAuthenticated, accessToken, refreshToken } = state

  useEffect(() => {
    if (!isAuthenticated) {
      const nextUrl = window.location.pathname + window.location.search;
      router.push(`/auth/login?next=${nextUrl}`);
      toast.info("Please login to continue");
    }
  }, [isAuthenticated, route]);

  if ( !isAuthenticated) {
    return null; // Optionally, render a loading spinner
  }

  return <>{children}</>;
};

export default ProtectedRoute;
