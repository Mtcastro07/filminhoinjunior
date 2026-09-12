import z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Digite um e-mail válido"),
  senha: z.string().min(1, "Digite sua senha"),
});

export type loginForm = z.infer<typeof loginSchema>;