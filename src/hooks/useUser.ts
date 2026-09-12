import api from "@/services/api";
import { User } from "@/types/user.interface";
import { useEffect, useState } from "react";


export default function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function carregarUser() {
      try {
        const response = await api.get(`/account/profile`);
        setUser(response.data.data);
      } catch (error) {
        console.error("Erro ao carregar o usuário:", error);
      }
    }
    carregarUser();
  }, []);
  return user;
}
