import { create } from "zustand";
import { persist } from "zustand/middleware"



interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}


export const useAuthStore = create(persist<AuthState>(
  (set) => ({ 
    isAuthenticated: true,
    accessToken: null,
    refreshToken: null,
    setAuth: (accessToken: string, refreshToken: string) => {
      set({
        isAuthenticated: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    },
    logout: () => {
      set({
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
      });
    },
  }),
  {
    name: "auth-storage",
    // getStorage: () => localStorage,
  }
));
