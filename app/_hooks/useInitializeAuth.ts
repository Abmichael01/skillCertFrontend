// hooks/useInitializeAuth.ts
import { useEffect } from "react";
import { useAuthStore } from "../_stores";

const useInitializeAuth = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const storedAuthData = localStorage.getItem("auth-storage");

    if (storedAuthData) {
      const { state } = JSON.parse(storedAuthData); // Destructure the state from the parsed object
      const { isAuthenticated, accessToken, refreshToken } = state; // Extract required fields
      
      if (isAuthenticated && accessToken && refreshToken) {
        setAuth(accessToken, refreshToken);
      } else {
        logout();
      }
    } else {
      logout();
    }
  }, [setAuth, logout]);
};

export default useInitializeAuth;
