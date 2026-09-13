"use client";
import api from "@/services/api";
import { filme } from "@/types/filmes.interfaces";
import { useQuery } from "@tanstack/react-query";

export default function useFilmesFeatured() {
  return useQuery({
    queryKey: ["movies", "featured"],
    queryFn: async () => {
      const response = await api.get("/movies/featured");
      const filmes = response.data.data as filme[];
      return filmes.slice(0, 5);
    },
  });
}
