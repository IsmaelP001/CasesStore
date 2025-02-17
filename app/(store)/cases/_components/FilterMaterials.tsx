import useHandleParams from "@/hooks/useHandleParams";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc/client";
import React, { useState } from "react";

const FilterMaterials = () => {
  const [materials] = trpc.catalog.getMaterials.useSuspenseQuery();
  const { setRemoveConsecutiveParam, getParam } = useHandleParams();

  const selectedMaterials = getParam("material")?.split("%") || [];

  const handleCheckboxChange = (name: string) => {
    setRemoveConsecutiveParam("material", name);
  };

  return (
    <div>
      <h3 className="font-semibold">Material</h3>
      <div className="space-y-2 mt-2">
        {materials?.map((material) => (
          <div
            key={`material-${material.id}`}
            className="flex items-center gap-1"
          >
            <Checkbox
              id={material.name}
              value={material.name}
              checked={selectedMaterials.includes(material.name)}
              onCheckedChange={() => handleCheckboxChange(material.name)}
            />
            <Label htmlFor={material.name}>{material.name}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterMaterials;
