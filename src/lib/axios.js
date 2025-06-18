import axios from "axios";

const baseURL = import.meta.env.PROD
  ? "https://jobnest-backendd.onrender.com/api"
  : "http://localhost:3000/api";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
