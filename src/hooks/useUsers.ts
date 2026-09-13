"use client";
import api from "@/services/api";
import type { User } from "@/types/user.interface";
import { ParamValue } from "next/dist/server/request/params";
import { useQuery } from "@tanstack/react-query";

export default function useUsers(id: ParamValue) {
  const userId = parseInt(id as string, 10);

  return useQuery({
    queryKey: ["users", userId],
    queryFn: async () => {
      const response = await api.get(`/users/${userId}`);
      return response.data.data as User;
    },
    enabled: !!id,
  });
}
