"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Inter } from "next/font/google";
import {
  LupaIcon,
  MinusIcon,
  PlusBlackIcon,
  PlusIcon,
} from "../../../public/icons";
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
import noImage from "../../../public/noImage.jpg";
import useFilmes from "@/hooks/useFilmes";
import Link from "next/link";
import useGeneros from "@/hooks/useGeneros";
import { genero } from "@/types/filmes.interfaces";

const inter = Inter({ subsets: ["latin"] });

export default function movies() {
  const [generosSelecionados, setGenerosSelecionados] = useState<string[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const termoInicial = searchParams.get("search") || "";
  const filmes = useFilmes();
  const [busca, setBusca] = useState(termoInicial);
  const generos = useGeneros();

  function alternarGeneros(genero: string) {
    if (generosSelecionados.includes(genero)) {
      setGenerosSelecionados(
        generosSelecionados.filter((genre) => genre != genero),
      );
    } else {
      setGenerosSelecionados([...generosSelecionados, genero]);
    }
  }

  function limparGeneros() {
    setGenerosSelecionados([]);
  }

  useEffect(() => {
    setBusca(termoInicial);
  }, [termoInicial]);

  const filmesFiltrados = filmes.filter((filme) => {
    const filmePesquisa = filme.title
      .toLowerCase()
      .includes(busca.toLowerCase());
    const combinaGenero =
      generosSelecionados.length === 0 ||
      filme.genres.some((g) => generosSelecionados.includes(g.name));

    return filmePesquisa && combinaGenero;
  });

  return (
    <>
      <Navbar />
      <div className={`${inter.className} flex flex-1 flex-col`}>
        <main className="flex flex-1 flex-col bg-linear-to-b from-[#A3D7EB] to-[#FFFFFF]">
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
          <div className="grid grid-cols-8">
            <Button
              onClick={() => setModal(!modal)}
              className="w-50 h-16 rounded-[1000px] cursor-pointer bg-[#19AE14] ml-25"
            >
              <PlusIcon />
              <p className="ml-3 text-base">Adicionar Filtro</p>
            </Button>
            {generosSelecionados.map((genero) => (
              <Button 
              onClick={()=> alternarGeneros(genero)}
              className=" text-white cursor-pointer w-50 h-16 rounded-[1000px] cursor-pointer bg-[#19AE14] ml-25">
                <div className="flex flex-row  justify-center items-center">
                  <MinusIcon />
                  <p className="ml-3 text-lg">{genero}</p>
                </div>
              </Button>
            ))}
          </div>
          <section className="mx-auto grid grid-cols-5 px-25 gap-8 py-[70px] w-[1440px] items-center justify-center">
            {filmesFiltrados.map((filme) => (
              <Link href={`/movies/${filme.id}`} key={filme.id}>
                <Image
                  className="w-[220px] h-[349px] object-cover"
                  src={filme.posterImageUrl || noImage}
                  width={220}
                  height={349}
                  alt="poster"
                ></Image>
              </Link>
            ))}
          </section>
        </main>
      </div>
      {modal && (
        <Dialog open={modal} onOpenChange={setModal}>
          <div className={inter.className}>
            <DialogContent className={inter.className}>
              <DialogHeader>
                <DialogTitle className="mt-10 text-xl">Gênero:</DialogTitle>
              </DialogHeader>

              <FieldGroup>
                <div className="grid grid-rows-3 grid-cols-4 gap-2">
                  {generos.map((genero) => (
                    <Button
                      onClick={() => alternarGeneros(genero.name)}
                      type="submit"
                      className={
                        generosSelecionados.includes(genero.name)
                          ? "px-5 text-white cursor-pointer flex flex-row items-center justify-center bg-[#10840C] border-[#10840C] hover:bg-[#00ca00] rounded-[1000px]"
                          : "px-5 text-black cursor-pointer flex flex-row items-center justify-center bg-transparent border-[#10840C] hover:bg-[#b1b1b169] rounded-[1000px]"
                      }
                    >
                      {generosSelecionados.includes(genero.name) ? (
                        <MinusIcon />
                      ) : (
                        <PlusBlackIcon />
                      )}
                      <p className="font-bold">{genero.name}</p>
                    </Button>
                  ))}
                </div>
              </FieldGroup>
              <DialogFooter>
                <Button
                  onClick={() => limparGeneros()}
                  className="text-white bg-[#71090C] cursor-pointer rounded-[1000px]"
                >
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
      <Footer />
    </>
  );
}
