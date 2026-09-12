import api from "@/services/api"
import { genero } from "@/types/filmes.interfaces"
import { useEffect, useState } from "react"

export default function useGeneros(){
    const [generos, setGeneros] = useState<genero[]>([])

    useEffect(()=>{
        async function carregarGeneros(){
            const response = await api.get("/genres")
            setGeneros(response.data.data)
        }
        carregarGeneros()
    },[])
    return generos
}