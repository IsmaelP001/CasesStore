import useHandleParams from "@/hooks/useHandleParams";
import { trpc } from "@/lib/trpc/client";
import React, { useState } from "react";
import FilterItem from "./FilterItem";

const FilterMaterials = () => {
  const [materials] = trpc.catalog.getMaterials.useSuspenseQuery();
  const { setRemoveConsecutiveParam, getParam } = useHandleParams();

  const selectedMaterials = getParam("material")?.split("%") || [];

  const handleCheckboxChange = (name: string) => {
    setRemoveConsecutiveParam("material", name);
  };

  return (
    <div className="space-y-2 mt-2">
      {materials?.map((material) => {
        const isSelected = selectedMaterials.includes(material.name);

        return (
          <FilterItem
            identifier={`material-${material.id}`}
            checked={isSelected}
            onCheckedChange={() => handleCheckboxChange(material.name)}
          >
            {material.name}
          </FilterItem>
        );
      })}
    </div>
  );
};

export default FilterMaterials;
