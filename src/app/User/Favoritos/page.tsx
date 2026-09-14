'use client'
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { LupaIcon, FavoritadoIcon } from "../../../../public/icons";
import poster from "../../../../public/posterFilminhos.png";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import useFavoritos from "@/hooks/useFavoritos";
import useDesfavoritar from "@/hooks/useDesfavoritar";

const inter = Inter({ subsets: ["latin"] });

export default function Favoritos() {
  const { data: favoritos } = useFavoritos();
  const desfavoritar = useDesfavoritar();
  return (
    <>
      <Navbar />
      <main className={`${inter.className} flex flex-1 flex-col`}>
        <div className="flex-1 bg-linear-to-b from-[#A3D7EB] to-[#FFFFFF]">
          <h1 className="ml-25 pt-21 -mb-4 font-medium text-5xl">Assistidos</h1>
          <div className="flex w-full relative">
            <div className="absolute top-27 left-29">
              <LupaIcon />
            </div>
            <Input
              placeholder="Pesquisar..."
              className="pl-16 text-black flex bg-white mx-25 my-23.75 h-17.5 rounded-full! border-[#10840C]"
            ></Input>
          </div>
          <section className="relative mx-auto grid grid-cols-5 px-25 gap-8 py-[70px] w-[1440px] items-center justify-center">
            {favoritos?.map((filme) => (
              <div className="relative cursor-pointer">
                <div onClick={()=> desfavoritar.mutate(filme.id)} className="absolute z-50 cursor-pointer">
                  <FavoritadoIcon />
                </div>
                <Link href={`/movies/${filme.id}`}>
                <Image
                  className="w-[220px] h-[349px] object-cover"
                  src={filme.posterImageUrl}
                  width={1080}
                  height={1920}
                  alt="poster"
                ></Image>
                </Link>
              </div>
            ))}

           
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
