"use client"

import api from "@/services/api"
import type { review } from "@/types/filmes.interfaces"
import { useEffect, useState } from "react"

export default function useReviews(){
    const [reviews, setReviews] = useState<review[]>([])

    useEffect(()=>{
        async function carregarReview(){
            const response = await api.get("/reviews")
            setReviews(response.data)
        }
        carregarReview()
    },[])
    return reviews
}