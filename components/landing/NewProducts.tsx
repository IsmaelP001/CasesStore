'use client'
import Slider, { SliderTitle } from "../Slider";
import SliderContent from "../Slider";
import { SwiperSlide } from "swiper/react";
import Product from "@/app/(store)/cases/_components/Product";
import { serverHelpers } from "@/lib/trpc/serverHelper";


interface NewProductsProps{
  products:any[]
}
const NewProducts = ({products}:NewProductsProps) => {

  return (
    <section className=" pt-5 pb-5 ">
      <SliderTitle className="bebas-neue tracking-wide  text-3xl md:text-4xl text-center mb-5">
        <span className="text-accent">Nuevos</span> diseños
      </SliderTitle>
      <Slider>
        <SliderContent>
          {products?.map((item: any) => {
            return (
              <SwiperSlide key={item?.id}>
                <Product product={item} isNewProduct={true}/>
              </SwiperSlide>
            );
          })}
        </SliderContent>
      </Slider>{" "}
    </section>
  );
};

export default NewProducts;
