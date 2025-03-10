"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination,Autoplay } from "swiper/modules";
import Image from "next/image";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils/utils";
import 'swiper/css/autoplay';

export default function MainSlider() {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        autoplay={{
          delay: 10000, 
          disableOnInteraction: false, 
        }}
        speed={1500}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mt-1"
      >
        <SwiperSlide className=" max-w-[90dvw]    quicksand ">
          <div className="bg-gray-100 h-[65svh] md:h-[75svh] grid grid-rows-10 m-auto md:grid-rows-1  md:grid-cols-10 overflow-hidden  ">
            <div className=" text-center m-auto md:text-left inset-0 p-5 row-span-5 md:col-span-4 flex items-center z-50">
              <div className=" p-5 w-fit rounded-xl">
                <h2 className="text-2xl mb-2 font-black ">
                  Amplio catalogo de colecciones
                </h2>
                <p className="  tracking-wider">
                  Los personajes que amas, siempre contigo
                </p>
                <Link
                  href="/cases"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "mt-2 text-primary bg-transparent font-semibold z-50"
                  )}
                >
                  Explorar
                </Link>
              </div>
            </div>
            <div className="bg-yellow-200 row-span-5 md:col-span-6 relative w-full h-full">
              <figure className=" absolute left-1/2 transform -translate-x-1/2  bottom-0  z-20">
                <div className="relative   w-[300px] h-[300px]">
                  <Image
                    fill
                    className=" object-contain"
                    alt="image-1"
                    src="https://pngfre.com/wp-content/uploads/anime-poster.png"
                  />
                </div>
              </figure>
              <figure className=" absolute bottom-0  left-[50%] transform -translate-x-[calc(50%+100px)] z-0">
                <div className="relative w-[200px] h-[200px] md:w-[400px] md:h-[400px]">
                  <Image
                    fill
                    className=" object-contain"
                    alt="image-2"
                    src="https://static.vecteezy.com/system/resources/previews/035/797/399/non_2x/ai-generated-male-anime-characters-transparent-background-free-png.png"
                  />
                </div>
              </figure>

              <figure className=" absolute -bottom-10 left-[50%] transform -translate-x-[calc(50%-110px)] z-10">
                <div className="relative w-[220px] h-[220px] md:w-[480px] md:h-[480px]">
                  <Image
                    fill
                    className=" object-contain"
                    alt="image-3"
                    src="https://preview.redd.it/guys-if-there-were-to-be-a-dragon-ball-xenoverse-3-what-v0-wiqv1pcs3ska1.png?width=640&crop=smart&auto=webp&s=2f9e528485f9a9ae65799f465110f7d3ba7ee858"
                  />
                </div>
              </figure>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="max-w-[90dvw] ">
          <div className="bg-gray-100  h-[65svh] md:h-[75svh]  grid  items-center grid-rows-2 md:flex gap-1 justify-center overflow-hidden">
            <div className="row-span-1 md:col-span-1">
              <figure className="relative  w-[80dvw] md:w-[360px]   h-[40dvh] md:h-[60dvh] m-auto">
                <Image
                  fill
                  className="object-cover rounded-xl"
                  alt="image-2"
                  src="https://www.belkin.com/on/demandware.static/-/Library-Sites-Belkin-Shared-Library/default/dwce587235/img/PDP/p-ova028/belkin-tempered-glass-treated-privacy-pdp-assets-2-mobile-768x800-us.gif"
                />
              </figure>
            </div>
            <div className="row-span-1 md:col-span-1 px-10 flex flex-col justify-center items-center text-center md:items-start md:text-left">
              <div>
                <h2 className=" text-2xl md:text-3xl mb-2 font-bold">
                  Protege tu pantalla al máximo
                </h2>
                <p className="font-light">
                  Variedad de protectores de pantalla perfectos para cada modelo
                  de teléfono{" "}
                </p>
              </div>
              <Link
                href="/cases"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "mt-2 text-primary z-20 w-fit"
                )}
              >
                Obten el tuyo ahora!
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="max-w-[90dvw] ">
          <div className="bg-gray-100 h-[65svh] md:h-[75svh]  grid place-items-center grid-rows-2 md:grid-rows-1 md:grid-cols-2">
            <div className="row-span-1 md:col-span-1 p-5 flex flex-col justify-center items-center text-center md:items-start md:text-left">
              <div>
                <h2 className="text-2xl md:text-3xl  mb-2 font-bold">
                  Amplio catalogo disponible
                </h2>
                <p className="font-light">
                  Protectores para casi todos los modelos de iphones.
                </p>
              </div>
              <Link
                href="/cases"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "mt-2 text-primary"
                )}
              >
                Ir a la tienda
              </Link>
            </div>
            <div className="row-span-1 md:col-span-1">
              <figure className="relative w-[80dvw] md:w-[360px]  h-[35dvh] md:h-[60dvh] m-auto">
                <Image
                  fill
                  className="object-cover rounded-md"
                  alt="image-2"
                  src="https://anime-case.com/cdn/shop/files/001_84c73150-69a1-4b0e-8cc0-dee89510bbbe.jpg?v=1727230991&width=533"
                />
              </figure>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
