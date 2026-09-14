"use client";
import api from "@/services/api";
import type { review } from "@/types/filmes.interfaces";
import { ParamValue } from "next/dist/server/request/params";
import { useQuery } from "@tanstack/react-query";

export default function useReviewFilme(id: ParamValue) {
  const filmeId = parseInt(id as string, 10);

  return useQuery({
    queryKey: ["reviews", filmeId],
    queryFn: async () => {
      const response = await api.get("/reviews",{
        params: {
          movieId: filmeId,
        }
      }
      );
      return response.data.data as review[];
    },
    select: (reviews) =>
      reviews.filter((review) => review.movie.id === filmeId),
    enabled: !!id,
  });
}
