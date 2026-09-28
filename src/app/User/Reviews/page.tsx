"use client";
import Navbar from "@/components/navbar";
import { starMarked } from "@/app/page";
import noImage from "../../../../public/noImage.jpg";
import Image from "next/image";
import { EditIcon, DeleteIcon } from "../../../../public/icons";
import { useState } from "react";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FieldGroup, Field } from "@/components/ui/field";
import useReview from "@/hooks/useReview";
import useApagarReview from "@/hooks/useApagarReview";
import useEditarReview from "@/hooks/useEditarReview";

const inter = Inter({ subsets: ["latin"] });

export default function Reviews() {
  const [editar, setEditar] = useState<boolean>(false);
  const [apagar, setApagar] = useState<boolean>(false);
  const [nota, setNota] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const { data: reviews } = useReview();
  const apagarReview = useApagarReview();
  const editarReview = useEditarReview();

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-linear-to-b from-[#A3D7EB] to-[#FFFFFF]">
        <div className={inter.className}>
          <h1 className="ml-25 pt-21 -mb-4 font-medium text-5xl">
            Minhas Avaliações
          </h1>
          <div>
            <div className="bg-white mx-25 mt-13.75 rounded-xl drop-shadow-2xl ">
              {reviews?.map((filme) => (
                <div
                  className="flex flex-row items-start p-8 w-full"
                  key={filme.id}
                >
                  <Image
                    src={filme.movie.posterImageUrl || noImage}
                    alt="poster"
                    className=" w-46 h-61.25 object-cover"
                    width={1080}
                    height={1920}
                  ></Image>
                  <div className="flex-1 flex-col ml-6 gap-6">
                    <div className="flex flex-1 flex-row justify-between">
                      <div className="flex flex-row items-center gap-6  ">
                        <p className="font-bold text-3xl">
                          {filme.movie.title}
                        </p>
                        <p className="font-normal text-xl">
                          {filme.movie.releaseYear}
                        </p>
                        <div className="flex flex-row ">
                          {starMarked(filme.rating, 1)}
                          {starMarked(filme.rating, 2)}
                          {starMarked(filme.rating, 3)}
                          {starMarked(filme.rating, 4)}
                          {starMarked(filme.rating, 5)}
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-center gap-4.75">
                        <button
                          type="button"
                          className="cursor-pointer bg-transparent border-none p-0"
                          onClick={() => setEditar(!editar)}
                        >
                          <EditIcon />
                        </button>
                        <button
                          type="button"
                          className="cursor-pointer bg-transparent border-none p-0"
                          onClick={() => setApagar(!apagar)}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-row justify-start">
                      <p className="font-semibold pt-6">{filme.text}</p>
                    </div>
                  </div>
                  {editar && (
                    <Dialog open={editar} onOpenChange={setEditar}>
                      <DialogContent className="bg-linear-to-b from-[#A3D7EB] to=white rounded-3!">
                        <div className={inter.className}>
                          <DialogHeader className="flex flex-row my-10 gap">
                            <p className="text-xl">
                              Editar Review:
                              <span className="text-[#085C06]">
                                {" "}
                                {filme.movie.title}
                              </span>
                            </p>
                          </DialogHeader>
                          <FieldGroup>
                            <div className="flex flex-row items-center">
                              <button
                                type="button"
                                className="cursor-pointer bg-transparent border-none p-0"
                                onClick={() => setNota(1)}
                              >
                                {starMarked(nota, 1)}
                              </button>
                              <button
                                type="button"
                                className="cursor-pointer bg-transparent border-none p-0"
                                onClick={() => setNota(2)}
                              >
                                {starMarked(nota, 2)}
                              </button>
                              <button
                                type="button"
                                className="cursor-pointer bg-transparent border-none p-0"
                                onClick={() => setNota(3)}
                              >
                                {starMarked(nota, 3)}
                              </button>
                              <button
                                type="button"
                                className="cursor-pointer bg-transparent border-none p-0"
                                onClick={() => setNota(4)}
                              >
                                {starMarked(nota, 4)}
                              </button>
                              <button
                                type="button"
                                className="cursor-pointer bg-transparent border-none p-0"
                                onClick={() => setNota(5)}
                              >
                                {starMarked(nota, 5)}
                              </button>
                            </div>
                          </FieldGroup>
                          <FieldGroup>
                            <Field className={inter.className}>
                              <Textarea
                                placeholder="Escrever avaliação..."
                                className="border! border-black h-25 bg-white my-6"
                                onChange={(e) => setText(e.target.value)}
                              ></Textarea>
                            </Field>
                          </FieldGroup>
                          <DialogFooter className={inter.className}>
                            <Button
                              type="submit"
                              onClick={() => {editarReview.mutate({
                                movieId: filme.id,
                                rating: nota,
                                text: text
                              }),
                                setEditar(false)
                            }
                            }
                              className="font-bold rounded-4xl text-xs bg-[#1419AE] cursor-pointer"
                            >
                              Concluir
                            </Button>
                          </DialogFooter>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                  {apagar && (
                    <Dialog open={apagar} onOpenChange={setApagar}>
                      <DialogContent className=" flex flex-col bg-linear-to-b from-[#A3D7EB] to=white rounded-3! w-auto ">
                        <div className={inter.className}>
                          <DialogHeader className="flex flex-col text-center font-bold text-2xl p-5">
                            Deseja apagar essa avaliação? Esta ação é
                            <span className="text-[#EF2027]">
                              irreversível!
                            </span>
                          </DialogHeader>
                          <DialogFooter className={inter.className}>
                            <div className="flex gap-3 items-center justify-center w-full">
                              <Button
                                type="submit"
                                onClick={() => setApagar(false)}
                                className="font-bold rounded-4xl text-xs bg-[#EF2027] cursor-pointer"
                              >
                                Cancelar
                              </Button>
                              <Button
                                type="submit"
                                onClick={() => apagarReview.mutate(filme.id)}
                                className="font-bold rounded-4xl text-xs bg-[#1419AE] cursor-pointer"
                              >
                                Apagar Avaliação
                              </Button>
                            </div>
                          </DialogFooter>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
