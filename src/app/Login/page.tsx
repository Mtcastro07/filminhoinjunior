"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { loginForm } from "@/schemas/loginSchema";
import { loginSchema } from "@/schemas/loginSchema";
import { ShowIcon } from "../../../public/icons";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
	const [enviando, SetEnviando] = useState<boolean>(false);
	const [error, SetError] = useState<boolean>(false);
	const [mantenhaConectado, setMantenhaConectado] = useState<boolean>(true);
	const router = useRouter();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<loginForm>({
		resolver: zodResolver(loginSchema),
	});

	async function onSubmit(data: loginForm) {
		SetEnviando(true);
		SetError(false);

		const response = await signIn("credentials", {
			email: data.email,
			password: data.senha,
			redirect: false,
		});
		SetEnviando(false);
		if (response?.error) {
			SetError(true);
			return;
		}

		reset();
		router.push("/");
	}

	const title = "Film{IN}nhos";
	const [mostrar, SetMostrar] = useState<boolean>(false);

	return (
	
			<div className={inter.className}>
				<main className="bg-linear-to-b from-[#A3D7EB] to-[#FFFFFF] h-dvh ">
					<div className="flex flex-col items-center justify-center h-full w-full">
						<h1 className="text-6xl font-extrabold mb-5 bg-radial from-[#7189A7] via-[#00459A] to-[#7189A7] bg-clip-text text-transparent">
							{title}
						</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="shadow-2xl rounded-xl min-h-120.5 min-w-114.25 pl-11 pb-13.5 pr-11 pt-13.5 bg-white items-center justify-center"
						>
							<FieldGroup>
								<FieldSet className="items-center text-center justify-center">
									<FieldLegend className="text-5xl! mb-5 font-semibold text-center w-full">
										Login
									</FieldLegend>
									<FieldDescription className="font-semibold text-black">
										Não possui uma conta?
										<Link
											className="ml-2 no-underline! text-[#007BFE]"
											href="/Cadastro"
										>
											Cadastre-se
										</Link>
									</FieldDescription>
								</FieldSet>
								<FieldGroup>
									<Field>
										<FieldLabel className="text-[Grey]">Email</FieldLabel>
										<Input
											className="bg-white"
											type="email"
											{...register("email")}
										></Input>
										{errors.email && (
											<p className="text-red-600 text-sm">
												{errors.email.message}
											</p>
										)}
									</Field>
									<Field>
										<FieldLabel className="text-[Grey]">Senha</FieldLabel>
										<div className=" flex relative">
											<Input
												className="bg-white"
												type={mostrar === true ? "text" : "password"}
												{...register("senha")}
											></Input>
											<button
												type="button"
												className="absolute right-3 top-2 cursor-pointer bg-transparent border-none p-0"
												onClick={() => SetMostrar(!mostrar)}
											>
												<ShowIcon />
											</button>
										</div>
										{errors.senha && (
											<p className="text-red-600 text-sm">
												{errors.senha.message}
											</p>
										)}
									</Field>
									<Field className="flex flex-row items-center">
										<div className="flex items-center justify-center gap-1.25 mr-10">
											<Checkbox
												id="mantenha-conectado"
												checked={mantenhaConectado}
												onCheckedChange={(checked) =>
													setMantenhaConectado(!!checked)
												}
												className="bg-white cursor-pointer border border-[#6C7278]"
											/>
											<FieldLabel
												htmlFor="mantenha-conectado"
												className="font-medium text-xs text-[#6C7278] cursor-pointer"
											>
												Mantenha-me conectado
											</FieldLabel>
										</div>
										<div>
											<FieldLabel className="ml-auto text-xs text-[#4D81E7]">
												Esqueceu a senha?
											</FieldLabel>
										</div>
									</Field>
								</FieldGroup>
								{error && (
									<p className="text-red-600">
										Sua senha ou e-email estão incorretos
									</p>
								)}
								<Button
									type="submit"
									disabled={enviando}
									className="cursor-pointer h-12 bg-[#1B559D] hover:bg-[#083a78]! disabled:cursor-not-allowed disabled:opacity-60"
								>
									{enviando === false ? "Log In" : "Carregando..."}
								</Button>
							</FieldGroup>
						</form>
					</div>
				</main>
			</div>
	
	);
}
