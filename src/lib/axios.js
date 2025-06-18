import axios from "axios";

const baseURL = import.meta.env.PROD
  ? "https://portifolio-backend-pppp.onrender.com/api"
  : "http://localhost:3001/api";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
