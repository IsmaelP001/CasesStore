"use client";
import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import MainSlider from "./MainSlider";
import CollectionsSlider from "./CollectionsSlider";
import Phone from "../../app/(store)/_components/Phone";
import { Button } from "../ui/button";
import { FaArrowRight } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import FavoritesSlider from './FavoritesSlider'
export default function Home() {
  return (
    <div className="bg-slate-50 grainy-light space-y-16">
      <div className="relative">
        <MainSlider />
      </div>

      {/* value proposition section */}
      <section className="bg-slate-100 grainy-dark py-10">
        <MaxWidthWrapper className="">
          <CollectionsSlider />
        </MaxWidthWrapper>
      </section>

      <section>
        <MaxWidthWrapper className="">
          <div className="mb-6 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="order-1  tracking-tight text-center text-balance !leading-tight font-bold text-xl md:text-3xl text-gray-900">
                Sube to foto y crea tu{" "}
                <span className="relative px-2 bg-green-600 text-white">
                  propia funda
                </span>{" "}
                ahora
              </h2>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-6 lg:px-8 flex flex-col md:grid md:grid-cols-3 gap-5 md:gap-10">
            <div className=" col-span-2 flex items-center gap-5 md:gap-10 justify-center md:justify-end  ">
              <div className=" h-[250px] md:h-[320px] w-[200px]   rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 lg:rounded-2xl">
                <img
                  src="/horse.jpg"
                  className="rounded-md object-cover bg-white shadow-2xl ring-1 ring-gray-900/10 h-full w-full"
                />
              </div>

              <img src="/arrow.png" className="  " />

              <Phone className=" w-28 md:w-36" imgSrc="/horse_phone.jpg" />
            </div>

            <ul className="mx-auto   sm:text-lg space-y-4 w-fit  md:mt-8">
              <li className="w-fit text-sm font-semibold flex gap-1">
                <FaCheck className="text-xl text-green-600 fill-green-600"/>
                
                Materal de Silicona de alta calidad
              </li>
              <li className="w-fit text-sm font-semibold flex gap-1">
              <FaCheck className="text-xl text-green-600 fill-green-600"/>

                Laminado resistente a rallones y huellas dactilares
              </li>
              <li className="w-fit text-sm font-semibold flex gap-1">
              <FaCheck className="text-xl text-green-600 fill-green-600"/>
               
               Compatible con carga inalambrica
              </li>
              <li className="w-fit text-sm font-semibold flex gap-1">
              <FaCheck className="text-xl text-green-600 fill-green-600"/>
            
                Laminado con garantia
              </li>

              <div className="flex justify-center">
               <Button variant="outline" className="m-auto mt-2 md:mt-8 text-base flex gap-2" >
                <Link   href="/configure/preview" >
                  Crea tu propia funda Ahora{" "}
                </Link>
                <FaArrowRight className="text-xl" />
               </Button>
              </div>
            </ul>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="bg-slate-100 pt-5 pb-5 ">
        <MaxWidthWrapper>
            <FavoritesSlider />
            <Button size="sm" className="m-auto block rounded-3xl mt-2">
                <Link href={'/cases'} className="">
                Ver todos
                </Link>
            </Button>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
