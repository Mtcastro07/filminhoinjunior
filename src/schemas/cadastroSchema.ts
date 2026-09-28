import z from "zod"

export const cadastroSchema = z.object({
    nome: z.string().min(1, "Digite seu nome completo"),
    email: z.string().email("Digite um e-mail válido"),
    senha: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
    senhaConfirmation: z.string().min(1, "Confirme sua senha"),
}).refine((data) => data.senha === data.senhaConfirmation, {
    message: "As senhas não coincidem",
    path: ["senhaConfirmation"]
})

export type cadastroForm = z.infer<typeof cadastroSchema>