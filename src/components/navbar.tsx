"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import logo from "../../public/logoFIlminhos.png";
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

const inter = Inter({ subsets: ["latin"] });

export default function Navbar() {
  const [buscar, setBuscar] = useState<string>("");

  return (
    <html lang="pt-BR" className={"antialiased"}>
      <body>
        <div className={inter.className}>
          <div className="flex justify-between items-center pt-[15px] pb-[15px] pr-25 pl-25 bg-[#A3D7EB]">
            <Link href="/">
              <Image className="w" src={logo} alt="logo" />
            </Link>
            <div className="flex gap-5">
              <div className="relative flex">
                <Input
                  className="w-2xs h-16 rounded-[1000px] bg-[#FFFFFFA3] pl-4 text-black"
                  value={buscar}
                  onChange={(e) => setBuscar(e.target.value)}
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
                              <p className="ml-3 text-red-600">Sair</p>
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
              <Link href="/User" className="cursor-pointer">
                <UserIcon />
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
