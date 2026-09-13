"use client";
import api from "@/services/api";
import { filme } from "@/types/filmes.interfaces";
import { ParamValue } from "next/dist/server/request/params";
import { useQuery } from "@tanstack/react-query";

export default function useFilme(id: ParamValue) {
  return useQuery({
    queryKey: ["movies", id],
    queryFn: async () => {
      const response = await api.get(`/movies/${id}`);
      return response.data.data as filme;
    },
    enabled: !!id,
  });
}
