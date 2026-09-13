"use client";
import api from "@/services/api";
import type { review } from "@/types/filmes.interfaces";
import { useQuery } from "@tanstack/react-query";

export default function useReviews() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const response = await api.get("/reviews");
      return response.data.data as review[];
    },
  });
}
