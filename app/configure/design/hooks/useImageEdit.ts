'use client'

import { useMemo } from "react";
import { ImageElement, useDesignElements, useDesignUI } from "./useDesign-contextV2";
import { v4 as uuidv4 } from 'uuid';

export default function useImageEdit() {
    const { configuratorDimensions } = useDesignUI();
    const {
      selectedElement,
      updateDesignElement,
      setDesignElements,
      removeDesignElement,
    } = useDesignElements();
  
    const fitImageContainerSize = () => {
      const scale =
        configuratorDimensions.phone.height / selectedElement?.size.height!;
      const width = selectedElement?.size.width! * scale;
      const height = configuratorDimensions.phone.height;
      const x = configuratorDimensions.container.width / 2;
      const y = configuratorDimensions.container.height / 2;
      updateDesignElement({
        ...selectedElement,
        size:{width,height},
        position: {x,y},
      } as any)
    };
  
    const selectedImage = useMemo(()=>
      (selectedElement?.type === 'image' ? selectedElement:null )as ImageElement | null
      ,[selectedElement])
  
    const flipImageHorizontally = () => {
      if(!selectedImage)return
      updateDesignElement({
        ...selectedElement,
        flipX: !selectedImage.flipX,
      } as any);
    };
  
    const flipImageVertically = () => {
      if(!selectedImage)return
  
      updateDesignElement({
        ...selectedElement,
        flipY: !selectedImage.flipY,
      } as any);
    };
  
    const duplicateElement = () => {
      if (!selectedImage) return;
      const duplicatedItem = {
        ...selectedImage,
        id: uuidv4(),
        isSelected: true,
      };
      setDesignElements((prev) => {
        const unselectedItems = prev.map((item) => ({
          ...item,
          isSelected: false,
        }));
        return [...unselectedItems, duplicatedItem];
      });
    };
  return (
    {fitImageContainerSize,flipImageHorizontally,flipImageVertically,duplicateElement}
  )
}
