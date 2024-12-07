// "use client"

// import axios from "axios";
// import { useAuthStore } from "@/app/_stores";
// import { useRouter } from "next/navigation";

// const apiClient = axios.create({
//   baseURL: "https://skill-cert-backend.vercel.app/api",
// });

// apiClient.interceptors.request.use(
//   (config) => {
//   const {accessToken} = useAuthStore.getState()
//   if (accessToken) {
//     config.headers["Authorization"] = `JWT ${accessToken}`;
//   }
//   return config;
//   }
// );

// const saveTokens = (access: string, refresh: string) => {
//   useAuthStore.getState().setAuth(access, refresh);
// };

// const destroyTokens = () => {
//   useAuthStore.getState().logout();
// };

// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     console.log("error dey");
//     const originalRequest = error.config;
//     const router = useRouter()

//     if (error.response.status == 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const {refreshToken} = useAuthStore.getState()
//       if (refreshToken) {
//         try {
//           const { data } = await apiClient.post("/jwt/refresh/", {
//             refresh: refreshToken,
//           });
//           saveTokens(data.access, refreshToken);
//           console.log("access token was refreshed", data);
//           apiClient.defaults.headers.common[
//             "Authorization"
//           ] = `JWT ${data.access}`;
//           originalRequest.headers["Authorization"] = `JWT ${data.access}`;
//           return apiClient(originalRequest);
//         } catch (refreshError) {
//           destroyTokens();
//           router.push("/auth/login")
//         }
//       } else if (refreshToken === "undefined"){
//         destroyTokens();
//         router.push("/auth/login")
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiClient;

"use client";

import axios from "axios";
import { useAuthStore } from "@/app/_stores";

const apiClient = axios.create({
  baseURL: "https://skill-cert-backend.vercel.app/api",
});

apiClient.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers["Authorization"] = `JWT ${accessToken}`;
  }
  return config;
});

const saveTokens = (access: string, refresh: string) => {
  useAuthStore.getState().setAuth(access, refresh);
};

const destroyTokens = () => {
  const authStore = useAuthStore.getState();
  authStore.logout();
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { refreshToken } = useAuthStore.getState();

      if (refreshToken && refreshToken !== "undefined") {
        try {
          const { data } = await apiClient.post("/jwt/refresh/", {
            refresh: refreshToken,
          });
          saveTokens(data.access, refreshToken);
          originalRequest.headers["Authorization"] = `JWT ${data.access}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          destroyTokens();
        }
      } else {
        destroyTokens();
      }
    }
    return Promise.reject(error);
  }
);


export default apiClient;
