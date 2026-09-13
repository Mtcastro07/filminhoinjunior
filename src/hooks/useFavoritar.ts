"use client";
import api from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useFavoritar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movieId: number) =>
      api.post("/account/favorites", { movieId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}
