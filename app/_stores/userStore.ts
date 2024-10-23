import { create } from "zustand";
import { persist } from "zustand/middleware"
import { User } from "../_types";
import { useUserQuery } from "@/app/_dataOperations/queries/queries";
import apiClient from "../_services/api/apiClient";

interface UserState {
  user: User;
  setUser: () => void;
  clearUser: () => void;
}

export const useUserStore = create(persist<UserState>(
  (set) => ({
    user: {
      id: null,
      username: "",
      email: "",
      is_admin: false,
    },
    setUser: async () => {
      const { data } = await apiClient.get("/users/me/")
      set({ user: data });
    },
    clearUser: () => {
      set({user: {
      id: null,
      username: "",
      email: "",
      is_admin: false,
    }})
    }
  }),
  {
    name: "user-storage"
  }
));
