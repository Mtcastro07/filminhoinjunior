"use client";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import type { filme, genero } from "@/types/filmes.interfaces";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import api from "@/services/api";
import poster from "../../../../public/posterFilminhos.png";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FavoriteIcon,
  StarNotMarket,
  StartInIcon,
  WatchedIcon,
} from "../../../../public/icons";
import { starMarked } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const inter = Inter({ subsets: ["latin"] });

function starMarkedFilm(target: number, count: number) {
  if (target >= count) {
    return <StartInIcon />;
  } else {
    return <StarNotMarket />;
  }
}

export default function Movie() {
  const [filme, setFilme] = useState<filme | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [nota, setNota] = useState<number>(0);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    async function carregarFilme() {
      const response = await api.get(`/movies/${id}`);
      return setFilme(response.data);
    }
    carregarFilme();
  }, [id]);

  return (
    <>
      <Navbar />
      <main className={inter.className}>
        <Image className="w-full" src={poster} alt="poster"></Image>
        <section>
          <div className="flex justify-between px-25 pt-9.25 pb-13.25 items-center">
            <h1 className="font-bold text-5xl">Nome do filme</h1>
            <div className="flex items-center justify-center gap-12">
              <FavoriteIcon />
              <WatchedIcon />
            </div>
          </div>
          <div className="flex justify-between px-25">
            <div>
              <div className="font-bold">
                <p>Ano: 2023</p>
                <p>Duracao: tempo</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <p>12</p>
                <p>Violencia</p>
              </div>
              <p className="w-150">
                Um cavaleiro fugitivo em busca de redenção. Uma comparsa jovem e
                rebelde que arrasa no combate. Juntos, eles vão botar para
                quebrar nesse reino.
              </p>
            </div>
            <div>
              <p>
                <span className="font-bold">Elenco:</span> Alguem, alguem
              </p>
              <p>
                <span className="font-bold">Gêneros:</span> filmes, filme
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-end mr-25 mt-17 mb-17">
            <div className="flex flex-col items-start">
              <div className="flex flex-row items-center">
                {starMarkedFilm(1, 5)}
                {starMarkedFilm(1, 5)}
                {starMarkedFilm(1, 5)}
                {starMarkedFilm(1, 5)}
                {starMarkedFilm(1, 5)}
              </div>
              <p className="font-normal text-xl">242342432 avaliacoes</p>
            </div>
            <p className="text-6xl pb-6 pl-8">4,5</p>
          </div>
          <div className="flex justify-end mr-25">
            <Button
              onClick={() => setModal(!modal)}
              className="px-12 py-[28.5px] font-semibold rounded-[1000px] text-xl bg-[#3539EF] cursor-pointer"
            >
              Criar uma review
            </Button>
          </div>
        </section>
        <section className="px-25 py-12.5">
          <h1 className="font-bold text-4xl mb-13.75">Reviews</h1>
          <div className="flex flex-col gap-13.75">
            <div className="p-8 flex flex-col shadow-[8px_8px_20px_rgba(0,0,0,0.5)] rounded-4xl">
              <div className="flex flex-row justify-between items-center">
                <div className="flex gap-4 items-center ">
                  <Image
                    className="w-20 h-20 rounded-[100%]"
                    src={poster}
                    alt="User"
                  ></Image>
                  <p className="font-bold text-xl">Alguem</p>
                </div>
                <div className="flex flex-row items-center">
                  {starMarked(1, 5)}
                  {starMarked(1, 5)}
                  {starMarked(1, 5)}
                  {starMarked(1, 5)}
                  {starMarked(1, 5)}
                </div>
              </div>
              <p className="mt-3 ">asfdasfasdfdasfdasfadsfasdf</p>
            </div>
            <div className="p-8 flex flex-col shadow-[8px_10px_20px_rgba(0,0,0,0.5)] rounded-4xl">
              <div className="flex flex-row justify-between items-center">
                <div className="flex gap-4 items-center ">
                  <Image
                    className="w-20 h-20 rounded-[100%]"
                    src={poster}
                    alt="User"
                  ></Image>
                  <p className="font-bold text-xl">Alguem</p>
                </div>
                <div className="flex flex-row items-center">
                  {starMarked(1, 5)}
                  {starMarked(1, 5)}
                  {starMarked(1, 5)}
                  {starMarked(1, 5)}
                  {starMarked(1, 5)}
                </div>
              </div>
              <p className="mt-3 ">asfdasfasdfdasfdasfadsfasdf</p>
            </div>
          </div>
        </section>
      </main>
      {modal && (
        <Dialog open={modal} onOpenChange={setModal}>
          <DialogContent className="sm:max-w-sm bg-linear-to-b from-[#A3D7EB] to-[#FFFFFF]">
            <DialogHeader className={inter.className}>
              <DialogTitle className="font-bold text-xl">
                Criar Review:
              </DialogTitle>
            </DialogHeader>
            <FieldGroup>
              <div className="flex flex-row items-center">
                <div className="cursor-pointer" onClick={() => setNota(1)}>
                  {starMarked(nota, 1)}
                </div>
                <div className="cursor-pointer" onClick={() => setNota(2)}>
                  {starMarked(nota, 2)}
                </div>
                <div className="cursor-pointer" onClick={() => setNota(3)}>
                  {starMarked(nota, 3)}
                </div>
                <div className="cursor-pointer" onClick={() => setNota(4)}>
                  {starMarked(nota, 4)}
                </div>
                <div className="cursor-pointer" onClick={() => setNota(5)}>
                  {starMarked(nota, 5)}
                </div>
              </div>
            </FieldGroup>
            <FieldGroup>
              <Field className={inter.className}>
                <Textarea
                  placeholder="Escrever avaliação..."
                  className="border! border-black h-25 bg-white"
                ></Textarea>
              </Field>
            </FieldGroup>
            <DialogFooter className={inter.className}>
              <Button
                type="submit"
                onClick={() => setModal(!modal)}
                className="font-bold rounded-4xl text-xs bg-[#1419AE] cursor-pointer"
              >
                Concluir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <Footer />
    </>
  );
}
