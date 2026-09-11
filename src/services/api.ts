import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

const api = axios.create({
  baseURL: "https://tarefaapi.onrender.com/api/v1",
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;