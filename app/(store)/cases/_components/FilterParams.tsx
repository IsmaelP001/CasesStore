"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "../../../../components/ui/button";
import { useRouter } from "next/navigation";
import useHandleParams from "@/hooks/useHandleParams";

const FilterParams = () => {
  const {searchParamsObj,setRemoveConsecutiveParam}=useHandleParams()

  const paramsArray = searchParamsObj
    ?.map(([key, value]) => {
      return value.split("%").map((item) => {
        return [[key], [item]];
      });
    })
    .flat();

  
  return (
    <div className="">
      <div className="flex gap-5 items-center">
        {paramsArray.map(([key, value]) => (
          <Button
            key={key.toString()}
            onClick={() => setRemoveConsecutiveParam(key.toString(), value.toString())}
            className="h-6 rounded-2xl border border-primary"
          >
            <p className="capitalize text-xs font-semibold">{value}</p>
            <span className="text-red-300 font-bold ml-1">X</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FilterParams;
