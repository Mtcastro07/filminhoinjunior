import api from "@/services/api";
import type { User } from "@/types/user.interface";
import { ParamValue } from "next/dist/server/request/params";
import { use, useEffect, useState } from "react";

export default function useUsers(id: ParamValue){
    const [user, setUser] = useState<User | null>(null);
    const userId = parseInt(id as string, 10);

    useEffect(()=>{
        async function carregarUser(){
            try{
                const response = await api.get(`/users/${userId}`)
                setUser(response.data.data)
            }catch(error){
                console.error("Erro ao carregar o usuário:", error);
            }
        }
        carregarUser()
    },[id])
    return user
}