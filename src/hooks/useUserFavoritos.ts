'use client'

import api from "@/services/api";
import { filme } from "@/types/filmes.interfaces";
import { useQuery } from "@tanstack/react-query";
import { ParamValue } from "next/dist/server/request/params";

export default function useUserFavoritos(id: ParamValue){
    return useQuery({
        queryKey: ['userFavoritos'],
        queryFn: async () => {
            const response = await api.get(`/users/${id}/favorites`);
            return response.data.data as filme[];
        },
        enabled: !!id
    })
}