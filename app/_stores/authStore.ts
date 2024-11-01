import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  rehydrated: boolean;
  setAuth: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setRehydrated: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      rehydrated: false,
      setAuth: (accessToken, refreshToken) => {
        set({
          isAuthenticated: true,
          accessToken,
          refreshToken,
        });
      },
      logout: () => {
        set({
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
        });
      },
      setRehydrated: () => set({ rehydrated: true }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setRehydrated();
      },
    }
  )
);
