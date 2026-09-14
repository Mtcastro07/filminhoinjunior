'use client'

import api from "@/services/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useApagarReview(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (movieId: number) => api.delete(`/reviews/${movieId}`),        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] })
        }
    })
}