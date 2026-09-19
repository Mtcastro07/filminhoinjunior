'use client'

import api from "@/services/api";
import { review } from "@/types/reviews.interfaces";
import { useQuery } from "@tanstack/react-query"

export default function useReview(){
    
    return useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const response = await api.get("/account/reviews");
            return response.data.data as review[];
        }
    })
}