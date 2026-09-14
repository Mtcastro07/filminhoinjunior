'use client'

import api from "@/services/api";
import type { filme } from "@/types/filmes.interfaces";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function useAssistidos(){
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ["watched"],
        queryFn: async ()=>{
            const response = await api.get("/account/watched");
            return response.data.data as filme[];
        }

    })
}