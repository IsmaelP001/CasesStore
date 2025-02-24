"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "../../../../components/ui/button";
import { useRouter } from "next/navigation";
import useHandleParams from "@/hooks/useHandleParams";
import { X } from "lucide-react";

const FilterParams = () => {
  const { searchParamsObj, setRemoveConsecutiveParam } = useHandleParams();

  const paramsArray = searchParamsObj
    ?.map(([key, value]) => {
      return value.split("%").map((item) => {
        return [[key], [item]];
      });
    })
    .flat();

  return (
    <div className="flex gap-2 flex-nowrap overflow-x-scroll scrollbar-hide">
      {paramsArray.map(([key, value]) => (
        <Button
          key={key.toString()}
          onClick={() =>
            setRemoveConsecutiveParam(key.toString(), value.toString())
          }
          className="h-6 rounded-2xl bg-transparent border-2 flex justify-between w-fit hover:text-white text-black border-primary"
        >
          <p className="capitalize text-xs  font-semibold truncate">{value}</p>
          <X />
        </Button>
      ))}
    </div>
  );
};

export default FilterParams;
