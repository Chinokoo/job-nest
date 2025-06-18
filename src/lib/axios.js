import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_ENV === 'development' 
    ? import.meta.env.VITE_API_BASE_URL_DEV 
    : import.meta.env.VITE_API_BASE_URL_PROD,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Access-Control-Allow-Origin": import.meta.env.VITE_APP_ENV === 'development'
      ? import.meta.env.VITE_CORS_ORIGIN_DEV
      : import.meta.env.VITE_CORS_ORIGIN_PROD
  }
});
