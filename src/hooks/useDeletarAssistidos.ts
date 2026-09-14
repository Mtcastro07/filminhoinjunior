'use client'

import api from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDesassistidos(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (filmeId: number) => api.delete(`/account/watched/${filmeId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["watched"] });
        }
    })
}