import api from "@/services/api";
import { filme } from "@/types/filmes.interfaces";
import { useEffect, useState } from "react";

export default function useFilme(){
    const [filmes, setFilmes] = useState<filme[]>([])

    useEffect(()=>{
        async function carregarFilmes(){
            const response = await api.get("/movies")
            setFilmes(response.data)
        }
        carregarFilmes()
    },[])
    return filmes
}