import axios from "axios";
// import { useAuthStore } from "@/stores/authStore";
// TODO: Replace with getSession from next-auth/react (or next-auth on the server)

const api = axios.create({
  baseURL: "https://tarefaapi.onrender.com/api/v1",
});

api.interceptors.request.use((config) => {
  // const token = useAuthStore.getState().token;
  const token = null; // TODO: Get token from session

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;