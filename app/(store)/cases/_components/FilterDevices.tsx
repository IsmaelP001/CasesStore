"use client";
import useHandleParams from "@/hooks/useHandleParams";
import { trpc } from "@/lib/trpc/client";
import React, { useState } from "react";
import FilterItem from "./FilterItem";

const FilterDevices = () => {
  const [compatibleProducts] = trpc.catalog.getDevices.useSuspenseQuery();
  const { setRemoveConsecutiveParam, getParam } = useHandleParams();

  const selectedDevices = getParam("device")?.split("%") || [];

  const handleCheckboxChange = (name: string) => {
    setRemoveConsecutiveParam("device", name);
  };

  return (
    <div className="space-y-1 ">
      {compatibleProducts?.map((device) => {
        const isSelected = selectedDevices.includes(device.name);
        return (
          <FilterItem
            identifier={`product-${device.id}`}
            checked={isSelected}
            onCheckedChange={() => handleCheckboxChange(device.name)}
          >
            {device.name}{" "}
          </FilterItem>
        );
      })}
    </div>
  );
};

export default FilterDevices;
