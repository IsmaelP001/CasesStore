import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="w-[150px]">
      <Skeleton className="w-[150px] h-[180px]" />
      <div className="space-y-1 mt-1 w-full ">
        <Skeleton className="w-[120px] h-2 m-auto" />
        <Skeleton className="w-[100px] h-2 m-auto" />
        <Skeleton className="w-[110px] h-2 m-auto" />
      </div>
    </div>
  );
};

const ProductListSkeleton = () => {
  return (
    <div className="grid gap-5 place-items-center  grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
      {[...Array(8)].map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductListSkeleton;
