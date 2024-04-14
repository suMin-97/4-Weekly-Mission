import axios from "axios";

export const publicAxios = axios.create({
  baseURL: "https://bootcamp-api.codeit.kr/api/",
});

export const privateAxios = axios.create({
  baseURL: "https://bootcamp-api.codeit.kr/api/",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

privateAxios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

privateAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      await publicAxios.post(
        "refresh-token",
        { refreshToken: `${window?.localStorage.getItem("refreshToken")}` },
        {
          _retry: true,
        }
      );
      originalRequest._retry = true;
      return privateAxios(originalRequest);
    }
    return Promise.reject(error);
  }
);
