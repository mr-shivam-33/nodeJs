import { ACCESS_TOKEN, BACKEND_BASE_URL } from "@pages/api";
import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-access-token": ACCESS_TOKEN,
  },
});

export const AxiosInstanceWithoutLoader = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-access-token": ACCESS_TOKEN,
  },
});

axios.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url);
    // const allowedOrigins = [process.env.basePath];
    // const access_token = Cookies.get("access_token");
    // if (allowedOrigins.includes(origin)) {
    //   config.headers.authorization = `Bearer ${access_token}`;
    // }

    document.body.classList.add("loading-indicator");
    return config;
  },
  (error) => {
    document.body.classList.remove("loading-indicator");
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response) => {
    document.body.classList.remove("loading-indicator");
    return response;
  },
  (error) => {
    document.body.classList.remove("loading-indicator");
    return Promise.reject(error);
  }
);
