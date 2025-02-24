import useHandleParams from "@/hooks/useHandleParams";
import { trpc } from "@/lib/trpc/client";
import React, { useState } from "react";
import FilterItem from "./FilterItem";

const FilterGetPrintPatterns = () => {
  const [printPattern] = trpc.catalog.getPrintPatterns.useSuspenseQuery();
  const { setRemoveConsecutiveParam, getParam } = useHandleParams();

  const selectedPatterns = getParam("pattern")?.split("%") || [];

  const handleCheckboxChange = (name: string) => {
    setRemoveConsecutiveParam("pattern", name);
  };

  return (
    <div className="space-y-2 mt-2">
      {printPattern?.map((pattern) => {
        const isSelected = selectedPatterns.includes(pattern.name);

        return (
          <FilterItem
            identifier={`pattern-${pattern.id}`}
            checked={isSelected}
            onCheckedChange={() => handleCheckboxChange(pattern.name)}
          >
            {pattern.name}
          </FilterItem>
        );
      })}
    </div>
  );
};

export default FilterGetPrintPatterns;
