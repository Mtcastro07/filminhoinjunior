"use client";
import api from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDesfavoritar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movieId: number) =>
      api.delete(`/account/favorites/${movieId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}
