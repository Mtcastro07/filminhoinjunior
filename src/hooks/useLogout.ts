import api from "@/services/api"
import { useAuthStore } from "@/stores/authStore"
import { useRouter } from "next/navigation"

export default function useLogout(){
    const logout = useAuthStore((state) => state.logout)
    const router = useRouter()

    async function fazerLogout(){
        try {
            await api.post("/account/logout")
        } catch (err) {
            console.error("Falha ao encerrar sessão no servidor", err)
        } finally {
            logout()
            router.push("/")
        }
    }

    return fazerLogout
}
