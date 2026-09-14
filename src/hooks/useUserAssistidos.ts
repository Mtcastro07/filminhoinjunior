'use client'

import api from "@/services/api"
import { filme } from "@/types/filmes.interfaces";
import { useQuery } from "@tanstack/react-query"
import { ParamValue } from "next/dist/server/request/params";

export default function useUserAssistidos(id: ParamValue){
    return useQuery({
        queryKey: ['userAssistidos'],
        queryFn: async () => {
            const response = await api.get(`/users/${id}/watched`);
            return response.data.data as filme[];
        },
        enabled: !!id
    })
}