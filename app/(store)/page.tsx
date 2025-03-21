import React, { lazy, Suspense } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export const runtime = "edge"

const MainSlider = lazy(() => import("@/components/landing/MainSlider"));
const DevicesList = lazy(() => import("@/components/landing/DevicesList"));
const CollectionsList = lazy(
  () => import("@/components/landing/CollectionsList")
);
const ProductsFavorites = lazy(
  () => import("@/components/landing/ProductsFavorites")
);
const CustomCaseLayer = lazy(
  () => import("@/components/landing/CustomCaseLayer")
);
const NewProducts = lazy(() => import("@/components/landing/NewProducts"));

export const revalidate = 86400;
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
