import MainSlider from "@/components/landing/MainSlider";
import CollectionsList from "@/components/landing/CollectionsList";
import ProductsFavorites from "@/components/landing/ProductsFavorites";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CustomCaseLayer from "@/components/landing/CustomCaseLayer";
import NewProducts from "@/components/landing/NewProducts";
import { Smartphone } from "lucide-react";
import Link from "next/link";
import DevicesList from "@/components/landing/DevicesList";
export const revalidate = 86400; // Revalida cada 24 horas
export const dynamic = "force-static";

const HomePage = async () => {
  return (
    <div className="space-y-10">
      <div className="relative">
        <MainSlider />
      </div>
      <div>
        <MaxWidthWrapper>
        <DevicesList/>
        </MaxWidthWrapper>
      </div>
      <div>
        <MaxWidthWrapper>
          <CollectionsList />
        </MaxWidthWrapper>
      </div>

      <div>
        <MaxWidthWrapper>
          <ProductsFavorites />
        </MaxWidthWrapper>
      </div>

      <div className="bg-white">
        <MaxWidthWrapper>
          <CustomCaseLayer />
        </MaxWidthWrapper>
      </div>

      <div>
        <MaxWidthWrapper>
          <NewProducts />
        </MaxWidthWrapper>
      </div>
    </div>
  );
};

export default HomePage;
