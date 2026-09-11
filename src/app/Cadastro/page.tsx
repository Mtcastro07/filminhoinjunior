"use client";

import api from "@/services/api";
import { cadastroSchema } from "@/schemas/cadastroSchema";
import type { cadastroForm } from "@/schemas/cadastroSchema";
import { useForm } from "react-hook-form";
import { Inter } from "next/font/google";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShowIcon } from "../../../public/icons";
import { zodResolver } from "@hookform/resolvers/zod";

const inter = Inter({ subsets: ["latin"] });

export default function Cadastro() {
  const [error, setError] = useState<boolean>(false);
  const [mostrar, SetMostrar] = useState<boolean>(false);

  const title = "Film{in}hos";

  const { register, handleSubmit, reset } = useForm<cadastroForm>({
    resolver: zodResolver(cadastroSchema),
  });

  async function onSubmit(data: cadastroForm) {
    try {
      const response = await api.post("/auth/signup", {
        fullName: data.nome,
        email: data.email,
        password: data.senha,
        passwordConfirmation: data.senhaConfirmation,
      });
    } catch (Error) {
      console.log("Erro na requisição de cadastro");
      console.error(Error);
      setError(!error);
    } finally {
    }
    reset();
  }

  return (
    <>
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
                      {...register("nome")}
                    ></Input>
                  </Field>
                  <Field>
                    <FieldLabel className="text-[Grey]">Email</FieldLabel>
                    <Input
                      className="bg-white"
                      type="text"
                      {...register("email")}
                    ></Input>
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
                        type={mostrar == true ? "text" : "password"}
                        {...register("senha")}
                      ></Input>
                      <div
                        className="absolute right-3 top-2 cursor-pointer"
                        onClick={() => SetMostrar(!mostrar)}
                      >
                        <ShowIcon />
                      </div>
                    </div>
                  </Field>
                  <Field>
                    <FieldLabel className="text-[Grey]">
                      Confirmar senha
                    </FieldLabel>
                    <div className=" flex relative">
                      <Input
                        className="bg-white"
                        type={mostrar == true ? "text" : "password"}
                        {...register("senhaConfirmation")}
                      ></Input>
                      <div
                        className="absolute right-3 top-2 cursor-pointer"
                        onClick={() => SetMostrar(!mostrar)}
                      >
                        <ShowIcon />
                      </div>
                    </div>
                  </Field>
                </FieldGroup>
                {error && (
                  <p className="text-red-600">Usuario com email já existente</p>
                )}
                <Button
                  type="submit"
                  className="cursor-pointer h-12 bg-[#1B559D] hover:bg-[#083a78]!"
                >
                  Cadastre-se
                </Button>
              </FieldGroup>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
