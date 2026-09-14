"use client";
import api from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CriarReviewInput {
  movieId: number;
  rating: number;
  text: string;
}

export default function useCriarReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CriarReviewInput) => api.post("/reviews", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}
