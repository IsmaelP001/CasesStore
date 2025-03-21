// components/PhoneCasePreview.tsx
"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CaseBackground } from "./CaseBackground";
import { useDesign } from "../hooks/useDesign-context";
import { DraggableText } from "./DraggableText";
import { DraggableImage } from "./DraggableImage";
import { DraggableSticker } from "./DraggableSticker";
import CaseColorPicker from "./CaseColorPicker";
import { SaveButton } from "./SaveButton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Image as ImageIcon, ImageOff } from "lucide-react";
import Image from "next/image";
import { SelectModelDialog } from "./SelectModelDialog";

export const PhoneCasePreview = () => {
  const {
    imagesState,
    textState,
    stickersState,
    designOptions,
    phoneCaseRef,
    containerRef,
    showSurrondingImage,
    setShowSurrondingImage,
  } = useDesign();

  return (
    <div
      ref={containerRef}
      className="relative w-full  box-border overflow-hidden lg:col-span-2 
                  gap-2 md:gap-5 bg-transparent
                  rounded-lg px-12 py-6 text-center md:h-[100svh] flex flex-col items-center justify-center "
    >
      <SelectModelDialog />

      <div
        className="relative 
                w-[calc((79dvh-150px)*(900/1700))]
                aspect-[920/1900] 
                 max-w-full
                max-h-[85dvh] 
                bg-opacity-50 pointer-events-none 
                flex justify-center items-center "
      >
        <AspectRatio ref={phoneCaseRef} ratio={920 / 1900}>
          <Image
            fill
            alt="phone image"
            src="/phone-template.png"
            className="pointer-events-none z-50  object-center object-cover overflow-hidden"
          />
        </AspectRatio>
        <CaseBackground />
      </div>

      <div className="z-50">
        <Button
          size="sm"
          onClick={() => setShowSurrondingImage(!showSurrondingImage)}
          variant="outline"
          className="rounded-3xl px-4 font-medium"
        >
          {" "}
          {showSurrondingImage ? <ImageOff />:<ImageIcon/>}
          {showSurrondingImage ? "Ocultar contorno" : "Mostrar contorno"}
        </Button>
      </div>

      <CaseColorPicker />

      <SaveButton className="md:hidden absolute right-1.5 top-[50%] -translate-y-[50%] size-[40px] rounded-full" />

      {imagesState?.map((image) => (
        <DraggableImage key={image.url} image={image} />
      ))}

      {stickersState.items.map((sticker: any) => (
        <DraggableSticker key={sticker.id} sticker={sticker} />
      ))}

      {textState.content && <DraggableText />}
    </div>
  );
};
