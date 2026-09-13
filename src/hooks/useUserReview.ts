"use client";
import api from "@/services/api";
import type { review } from "@/types/filmes.interfaces";
import { ParamValue } from "next/dist/server/request/params";
import { useQuery } from "@tanstack/react-query";

export default function useUserReview(id: ParamValue) {
  const userId = parseInt(id as string, 10);

  return useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const response = await api.get("/reviews");
      return response.data.data as review[];
    },
    select: (reviews) => reviews.filter((review) => review.user.id === userId),
    enabled: !!id,
  });
}
