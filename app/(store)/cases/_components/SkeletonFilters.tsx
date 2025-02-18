import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SkeletonFilters = () => {
  return (
    <div className="space-y-1.5">
      <div className="flex gap-2">
        <Skeleton className="w-[20px] h-3" />
        <Skeleton className=" w-[120px] h-3" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="w-[20px] h-3" />
        <Skeleton className=" w-[120px] h-3" />
      </div>     
      <div className="flex gap-2">
        <Skeleton className="w-[20px] h-3" />
        <Skeleton className=" w-[120px] h-3" />
      </div>     
      <div className="flex gap-2">
        <Skeleton className="w-[20px] h-3" />
        <Skeleton className=" w-[120px] h-3" />
      </div>      
      <div className="flex gap-2">
        <Skeleton className="w-[20px] h-3" />
        <Skeleton className=" w-[120px] h-3" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="w-[20px] h-3" />
        <Skeleton className=" w-[120px] h-3" />
      </div>
    </div>
  );
};

export default SkeletonFilters;
