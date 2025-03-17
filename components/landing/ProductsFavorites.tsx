import Product from "@/app/(store)/cases/_components/Product";
import { Slider, SliderContent } from "../SliderV3";
import { serverHelpers } from "@/lib/trpc/serverHelper";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils/utils";
import Link from "next/link";

const ProductsFavorites = async () => {
  const mostOrderedProducts =
    await serverHelpers.catalog.getMostOrderedProducts.fetch();
  return (
    <section className=" pt-5 pb-5 space-y-5 ">
      <header className="flex justify-between items-center gap-5">
        <div>
        <p className="text-xs md:text-base">
         Favoritos
        </p>
        <h3 className="sedgwick_ave font-bold text-3xl md:text-[2.60rem] mb-1.5  md:max-w-full truncate   ">
          <span className="text-primary">Cases</span> populares
        </h3>
        <p className="text-xs font-light md:text-base">
        Top de nuestros diseños mas populares, elige tu favorito o diseña uno aún mejor.
        </p>
        </div>
        <div>
          <Link href='/cases' className={cn(buttonVariants({variant:'outline',size:'sm'}))}>Ver todos</Link>
        </div>
      </header>
      <Slider>
        <SliderContent>
          {mostOrderedProducts?.map((product, index) => (
            <Product
              className="w-[37dvw] md:w-[19dvw] lg:w-[16dvw]"
              key={index}
              product={product}
              showCartBtn
            />
          ))}
        </SliderContent>
      </Slider>
    </section>
  );
};

export default ProductsFavorites;
