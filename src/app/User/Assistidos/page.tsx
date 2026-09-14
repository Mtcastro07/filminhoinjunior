'use client'
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { LupaIcon, RetirarIcon } from "../../../../public/icons";
import poster from "../../../../public/posterFilminhos.png";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import useAssistidos from "@/hooks/useAssistidos";
import useDesassistidos from "@/hooks/useDesassistidos";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Asistidos() {
  const { data: assistidos } = useAssistidos();
  const desassistir = useDesassistidos();
  
  return (
    <>
      <Navbar />
      <main className={inter.className}>
        <div className="bg-linear-to-b from-[#A3D7EB] to-[#FFFFFF] h-screen">
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
            {assistidos?.map((filme) => (
              <div className="relative" key={filme.id}>
                <div onClick={()=> desassistir.mutate(filme.id)} className="absolute cursor-pointer z-50">
                  <RetirarIcon />
                </div>
                <Link href={`/movies/${filme.id}`} className="block shrink-0 ">
                <Image
                  className="w-[220px] h-[349px] object-cover"
                  src={filme.posterImageUrl}
                  alt="poster"
                
                  width={1080}
                  height={1920}
                ></Image>
                </Link>
              </div>
            ))}

           
          </section>
        </div>
      </main>
    </>
  );
}
