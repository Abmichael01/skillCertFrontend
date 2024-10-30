"use client"

import React from "react";
import { useUserStore, useAuthStore } from "../_stores";

export const useAuthenticateUser = () => {
  const { setAuth, logout } = useAuthStore.getState();
  const {setUser, clearUser } = useUserStore.getState();

  const authenticateUser = async (data: {
    access: string;
    refresh: string;
  }) => {
    setAuth(data.access, data.refresh);
    setUser();
  };

  const logoutUser = () =>{
    logout()
    clearUser()
  }

  return { authenticateUser, logoutUser };
};


