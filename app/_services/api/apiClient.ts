import axios from "axios";
import { useAuthStore } from "@/app/_stores";

const apiClient = axios.create({
  baseURL: "https://skill-cert-backend.vercel.app/api",
});

apiClient.interceptors.request.use(
  (config) => {
  const {accessToken} = useAuthStore.getState()
  if (accessToken) {
    config.headers["Authorization"] = `JWT ${accessToken}`;
  }
  return config;
  }
);

const saveTokens = (access: string, refresh: string) => {
  useAuthStore.getState().setAuth(access, refresh);
};

const destroyTokens = () => {
  useAuthStore.getState().logout();
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("error dey");
    const originalRequest = error.config;

    if (error.response.status == 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const {refreshToken} = useAuthStore.getState()
      if (refreshToken) {
        try {
          const { data } = await apiClient.post("/jwt/refresh/", {
            refresh: refreshToken,
          });
          saveTokens(data.access, refreshToken);
          console.log("access token was refreshed", data);
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `JWT ${data.access}`;
          originalRequest.headers["Authorization"] = `JWT ${data.access}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          destroyTokens();
        }
      } else if (refreshToken === "undefined"){
        destroyTokens();
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
