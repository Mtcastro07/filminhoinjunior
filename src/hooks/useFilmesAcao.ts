'use client'
import api from "@/services/api"
import { filme } from "@/types/filmes.interfaces"
import { useEffect, useState } from "react"

export default function useFilmesAcao(){
    const [filmes, setFilmes] = useState<filme[]>([])

    useEffect(()=>{
        async function carregarFilmesAcao(){
            const response = await api.get("/movies")
            const filmes = response.data
            const filmesFiltrados = filmes.filter((filme: filme) => filme.genres.some((genero)=> genero.name === "Ação"))
            setFilmes(filmesFiltrados)
        }
        carregarFilmesAcao()
    },[])
    return filmes
}