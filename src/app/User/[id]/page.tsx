"use client";
import { Inter } from "next/font/google";
import { starMarked } from "@/app/page";
import Navbar from "@/components/navbar";
import { useParams } from "next/navigation";
import poster from "../../../../public/posterFilminhos.png";
import Image from "next/image";
import noImage from "../../../../public/userDefault.jpg";
import noFilme from "../../../../public/noImage.jpg"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Footer from "@/components/footer";
import useUserReview from "@/hooks/useUserReview";
import useUsers from "@/hooks/useUsers";

const inter = Inter({ subsets: ["latin"] });

export default function User() {
  const params = useParams();
  const id = params.id;
  const { data: userReview = [] } = useUserReview(id);
  const { data: user } = useUsers(id);

  return (
    <>
      <Navbar />
      <main className={`${inter.className} flex flex-1 flex-col`}>
        <div className="flex-1 bg-linear-to-b from-[#A3D7EB] to-white">
          <section className="flex flex-col justify-center items-center gap-8">
            <Image
              className="object-cover w-75 h-75 rounded-[100%]"
              src={user?.avatarUrl || noImage}
              alt="poster"
            ></Image>
            <h1 className="font-bold text-5xl">{user?.fullName}</h1>
          </section>

          <section className="mt-24.75 bg-linear-to-b">
            <p className="font-semibold text-2xl border-b-8 border-[#7189A7] w-61.75 rounded-b-md ml-13.75">
              Favoritos
            </p>
            <Carousel className="w-80%" opts={{ loop: true, align: "start" }}>
              <CarouselContent className="px-[157.5px] py-[54.28px] -ml-5">
                <CarouselItem className="basis-1/8 pl-5">
                  <div className="relatiu)ve w-50.25 h-79.5 overflow-hidden">
                    <Image
                      src={poster}
                      alt="poster"
                      fill
                      className="object-cover"
                      priority
                    ></Image>
                  </div>
                </CarouselItem>
                <CarouselItem className="basis-1/8 pl-5">
                  <div className="relative w-50.25 h-79.5 overflow-hidden">
                    <Image
                      src={poster}
                      alt="poster"
                      fill
                      className="object-cover"
                      priority
                    ></Image>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </section>
          <section className="mt-24.75 bg-linear-to-b ">
            <p className="font-semibold text-2xl border-b-8 border-[#7189A7] w-61.75 rounded-b-md ml-13.75">
              Assistidos
            </p>
            <Carousel className="w-80%" opts={{ loop: true, align: "start" }}>
              <CarouselContent className="px-[157.5px] py-[54.28px] -ml-5">
                <CarouselItem className="basis-1/8 pl-5">
                  <div className="relative w-50.25 h-79.5 overflow-hidden">
                    <Image
                      src={poster}
                      alt="poster"
                      fill
                      className="object-cover"
                      priority
                    ></Image>
                  </div>
                </CarouselItem>
                <CarouselItem className="basis-1/8 pl-5">
                  <div className="relative w-50.25 h-79.5 overflow-hidden">
                    <Image
                      src={poster}
                      alt="poster"
                      fill
                      className="object-cover"
                      priority
                    ></Image>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </section>
          <section className="items-center text-center justify-center bg-[#DCF0F7] pb-14.75">
            <h1 className="bg-linear-to-r from-[#000000] to-[#1B559D] bg-clip-text text-transparent text-5xl font-semibold">
              Reviews
            </h1>
            {userReview.map((review) => (
              <div className="bg-white mx-25 mt-13.75 rounded-xl drop-shadow-2xl">
                <div className="flex flex-row items-start p-8">
                  <Image
                    src={review.movie.posterImageUrl || noFilme }
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
                    <div className="flex flex-row justify-start">
                      <p className="font-semibold">
                        {review.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
