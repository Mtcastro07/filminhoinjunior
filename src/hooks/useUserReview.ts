'use client'
import api from "@/services/api";
import { review } from "@/types/filmes.interfaces";
import { ParamValue } from "next/dist/server/request/params";
import { useEffect, useEffectEvent, useState } from "react";

export default function useUserReview(id: ParamValue) {
    const [userReview, setUserReview] = useState<review[]>([]);
    const userId = parseInt(id as string, 10);

    useEffect(()=>{
        async function carregarUserReview(){
            try{
                const response = await api.get(`/reviews/`);
                const reviewsCarregados = response.data.data;
                const reviewsDoUsuario = reviewsCarregados.filter((review: review) => review.user.id === userId);
                setUserReview(reviewsDoUsuario);
            }catch(error){
                console.error("Erro ao carregar a review do usuário:", error);
            }
        }
        carregarUserReview()
    },[id])
    return userReview
}