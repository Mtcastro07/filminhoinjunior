"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import useLogout from "@/hooks/useLogout";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import logo from "../../public/logoFIlminhos.png";
import { useRouter } from "next/navigation";
import {
  AssistidosIcon,
  AvaliacaoIcon,
  LupaIcon,
  SairIcon,
  UserIcon,
} from "../../public/icons";
import { FavoritosIcon } from "../../public/icons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

const inter = Inter({ subsets: ["latin"] });

export default function Navbar() {
  const { token, user } = useAuthStore();
  const fazerLogout = useLogout();
  const [buscar, setBuscar] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const estaLogado = mounted && !!token;

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      router.push(`/movies?search=${encodeURIComponent(buscar.trim())}`);
    }
  }

  return (
    <div className={inter.className}>
      <div className="flex justify-between items-center pt-[15px] pb-[15px] pr-25 pl-25 bg-[#A3D7EB]">
        <Link href="/">
          <Image src={logo} alt="logo" />
        </Link>
        <div className="flex gap-5">
          <div className="relative flex">
            <Input
              className="w-2xs h-16 rounded-[1000px] bg-[#FFFFFFA3] pl-4 text-black"
              value={buscar}
              onChange={(e) => setBuscar(e.target.value)}
              onKeyDown={handleKeyDown}
            ></Input>
            {buscar == "" ? (
              <div className="absolute top-[11px] right-[28px]">
                <DropdownMenu>
                  <DropdownMenuTrigger className="cursor-pointer">
                    <LupaIcon />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup className="font-medium text-black">
                      <DropdownMenuLabel>
                        <Link href="/Favoritos">
                          <div className="flex justify-start items-center ">
                            <FavoritosIcon />
                            <p className="ml-3 text-black">Favoritos</p>
                          </div>
                        </Link>
                      </DropdownMenuLabel>
                      <DropdownMenuLabel>
                        <Link href="/Assistidos">
                          <div className="flex justify-start items-center ">
                            <AssistidosIcon />
                            <p className="ml-3 text-black">Assistidos</p>
                          </div>
                        </Link>
                      </DropdownMenuLabel>
                      <DropdownMenuLabel>
                        <Link href="/Avaliados">
                          <div className="flex justify-start items-center ">
                            <AvaliacaoIcon />
                            <p className="ml-3 text-black">Avaliações</p>
                          </div>
                        </Link>
                      </DropdownMenuLabel>
                      <DropdownMenuLabel>
                        <div className="flex justify-start items-center ">
                          <SairIcon />
                          {estaLogado ? (
                            <button
                              type="button"
                              onClick={fazerLogout}
                              className="ml-3 text-red-600 cursor-pointer bg-transparent"
                            >
                              Sair
                            </button>
                          ) : (
                            <Link className="ml-3 text-red-600" href="/Login">
                              Entrar
                            </Link>
                          )}
                        </div>
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              ""
            )}
          </div>

          {estaLogado && user ? (
            <Link href={`/User/Profile`} className="cursor-pointer">
              <UserIcon />
            </Link>
          ) : (
            <Link href="/Login">
              <Button className="text-2xl font-bold mt-1 ml-6 bg-blue-900 text-white p-7 cursor-pointer rounded-2xl">
                Entrar
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
