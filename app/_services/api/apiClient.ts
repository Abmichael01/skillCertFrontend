// import axios from "axios";
// import { useAuthStore } from "@/app/_stores"

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
//     const originalRequest = error.config

//     if (error.response.status == 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const {refreshToken, isAuthenticated} = useAuthStore.getState()
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
//         } catch (err) {
//           destroyTokens();
//           console.log(err)
//         }
//       } else if (refreshToken === "undefined"){
//         destroyTokens();
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiClient;



import axios from "axios";
import { useAuthStore } from "@/app/_stores";

const apiClient = axios.create({
  baseURL: "https://skill-cert-backend.vercel.app/api",
  // baseURL: "http://127.0.0.1:8000/api"
});

// Add request interceptor to attach Authorization header
apiClient.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers["Authorization"] = `JWT ${accessToken}`;
  }
  return config;
});

// Utility to save tokens
const saveTokens = (access: string, refresh: string) => {
  useAuthStore.getState().setAuth(access, refresh);
};


// Add response interceptor to handle 401 errors
apiClient.interceptors.response.use(
  (response) => response, // Return response if no errors
  async (error) => {
    console.error("Error during Axios response handling:", error);

    if (!error.response) {
      return Promise.reject(error); // Handle network errors gracefully
    }

    const originalRequest = error.config as any; // Explicitly cast to avoid type issues

    // Handle 401 Unauthorized errors
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark request as retried
      const { refreshToken, logout } = useAuthStore.getState();

      if (refreshToken) {
        try {
          console.log("Refreshing token...")
          // Attempt to refresh the access token
          const { data } = await apiClient.post("/jwt/refresh/", { refresh: refreshToken });
          saveTokens(data.access, refreshToken); // Save new tokens
          originalRequest.headers["Authorization"] = `JWT ${data.access}`; // Update request headers
          return apiClient(originalRequest); // Retry the original request
        } catch (err) {
          console.error("Error refreshing token:", err);
          logout(); // Clear tokens if refresh fails
        }
      } else {
        logout(); // Clear tokens if refreshToken is invalid
      }
    }

    return Promise.reject(error); // Reject the promise if unhandled
  }
);

export default apiClient;
