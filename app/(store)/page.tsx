import MainSlider from "@/components/landing/MainSlider";
import CollectionsList from "@/components/landing/CollectionsList";
import ProductsFavorites from "@/components/landing/ProductsFavorites";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CustomCaseLayer from "@/components/landing/CustomCaseLayer";
import NewProducts from "@/components/landing/NewProducts";
import { serverHelpers } from "@/lib/trpc/serverHelper";
export const revalidate = 86400; // Revalida cada 24 horas
export const dynamic = "force-static";

const HomePage = async () => {
  const newProducts = await serverHelpers.catalog.getNewProducts.fetch();
  const mostOrderedProducts =
    await serverHelpers.catalog.getMostOrderedProducts.fetch();

  return (
    <div className="space-y-16">
      <div className="relative">
        <MainSlider />
      </div>
      <div></div>

      <div>
        <MaxWidthWrapper>
          <CollectionsList />
        </MaxWidthWrapper>
      </div>

      <div>
        <MaxWidthWrapper>
          <ProductsFavorites products={mostOrderedProducts} />
        </MaxWidthWrapper>
      </div>

      <div>
        <MaxWidthWrapper>
          <CustomCaseLayer />
        </MaxWidthWrapper>
      </div>

      <div>
        <MaxWidthWrapper>
          <NewProducts products={newProducts} />
        </MaxWidthWrapper>
      </div>
    </div>
  );
};

export default HomePage;
