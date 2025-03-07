import Product from "@/app/(store)/cases/_components/Product";
import { serverHelpers } from "@/lib/trpc/serverHelper";
import { Slider, SliderContent } from "../SliderV3";

const NewProducts = async () => {
  const newProducts = await serverHelpers.catalog.getNewProducts.fetch();

  return (
    <section className=" pt-5 pb-5 space-y-3 ">
      <div className="flex text-center items-center justify-center gap-2">
        <h3 className="sedgwick_ave font-semibold text-3xl md:text-[2.60rem] ">
          <span className="text-accent">Nuevos</span> diseños
        </h3>
      </div>
      <Slider>
        <SliderContent>
          {newProducts?.map((product, index) => (
            <Product
              isNewProduct
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

export default NewProducts;
