"use client";

import { useMemo } from "react";
import { useDesignElements, useDesignUI } from "./useDesign-contextV2";

export default function useTextPosition() {
  const { selectedElement } = useDesignElements();
  const { configuratorDimensions } = useDesignUI();

  const positionCoordinates = useMemo(() => {
    if (!selectedElement || selectedElement?.type !== "text") return null;
    const { phone, container } = configuratorDimensions;

    const phoneX = phone.x - container.x;
    const phoneY = phone.y - container.y;

    const phoneCenterX = phoneX + phone.width / 2;
    const phoneCenterY = phoneY + phone.height / 2;

    const centerPos = {
      x: phoneCenterX,
      y: phoneCenterY,
    };

    const topPos = {
      x: phoneCenterX,
      y: phoneY + selectedElement?.size?.height! / 2,
    };

    const bottomPos = {
      x: phoneCenterX,
      y: phoneY + phone.height - selectedElement?.size?.height! / 2,
    };

    return {
      center: centerPos,
      top: topPos,
      bottom: bottomPos,
    };
  }, [configuratorDimensions, selectedElement]);

  return positionCoordinates;
}
