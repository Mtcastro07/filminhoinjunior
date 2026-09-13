"use client";
import api from "@/services/api";
import { filme } from "@/types/filmes.interfaces";
import { useQuery } from "@tanstack/react-query";

export default function useFilmesAcao() {
  return useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const response = await api.get("/movies");
      return response.data.data as filme[];
    },
    select: (filmes) =>
      filmes.filter((filme) =>
        filme.genres.some((genero) => genero.name === "Ação"),
      ),
  });
}
