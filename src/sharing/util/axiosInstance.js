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

const postRefreshToken = () => {
  const response = publicAxios.post(
    "refresh-token",
    {
      refresh_token: `${localStorage.getItem("refreshToken")}`,
    },
    { _retry: true }
  );

  return response;
};

privateAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      const newToken = await postRefreshToken();
      localStorage.setItem("accessToken", newToken?.data.data.accessToken);
      localStorage.setItem("refreshToken", newToken?.data.data.refreshToken);
      originalRequest._retry = true;
      return privateAxios(originalRequest);
    }
    return Promise.reject(error);
  }
);
