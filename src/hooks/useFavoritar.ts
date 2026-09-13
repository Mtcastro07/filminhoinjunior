"use client";

import api from "@/services/api";
import { ParamValue } from "next/dist/server/request/params";
import { useEffect } from "react";

export default function useFavoritar(id: ParamValue) {
  useEffect(() => {
    async function favoritarFilme() {
      try {
        const response = await api.post("/account/favorites", {
          movieId: parseInt(id as string, 10),
        });
      } catch (error) {
        console.error("Erro ao favoritar o filme:", error);
      }
    }
    favoritarFilme();
  }, [id]);
}
