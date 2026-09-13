"use client";
import api from "@/services/api";
import { genero } from "@/types/filmes.interfaces";
import { useQuery } from "@tanstack/react-query";

export default function useGeneros() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const response = await api.get("/genres");
      return response.data.data as genero[];
    },
  });
}
