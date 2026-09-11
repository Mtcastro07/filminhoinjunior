"use client";
import Navbar from "@/components/navbar";
import { starMarked } from "@/app/page";
import poster from "../../../../public/posterFilminhos.png";
import Image from "next/image";
import { EditIcon, DeleteIcon } from "../../../../public/icons";
import { useState } from "react";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FieldGroup, Field } from "@/components/ui/field";

const inter = Inter({ subsets: ["latin"] });

export default function Reviews() {
  const [editar, setEditar] = useState<boolean>(false);
  const [apagar, setApagar] = useState<boolean>(false);
  const [nota, setNota] = useState<number>(0);

  return (
    <>
      <Navbar />
      <main className="bg-linear-to-b from-[#A3D7EB] to-[#FFFFFF] h-screen">
        <div className={inter.className}>
          <h1 className="ml-25 pt-21 -mb-4 font-medium text-5xl">
            Minhas Avaliações
          </h1>
          <div>
            <div className="bg-white mx-25 mt-13.75 rounded-xl drop-shadow-2xl ">
              <div className="flex flex-row items-start p-8 w-full">
                <Image
                  src={poster}
                  alt="poster"
                  className=" w-46 h-61.25 object-cover"
                ></Image>
                <div className="flex-1 flex-col ml-6 gap-6">
                  <div className="flex flex-1 flex-row justify-between">
                    <div className="flex flex-row items-center gap-6  ">
                      <p className="font-bold text-3xl">Titulo</p>
                      <p className="font-normal text-xl">2012</p>
                      <div className="flex flex-row ">
                        {starMarked(1, 1)}
                        {starMarked(1, 2)}
                        {starMarked(1, 3)}
                        {starMarked(1, 4)}
                        {starMarked(1, 5)}
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-4.75">
                      <div
                        className="cursor-pointer"
                        onClick={() => setEditar(!editar)}
                      >
                        <EditIcon />
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => setApagar(!apagar)}
                      >
                        <DeleteIcon />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-start">
                    <p className="font-semibold pt-6">
                      aasdfafadsfasfadsfadsfdasf
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {editar && (
        <Dialog open={editar} onOpenChange={setEditar}>
          <DialogContent className="bg-linear-to-b from-[#A3D7EB] to=white rounded-3!">
            <DialogHeader className="flex flex-row">
              Editar Review: <span className="text-[#085C06]">Mostros</span>
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
                onClick={() => setEditar(!editar)}
                className="font-bold rounded-4xl text-xs bg-[#1419AE] cursor-pointer"
              >
                Concluir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {apagar && (
        <Dialog open={apagar} onOpenChange={setApagar}>
          <DialogContent className=" flex flex-col bg-linear-to-b from-[#A3D7EB] to=white rounded-3! w-auto ">
            <DialogHeader className="flex flex-col text-center font-bold text-2xl p-5">
              Deseja apagar essa avaliação? Esta ação é
              <span className="text-[#EF2027]">irreversível!</span>
            </DialogHeader>
            <DialogFooter className={inter.className}>
              <div className="flex gap-3 items-center justify-center w-full">
                <Button
                  type="submit"
                  onClick={() => setEditar(!editar)}
                  className="font-bold rounded-4xl text-xs bg-[#EF2027] cursor-pointer"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  onClick={() => setApagar(!apagar)}
                  className="font-bold rounded-4xl text-xs bg-[#1419AE] cursor-pointer"
                >
                  Apagar Avaliação
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
