// useConfiguratorDesign.js - Ajuste en la función getClipFunc
import { useState, useRef } from "react";
import useImage from "use-image";
import { useDesignElements, useDesignUI } from "../hooks/useDesign-contextV2";

export const useConfiguratorDesign = () => {
  const {
    unselectAllElements,
  } = useDesignElements();
  
  const { 
    configuratorDimensions,
  } = useDesignUI();

  const layerRef = useRef<HTMLCanvasElement | undefined>(undefined);
  
  const [scale, setScale] = useState(1);
  const [isClipped, setIsClipped] = useState(false);
  const [image] = useImage(
    "/iphone-14-case-transparent-4.png",
    "anonymous",
    "origin"
  );

  const [backgroundPhone] = useImage(
    "/iphone-14.png",
    "anonymous",
    "origin"
  );
  const konvaLayerRefHandler = (layerNode: any) => {
    if (layerNode) {
      const sourceCanvas = layerNode.canvas._canvas;
      layerRef.current = sourceCanvas;
    } else {
      layerRef.current = undefined;
    }
  };

  const toggleClip = () => setIsClipped(!isClipped);

  const handleStageClick = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      unselectAllElements();
    }
  };

  const getClipFunc = isClipped ? (ctx: any) => {
    const {
      x,
      y,
      width,
      height,
      borderRadius,
    } = configuratorDimensions.phone;

    // Manejo más seguro del borderRadius
    const radius = typeof borderRadius === 'number' 
      ? borderRadius 
      : (Array.isArray(borderRadius) && borderRadius.length > 0 
        ? borderRadius[0] 
        : 10);

    // Dibujamos la forma del teléfono
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius,
      y + height
    );
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  } : undefined;

  return {
    layerRef,
    scale,
    isClipped,
    image,
    konvaLayerRefHandler,
    toggleClip,
    handleStageClick,
    getClipFunc,
    backgroundPhone
  };
};