"use client";
import useHandleParams from "@/hooks/useHandleParams";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc/client";
import React, { useState } from "react";

const FilterDevices = () => {
  const [compatibleProducts] = trpc.catalog.getDevices.useSuspenseQuery();
  const { setRemoveConsecutiveParam, getParam } = useHandleParams();

  const selectedDevices = getParam("device")?.split("%") || [];

  const handleCheckboxChange = (name: string) => {
    setRemoveConsecutiveParam("device", name);
  };

  return (
    <div>
      <h3 className="font-semibold">Dispositivos</h3>
      <div className="space-y-2 mt-2">
        {compatibleProducts?.map((device) => (
          <div key={`product-${device.id}`} className="flex items-center gap-1">
            <Checkbox
              id={`product-${device.id}`}
              value={device.name}
              checked={selectedDevices.includes(device.name)}
              onCheckedChange={() => handleCheckboxChange(device.name)}
            />
            <Label htmlFor={`product-${device.id}`}>{device.name}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterDevices;
