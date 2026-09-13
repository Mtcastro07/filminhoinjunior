"use client";
import api from "@/services/api";
import { filme } from "@/types/filmes.interfaces";
import { useQuery } from "@tanstack/react-query";

export default function useFavoritos() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const response = await api.get("/account/favorites");
      return response.data.data as filme[];
    },
  });
}
