'use client'

import api from "@/services/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { editarReview } from "@/types/reviews.interfaces"

export default function useEditarReview(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ movieId, rating, text }: editarReview) => api.put(`/reviews/${movieId}`, { rating, text }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] })
        }
    })
}