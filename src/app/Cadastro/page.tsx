"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { cadastroForm } from "@/schemas/cadastroSchema";
import { cadastroSchema } from "@/schemas/cadastroSchema";
import api from "@/services/api";
import { ShowIcon } from "../../../public/icons";

const inter = Inter({ subsets: ["latin"] });

export default function Cadastro() {
	const [error, setError] = useState<boolean>(false);
	const [enviando, setEnviando] = useState<boolean>(false);
	const [mostrar, SetMostrar] = useState<boolean>(false);
	const router = useRouter();
	const title = "Film{in}hos";

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<cadastroForm>({
		resolver: zodResolver(cadastroSchema),
	});

	const onSubmit = async (data: cadastroForm) => {
		setEnviando(true);
		setError(false);
		try {
			await api.post("/auth/signup", {
				fullName: data.nome,
				email: data.email,
				password: data.senha,
				passwordConfirmation: data.senhaConfirmation,
			});
			await signIn("credentials", {
				email: data.email,
				password: data.senha,
				passwordConfirmation: data.senhaConfirmation,
				redirect: false,
			});
			router.push("/Login");
		} catch (error) {
			console.log("Error na requisição de cadastro.");
			console.error("Erro na requisição de cadastro: ", error);
			setError(true);
		} finally {
			setEnviando(false);
			reset({
				nome: "",
				email: "",
				senha: "",
				senhaConfirmation: "",
			});
		}
	};

	return (
	
			<div className={inter.className}>
				<main className="bg-linear-to-b from-[#A3D7EB] to-[#FFFFFF] h-dvh ">
					<div className="flex flex-col items-center justify-center h-full w-full">
						<h1 className="text-6xl font-extrabold mb-5 bg-radial from-[#7189A7] via-[#00459A] to-[#7189A7] bg-clip-text text-transparent">
							{title}
						</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="shadow-2xl rounded-xl h-200.5 min-w-118.25 pl-11 pb-13.5 pr-11 pt-13.5 bg-white items-center justify-center"
						>
							<FieldGroup>
								<FieldSet className="items-center text-left justify-center">
									<FieldLegend className="text-5xl! mb-5 font-semibold text-center w-full">
										Cadastro
									</FieldLegend>
									<FieldDescription className="font-semibold text-black">
										Já possui uma conta?
										<Link
											className="ml-2 no-underline! text-[#007BFE]"
											href="/Login"
										>
											Login
										</Link>
									</FieldDescription>
								</FieldSet>
								<FieldGroup>
									<Field>
										<FieldLabel className="text-[Grey]">
											Nome completo
										</FieldLabel>
										<Input
											className="text-black"
                      type="text"
                    onChange={(e) => {setError(false); register("nome").onChange(e)}}
										></Input>
										{errors.nome && (
											<p className="text-red-600 text-sm">
												{errors.nome.message}
											</p>
										)}
									</Field>
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
										<FieldLabel className="text-[Grey]">
											Data de nascimento
										</FieldLabel>
										<Input type="date" />
									</Field>
									<Field>
										<FieldLabel className="text-[Grey]">
											Número de telefone
										</FieldLabel>
										<Input type="number" className="text-black" />
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
									<Field>
										<FieldLabel className="text-[Grey]">
											Confirmar senha
										</FieldLabel>
										<div className=" flex relative">
											<Input
												className="bg-white"
												type={mostrar === true ? "text" : "password"}
												{...register("senhaConfirmation")}
											></Input>
											<button
												type="button"
												className="absolute right-3 top-2 cursor-pointer bg-transparent border-none p-0"
												onClick={() => SetMostrar(!mostrar)}
											>
												<ShowIcon />
											</button>
										</div>
										{errors.senhaConfirmation && (
											<p className="text-red-600 text-sm">
												{errors.senhaConfirmation.message}
											</p>
										)}
									</Field>
								</FieldGroup>
								{error && (
									<p className="text-red-600">Usuario com email já existente</p>
								)}
								<Button
									type="submit"
									disabled={enviando}
									className="cursor-pointer h-12 bg-[#1B559D] hover:bg-[#083a78]! disabled:cursor-not-allowed disabled:opacity-60"
								>
									{enviando === false ? "Cadastre-se" : "Carregando..."}
								</Button>
							</FieldGroup>
						</form>
					</div>
				</main>
			</div>
	);
}
