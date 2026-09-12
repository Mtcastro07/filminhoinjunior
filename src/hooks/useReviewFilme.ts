'use client'
import api from "@/services/api";
import { review } from "@/types/filmes.interfaces";
import { ParamValue } from "next/dist/server/request/params";
import { useEffect, useState } from "react";
import { int } from "zod";

export default function useReviewFilme(id: ParamValue){
    const [reviewFilme, setReviewFilme] = useState<review[]>([])

    useEffect(()=>{
        async function carregarReviewFilme(){
            try{
                const response = await api.get('/reviews')
                const carregarReview = response.data.data
                const filmeId = parseInt(id as string)
                const reviewsFilme = carregarReview.filter((review: review) => review.movie.id === filmeId)
                setReviewFilme(reviewsFilme)
            }catch(Error){
                console.log("Erro ao carregar reviews do filme: ", Error)
            }
        }
        carregarReviewFilme()
    },[id])
    return reviewFilme

}