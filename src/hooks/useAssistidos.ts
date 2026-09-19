'use client'

import api from "@/services/api";
import type { filme } from "@/types/filmes.interfaces";
import { useQuery } from "@tanstack/react-query";

export default function useAssistidos(){
    return useQuery({
        queryKey: ["watched"],
        queryFn: async ()=>{
            const response = await api.get("/account/watched");
            return response.data.data as filme[];
        }

    })
}