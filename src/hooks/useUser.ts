"use client";
import api from "@/services/api";
import { User } from "@/types/user.interface";
import { useQuery } from "@tanstack/react-query";

export default function useUser() {
  return useQuery({
    queryKey: ["account", "profile"],
    queryFn: async () => {
      const response = await api.get("/account/profile");
      return response.data.data as User;
    },
  });
}
