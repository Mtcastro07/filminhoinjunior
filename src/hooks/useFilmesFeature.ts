'use client'

import api from "@/services/api"
import { filme } from "@/types/filmes.interfaces"
import { useEffect, useState } from "react"

export default function useFilmesFeatured(){
    const [filmes, setFilmes] = useState<filme[]>([])

    useEffect(()=>{
        async function carregarFilmes(){
            try {
                const response = await api.get("/movies/featured")
                const carregarFilmes = response.data.data
                const filmesFiltrados = carregarFilmes.splice(0, 5)
                setFilmes(filmesFiltrados)
            } catch(Error){
                console.log("Erro ao carregar filmes em destaque: ", Error)
            }
        }
        carregarFilmes()
    }, [])
    return filmes
}