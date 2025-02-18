'use client'
import Slider, { SliderTitle } from "../Slider";
import SliderContent from "../Slider";
import { SwiperSlide } from "swiper/react";
import Product from "@/app/(store)/cases/_components/Product";
import { Button } from "../ui/button";
import Link from "next/link";


interface ProductsFavoritesProps{
  products:any[]
}

const ProductsFavorites = ({products}:ProductsFavoritesProps) => {

  return (
    <section className=" pt-5 pb-5 ">
      <SliderTitle className="bebas-neue tracking-wide text-3xl md:text-4xl text-center mb-5">
        <span className="text-accent">Favoritos</span> de nuestros clientes
      </SliderTitle>
      <Slider>
        <SliderContent>
          {products?.map((item: any) => {
            return (
              <SwiperSlide key={item?.id}>
                <Product product={item} />
              </SwiperSlide>
            );
          })}
        </SliderContent>
      </Slider>{" "}
      <Button size="sm" className="m-auto block rounded-3xl mt-2">
        <Link href={"/cases"} className="">
          Ver todos
        </Link>
      </Button>
    </section>
  );
};

export default ProductsFavorites;
