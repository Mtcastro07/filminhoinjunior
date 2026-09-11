import z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Digite um e-mail válido"),
  senha: z.string().min(6).regex(/[a-z]/).regex(/[A-Z]/),
});

export type loginForm = z.infer<typeof loginSchema>;