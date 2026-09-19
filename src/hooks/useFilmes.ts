"use client";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import type { filme } from "@/types/filmes.interfaces";
import type { Paginacao } from "@/types/paginacao.interface";

export default function useFilmes(page: number, perPage: number) {
	return useQuery({
		queryKey: ["movies", page, perPage],
		queryFn: async () => {
			const response = await api.get("/movies", {
				params: {
					page,
					perPage,
				},
			});
			return response.data as Paginacao<filme>;
		},
	});
}
