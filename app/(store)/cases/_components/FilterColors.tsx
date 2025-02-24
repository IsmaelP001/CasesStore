import useHandleParams from "@/hooks/useHandleParams";
import { trpc } from "@/lib/trpc/client";
import React from "react";
import FilterItem from "./FilterItem";

const FilterColors = () => {
  const [colors] = trpc.catalog.getColors.useSuspenseQuery();
  const { setRemoveConsecutiveParam, getParam } = useHandleParams();

  const selectedColors = getParam("color")?.split("%") || [];

  const handleCheckboxChange = (name: string) => {
    setRemoveConsecutiveParam("color", name);
  };

  return (
    <div className="space-y-2 mt-2">
      {colors?.map((color: any) => {
        const isSelected = selectedColors.includes(color.name);

        return (
          <FilterItem
          identifier={`color-${color.id}`}
            checked={isSelected}
            onCheckedChange={() => handleCheckboxChange(color.name)}
          >
            {color.name}
          </FilterItem>
        );
      })}
    </div>
  );
};

export default FilterColors;
