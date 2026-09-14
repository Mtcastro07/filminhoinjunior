'use client'

import api from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useDesassistidos(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (filmId: number) => api.delete(`/account/watched/${filmId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["watched"] });
        }
    })

}