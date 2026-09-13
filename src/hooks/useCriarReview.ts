'use client'

import api from "@/services/api";
import { ParamValue } from "next/dist/server/request/params";
import { useEffect } from "react";

export default function useCriarReview(id: ParamValue, rating: number, texto: string){
    const filmId = parseInt(id as string, 10);
     useEffect(()=> {
        async function criarReview(){
            try{
                const response = await api.post(`/reviews/`, {
                    movieId: filmId,
                    rating: rating,
                    text: texto
                });
            } catch (error) {
                console.error("Erro ao criar a review do usuário:", error);
            }
        }
     }, [filmId, rating, texto])
     
}