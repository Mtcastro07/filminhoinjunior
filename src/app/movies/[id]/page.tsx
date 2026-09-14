"use client";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
// import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
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
  AssistidoIcon,
  AssistidosIcon,
  FavoritadoIcon,
  FavoriteIcon,
  StarNotMarket,
  StartInIcon,
  WatchedIcon,
} from "../../../../public/icons";
import { starMarked } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import noImage from "../../../../public/noImage.jpg";
import useReviewFilme from "@/hooks/useReviewFilme";
import useCriarReview from "@/hooks/useCriarReview";
import useFilme from "@/hooks/useFilme";
import useFavoritos from "@/hooks/useFavoritos";
import { filme } from "@/types/filmes.interfaces";
import Link from "next/link";
import useDesfavoritar from "@/hooks/useDesfavoritar";
import useFavoritar from "@/hooks/useFavoritar";
import useAssistidos from "@/hooks/useAssistidos";
import useCriarAssistidos from "@/hooks/useCriarAssistidos";
import useDesassistidos from "@/hooks/useDesassistidos";
// TODO: Replace with useSession from next-auth/react

const inter = Inter({ subsets: ["latin"] });

function starMarkedFilm(target: number, count: number) {
  if (target >= count) {
    return <StartInIcon />;
  } else {
    return <StarNotMarket />;
  }
}

export default function Movie() {
  const [modal, setModal] = useState<boolean>(false);
  const [nota, setNota] = useState<number>(0);
  const [review, setReview] = useState<string>("")
  // const { token, user } = useAuthStore();
  const token = null; // TODO: get from session
  const user = null;  // TODO: get from session

  const [mounted, setMounted] = useState<boolean>(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useRouter()
  
  const estaLogado = mounted && !!token;

  const params = useParams();
  const id = params.id;
  const movieId = parseInt(id as string, 10)

  const { data: filme } = useFilme(id);
  const { data: reviewsFilme = [] } = useReviewFilme(id);
  const {data: favoritos = [] } = useFavoritos(); 
  const criarReview = useCriarReview();
  const desfavoritar = useDesfavoritar()
  const favortiar = useFavoritar()
  const {data: assistidos} = useAssistidos()
  const assistir = useCriarAssistidos()
  
  const desassistir = useDesassistidos()
  return (
    <>
      <Navbar />
      <main className={`${inter.className} flex flex-1 flex-col`}>
        <div className="relative w-full h-300">
          <Image
            src={filme?.bannerImageUrl || filme?.posterImageUrl || noImage}
            alt={filme?.title || "poster"}
            fill
            className="object-cover"
            priority
          />
        </div>
        <section>
          <div className="flex justify-between px-25 pt-9.25 pb-13.25 items-center">
            <h1 className="font-bold text-5xl">{filme?.title}</h1>
            <div className="flex items-center justify-center gap-12">
              {estaLogado ? 
              <div>
                {favoritos.some((favorito) => favorito.id === filme?.id) ? 
                 <div onClick={()=> desfavoritar.mutate(movieId)}>
               <FavoritadoIcon />
                </div>
                 : 
               <div onClick={()=> favortiar.mutate(movieId)}>
                <FavoriteIcon />
                </div>
                  }
              </div> 
              : 
              <Link href="/Login">
                <FavoriteIcon /> 
              </Link>
              }
              {estaLogado ? 
              <div>
                {assistidos?.some((assistido) => assistido.id === filme?.id) ?
                <div onClick={()=> desassistir.mutate(movieId)} className="block shrink-0 cursor-pointer" >
                  <AssistidoIcon />
                </div>
                  :
                  <div onClick={()=> assistir.mutate(movieId)} className="block shrink-0 cursor-pointer">
                     <AssistidosIcon /> 
                  </div>
                }
              </div>
              :
              <Link href="/Login">
                <WatchedIcon />
              </Link>
              }  
           </div>
          </div>
          <div className="flex justify-between px-25">
            <div>
              <div className="font-bold">
                <p>Ano: {filme?.releaseYear}</p>
                <p>Duracao: {filme?.durationMinute}</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <p>{filme?.ageRating}</p>
                <p>{filme?.contentWarning}</p>
              </div>
              <p className="w-150">{filme?.synopsis}</p>
            </div>
            <div>
              <p>
                <span className="font-bold">Elenco:</span> {filme?.cast}
              </p>
              <p>
                <span className="font-bold">Gêneros: </span>
                {filme?.genres?.map((e) => e.name + " ")}
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-end mr-25 mt-17 mb-17">
            <div className="flex flex-col items-start">
              <div className="flex flex-row items-center">
                {starMarkedFilm(filme?.avgRating || 0, 1)}
                {starMarkedFilm(filme?.avgRating || 0, 2)}
                {starMarkedFilm(filme?.avgRating || 0, 3)}
                {starMarkedFilm(filme?.avgRating || 0, 4)}
                {starMarkedFilm(filme?.avgRating || 0, 5)}
              </div>
              <p className="font-normal text-xl">
                {filme?.reviewCount} avaliacoes
              </p>
            </div>
            <p className="text-6xl pb-6 pl-8">{filme?.avgRating || 0}</p>
          </div>
          <div className="flex justify-end mr-25">
            {estaLogado ? <Button
              onClick={() => setModal(!modal)}
              className="px-12 py-[28.5px] font-semibold rounded-[1000px] text-xl bg-[#3539EF] cursor-pointer"
            >
              Criar uma review
            </Button> : <Button
              onClick={() => router.push("/Login")}
              className="px-12 py-[28.5px] font-semibold rounded-[1000px] text-xl bg-[#3539EF] cursor-pointer"
            >
              Criar uma review
            </Button>}
            
          </div>
        </section>
        <section className="px-25 py-12.5">
          <h1 className="font-bold text-4xl mb-13.75">Reviews</h1>
          <div className="flex flex-col gap-13.75">
            {reviewsFilme.map((review) => (
              <div className="p-8 flex flex-col shadow-[8px_8px_20px_rgba(0,0,0,0.5)] rounded-4xl">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex gap-4 items-center  ">
                    <Image
                      className="w-20 h-20 rounded-[100%] object-cover"
                      src={review.user.avatarUrl || noImage}
                      alt="poster image"
                      width={80}
                      height={80}
                    ></Image>
                    <p className="font-bold text-xl">{review.user.fullName}</p>
                  </div>
                  <div className="flex flex-row items-center">
                    {starMarked(review.rating, 1)}
                    {starMarked(review.rating, 2)}
                    {starMarked(review.rating, 3)}
                    {starMarked(review.rating, 4)}
                    {starMarked(review.rating, 5)}
                  </div>
                </div>
                <p className="mt-3 ">{review.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      {modal && (
        <Dialog open={modal} onOpenChange={setModal}>
          <DialogContent className="sm:max-w-sm bg-linear-to-b from-[#A3D7EB] to-[#FFFFFF]">
            <DialogHeader className={inter.className}>
              <DialogTitle className="font-bold text-xl pt-10">
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
                  onChange={(e) => setReview(e.target.value)}
                ></Textarea>
              </Field>
            </FieldGroup>
            <DialogFooter className={inter.className}>
              <Button
                type="submit"
                onClick={() => {
                  criarReview.mutate({
                    movieId: parseInt(id as string, 10),
                    rating: nota,
                    text: review,
                  });
                  setModal(false);
                  setReview("");
                }}
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
