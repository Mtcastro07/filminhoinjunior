import api from "@/services/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export default function useCriarAssistidos(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (movieId: number) =>
            api.post("/account/watched", {movieId}),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["watched"] }); 
        }
    })
}