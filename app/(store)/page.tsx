import React, { lazy, Suspense } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MainSlider from "@/components/landing/MainSlider";
import DevicesList from "@/components/landing/DevicesList";
import CollectionsList from "@/components/landing/CollectionsList";
import ProductsFavorites from "@/components/landing/ProductsFavorites";
import CustomCaseLayer from "@/components/landing/CustomCaseLayer";
import NewProducts from "@/components/landing/NewProducts";



export const dynamic = "force-static";

const HomePage = async () => {
  return (
    <div className="space-y-10">
      <div className="relative">
        <ErrorBoundary>
          <Suspense>
            <MaxWidthWrapper>
              <MainSlider />
            </MaxWidthWrapper>
          </Suspense>
        </ErrorBoundary>
      </div>

      <div>
        <ErrorBoundary>
          <Suspense>
            <MaxWidthWrapper>
              <DevicesList />
            </MaxWidthWrapper>
          </Suspense>
        </ErrorBoundary>
      </div>

      <div>
        <ErrorBoundary>
          <Suspense>
            <MaxWidthWrapper>
              <CollectionsList />
            </MaxWidthWrapper>
          </Suspense>
        </ErrorBoundary>
      </div>

      <div>
        <ErrorBoundary>
          <Suspense>
            <MaxWidthWrapper>
              <ProductsFavorites />
            </MaxWidthWrapper>
          </Suspense>
        </ErrorBoundary>
      </div>

      <div className="bg-white">
        <ErrorBoundary>
          <Suspense>
            <MaxWidthWrapper>
              <CustomCaseLayer />
            </MaxWidthWrapper>
          </Suspense>
        </ErrorBoundary>
      </div>

      <div>
        <ErrorBoundary>
          <Suspense>
            <MaxWidthWrapper>
              <NewProducts />
            </MaxWidthWrapper>
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default HomePage;
