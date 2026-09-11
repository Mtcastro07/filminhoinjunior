"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Inter } from "next/font/google";
import { LupaIcon, PlusBlackIcon, PlusIcon } from "../../../public/icons";
import { Button } from "@/components/ui/button";
import poster from "../../../public/posterFilminhos.png";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import type { filme } from "@/types/filmes.interfaces";
import useFilme from "@/hooks/useFilmes";

const inter = Inter({ subsets: ["latin"] });

export default function movies() {
  const [modal, setModal] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const termoInicial = searchParams.get("search") || "";
  const filmes = useFilme();
  const [busca, setBusca] = useState(termoInicial);
  const [generos, setGeneros] = useState<string[]>([]);

  useEffect(() => {
    setBusca(termoInicial);
  }, [termoInicial]);

  const filmesFiltrados = filmes.filter((filme) =>
    filme.title.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <>
      <Navbar />
      <div className={inter.className}>
        <main className="flex flex-col bg-linear-to-b from-[#A3D7EB] to-[#FFFFFF] h-dvh">
          <div className="flex w-full relative">
            <div className="absolute top-27 left-29">
              <LupaIcon />
            </div>
            <Input
              placeholder="Pesquisar..."
              className="pl-16 text-black flex bg-white mx-25 my-23.75 h-17.5 rounded-full! border-[#10840C]"
              onChange={(e) => setBusca(e.target.value)}
            ></Input>
          </div>
          <Button
            onClick={() => setModal(!modal)}
            className="w-50 h-16 rounded-[1000px] cursor-pointer bg-[#19AE14] ml-25"
          >
            <PlusIcon />
            <p className="ml-3 text-base">Adicionar Filtro</p>
          </Button>
          <section className="mx-auto grid grid-cols-5 px-25 gap-8 py-[70px] w-[1440px] items-center justify-center">
            <Image
              className="w-[220px] h-[349px] object-cover"
              src={poster}
              alt="poster"
            ></Image>
            <Image
              className="w-[220px] h-[349px] object-cover"
              src={poster}
              alt="poster"
            ></Image>
            <Image
              className="w-[220px] h-[349px] object-cover"
              src={poster}
              alt="poster"
            ></Image>
            <Image
              className="w-[220px] h-[349px] object-cover"
              src={poster}
              alt="poster"
            ></Image>
            <Image
              className="w-[220px] h-[349px] object-cover"
              src={poster}
              alt="poster"
            ></Image>
            <Image
              className="w-[220px] h-[349px] object-cover"
              src={poster}
              alt="poster"
            ></Image>
          </section>
        </main>
      </div>
      {modal && (
        <Dialog open={modal} onOpenChange={setModal}>
          <div className={inter.className}>
            <DialogContent className={inter.className}>
              <DialogHeader>
                <DialogTitle>Gênero:</DialogTitle>
              </DialogHeader>
              <FieldGroup>
                <div className="grid grid-rows-3 grid-cols-4">
                  <Button
                    type="submit"
                    className="cursor-pointer flex flex-row items-center justify-center bg-transparent border-[#10840C] hover:bg-[#00ca00] rounded-[1000px]"
                  >
                    <PlusBlackIcon />
                    <p className="font-bold text-black">Ação</p>
                  </Button>
                </div>
              </FieldGroup>
              <DialogFooter>
                <Button className="text-white bg-[#71090C] cursor-pointer rounded-[1000px]">
                  Apagar Todos os Filtros
                </Button>
                <DialogClose
                  render={
                    <Button
                      className="bg-[#1419AE] hover:bg-[#000058] text-white rounded-[1000px]! cursor-pointer"
                      variant="outline"
                    >
                      Concluir
                    </Button>
                  }
                />
              </DialogFooter>
            </DialogContent>
          </div>
        </Dialog>
      )}
    </>
  );
}
