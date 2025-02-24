import Product from "@/app/(store)/cases/_components/Product";
import  {Slider,SliderContent } from "../SliderV3";
import { serverHelpers } from "@/lib/trpc/serverHelper";

const ProductsFavorites = async() => {
  const mostOrderedProducts =
  await serverHelpers.catalog.getMostOrderedProducts.fetch();
  return (
    <section className=" pt-5 pb-5 space-y-3 ">
      <div className="flex items-center gap-2">
        <h3 className="sedgwick_ave font-semibold text-2xl md:text-4xl mb-1.5 max-w-[290px] md:max-w-full truncate   "><span className="text-accent text-3xl md:text-4xl">Favoritos</span> de nuestros clientes</h3>
      </div>
      <Slider>
        <SliderContent>
        {mostOrderedProducts?.map((product, index) => (
          <Product
            className="w-[37dvw] md:w-[19dvw] lg:w-[16dvw]"
            key={index}
            product={product}
          />
        ))}
        </SliderContent>
      </Slider>    
    </section>
  );
};


export default ProductsFavorites;
