"use client";
import React, { useEffect } from "react";
import { Stage, Layer, Rect, Image as KonvaImage, Group } from "react-konva";
import {
  ImageElement,
  TextElement,
  useDesignElements,
  useDesignOptions,
  useDesignUI,
} from "../hooks/useDesign-contextV2";
import ResizableKonvaImage from "./ResizableKonvaImage";
import { TextPositionConfigurationMobile } from "./TextEditContainer";
import ResizableText from "./ResizableKonvaText";
import { useIsMobile } from "@/hooks/use-mobile";
import { ImageEditfigurationMobile } from "./ImageEditContainert";
import { useConfiguratorDesign } from "../hooks/useConfiguratorDesign";
import { Button } from "@/components/ui/button";
import { Image, ImageOff } from "lucide-react";
import CaseColorPicker from "./CaseColorPicker";

const PhoneCaseConfiguratorV3 = () => {
  const isMobile = useIsMobile();
  const { designOptions } = useDesignOptions();
  const {
    designElements,
    selectedElement,
    updateDesignElement,
    setSelectDesignElement,
  } = useDesignElements();
  const {
    configuratorDimensions,
    stageContainerRef,
    stageRef,
    updateStageDimensions,
    phoneContainerRef,
  } = useDesignUI();
  const {
    toggleClip,
    isClipped,
    scale,
    handleStageClick,
    getClipFunc,
    image,
    backgroundPhone,
  } = useConfiguratorDesign();

  useEffect(() => {
    if (stageContainerRef.current) {
      updateStageDimensions();
    }

    window.addEventListener("resize", updateStageDimensions);
    return () => window.removeEventListener("resize", updateStageDimensions);
  }, [stageContainerRef.current]);

  return (
    <div
      ref={stageContainerRef}
      className="z-20 w-full h-full flex justify-center items-center"
      style={{
        position: "relative",
      }}
    >
      <Button
        size="sm"
        variant="link"
        onClick={toggleClip}
        className="absolute top-2 right-4 z-30 underline"
      >
        {isClipped ? <Image /> : <ImageOff />}

        {isClipped ? "Mostrar contorno" : "Ocultar contorno"}
      </Button>
      <Stage
        width={configuratorDimensions.container.width}
        height={configuratorDimensions.container.height}
        ref={stageRef}
        scaleX={scale}
        scaleY={scale}
        style={{
          border: "1px solid gray",
          width: "100%",
          height: "100%",
        }}
        onMouseDown={handleStageClick}
      >

        <Layer>
        <KonvaImage
              image={backgroundPhone}
              x={configuratorDimensions.phone.x}
              y={configuratorDimensions.phone.y}
              width={configuratorDimensions.phone.width}
              height={configuratorDimensions.phone.height}
              draggable={false}
              listening={false}
              cornerRadius={configuratorDimensions.phone.borderRadius}
            />
        </Layer>
        {/* Capa con los elementos diseñados (imágenes y textos) */}
      
        {/* Capa superior con la imagen del teléfono */}
        <Layer ref={phoneContainerRef}>
          <KonvaImage
            image={image}
            x={configuratorDimensions.phone.x}
            y={configuratorDimensions.phone.y}
            width={configuratorDimensions.phone.width}
            height={configuratorDimensions.phone.height}
            draggable={false}
            listening={false}
            cornerRadius={configuratorDimensions.phone.borderRadius}
          />
        </Layer>

        <Layer>
          {/* <Rect
            x={configuratorDimensions.phone.x}
            y={configuratorDimensions.phone.y}
            width={configuratorDimensions.phone.width}
            height={configuratorDimensions.phone.height}
            fill={designOptions.color.hex}
            listening={false}
            cornerRadius={configuratorDimensions.phone.borderRadius}
          /> */}
         
          <Group clipFunc={getClipFunc}>
            {designElements.map((item) =>
              item.type === "image" || item.type === "texture" ? (
                <ResizableKonvaImage
                  key={item.id}
                  item={item as ImageElement}
                  onChange={updateDesignElement}
                  selectedItem={selectedElement}
                  onSelect={setSelectDesignElement}
                />
              ) : (
                <ResizableText
                  key={item.id}
                  item={item as TextElement}
                  onChange={updateDesignElement}
                  selectedItem={selectedElement}
                  onSelect={setSelectDesignElement}
                />
              )
            )}
          </Group>
        </Layer>

      </Stage>
      <div className="absolute left-0 top-[50%] -translate-y-[50%]">
        <CaseColorPicker />
      </div>
      {selectedElement && isMobile ? (
        <div
          className="min-w-[200px] min-h-[30px] text-center text-black font-bold"
          style={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {selectedElement?.type === "text" ? (
            <TextPositionConfigurationMobile />
          ) : (
            <ImageEditfigurationMobile />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default PhoneCaseConfiguratorV3;
