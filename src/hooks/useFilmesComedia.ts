"use client"
import api from "@/services/api";
import { filme } from "@/types/filmes.interfaces";
import { useEffect, useState } from "react";

export default function useFilmesComedia(){
    const [filmes, setFilmes] = useState<filme[]>([])

    useEffect(()=> {
        async function carregarFilmesComedia(){
            const response = await api.get("/movies")
            const carregarFilmes = response.data
            const carregarFilmesComedia = carregarFilmes.filter((filme:filme)=> {filme.genres.some((genero) => genero.name === "Comédia")})
            setFilmes(carregarFilmesComedia)
        }
        carregarFilmesComedia()
    },[])
    return filmes
}