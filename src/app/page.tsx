"use client";
import Image from "next/image";
import Navbar from "@/components/navbar";
import poster from "../../public/posterFilminhos.png";
import userDefault from "../../public/userDefault.jpg";
import noImage from "../../public/noImage.jpg";
import Footer from "@/components/footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Inter } from "next/font/google";
import {
  FacebookIcon,
  InstagramIcon,
  StarOutIcon,
  StartInIcon,
  XIcon,
} from "../../public/icons";
import { filme, review } from "@/types/filmes.interfaces";
import { useState } from "react";
import useFilmesAcao from "@/hooks/useFilmesAcao";
import useFilmesComedia from "@/hooks/useFilmesComedia";
import useReviews from "@/hooks/useReviews";
import Link from "next/link";
import useFilmesFeatured from "@/hooks/useFilmesFeature";

export function starMarked(target: number, count: number) {
  if (target >= count) {
    return <StartInIcon />;
  } else {
    return <StarOutIcon />;
  }
}

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const reviews = useReviews();
  const filmesComedia = useFilmesComedia();
  const filmesAcao = useFilmesAcao();
  const filmesFeatured = useFilmesFeatured();

  return (
    <>
      <Navbar />
      <div className={`${inter.className} flex flex-1 flex-col`}>
        <main className="flex-1">
          <section className=" bg-linear-to-b from-[#A3D7EB] to-[#FFFFFF]">
            <Carousel opts={{ loop: true, align: "center" }} className="w-full">
              <CarouselContent className="-ml-9">
                {filmesFeatured.map((filme) => (
                  <CarouselItem className="basis-3/4 pl-9" key={filme.id}>
                  <Link href={`/movies/${filme.id}`}>
                    <Image
                      className="h-147.75 w-full object-cover overflow-hidden"
                      src={filme.bannerImageUrl || noImage}
                      alt="poster"
                    ></Image>
                  </Link>
                  </CarouselItem>
                  
                ))}
              </CarouselContent>
            </Carousel>
          </section>
          <section className="mt-24.75 bg-linear-to-b from-white to-[#818D9180]">
            <p className="font-semibold text-2xl border-b-8 border-[#7189A7] w-61.75 rounded-b-md ml-13.75">
              Ação
            </p>
            <Carousel className="w-80%" opts={{ loop: true, align: "start" }}>
              <CarouselContent className="px-[157.5px] py-[54.28px] -ml-1">
                {filmesAcao.map((filme) => (
                  <CarouselItem className="basis-1/6 pl-1" key={filme.id}>
                    <div className="relative w-50.25 h-79.5 overflow-hidden">
                      <Link href={`/movies/${filme.id}`}>
                        <Image
                          src={filme.posterImageUrl || noImage}
                          alt="poster"
                          fill
                          className="object-cover"
                          priority
                        ></Image>
                      </Link>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </section>
          <section className="pt-24.75 bg-linear-to-b from-[#818D9180] to-[#DCF0F7]">
            <p className="font-semibold text-2xl border-b-8 border-[#7189A7] w-61.75 rounded-b-md ml-13.75">
              Comédia
            </p>
            <Carousel className="w-80%" opts={{ loop: true, align: "start" }}>
              <CarouselContent className="px-[157.5px] py-[54.28px] -ml-1">
                {filmesComedia.map((filme) => (
                  <CarouselItem className="basis-1/6 pl-1" key={filme.id}>
                    <div className="relative w-50.25 h-79.5 overflow-hidden">
                      <Link href={`/movies/${filme.id}`}>
                        <Image
                          src={filme.posterImageUrl || noImage}
                          alt="poster"
                          fill
                          className="object-cover"
                          priority
                        ></Image>
                      </Link>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </section>
          <section className="items-center text-center justify-center bg-[#DCF0F7] pb-14.75">
            <h1 className="bg-linear-to-r from-[#000000] to-[#1B559D] bg-clip-text text-transparent text-5xl font-semibold">
              Reviews
            </h1>
            {reviews.map((review) => (
              <div
                className="bg-white mx-25 mt-13.75 rounded-xl drop-shadow-2xl"
                key={review.id}
              >
                <div className="flex flex-row items-start p-8">
                  <Image
                    src={review.movie.posterImageUrl || poster}
                    alt="poster"
                    className=" w-46 h-61.25 object-cover"
                  ></Image>
                  <div className="flex flex-col ml-6 gap-6">
                    <div className="flex flex-row items-center gap-6 justify-center ">
                      <p className="font-bold text-3xl">{review.movie.title}</p>
                      <p className="font-normal">{review.movie.releaseYear}</p>
                      <div className="flex flex-row ">
                        {starMarked(review.rating, 1)}
                        {starMarked(review.rating, 2)}
                        {starMarked(review.rating, 3)}
                        {starMarked(review.rating, 4)}
                        {starMarked(review.rating, 5)}
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-start">
                      <Image
                        src={review.user.avatarUrl || userDefault}
                        alt="poster"
                        className="w-20 h-20 rounded-[100%] object-cover"
                      ></Image>
                      <p className="ml-4 font-semibold">
                        {review.user.fullName}
                      </p>
                    </div>
                    <div className="flex flex-row justify-start">
                      <p className="font-semibold">{review.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
