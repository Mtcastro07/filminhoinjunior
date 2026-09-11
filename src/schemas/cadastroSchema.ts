import z from "zod"

export const cadastroSchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    senha:  z.string().min(6),
    senhaConfirmation: z.string().min(6),
}).refine((data) => data.senha === data.senhaConfirmation, {
    message: "As senhas não concidem",
    path: ["senhaConfirm"]
})

export type cadastroForm = z.infer<typeof cadastroSchema>