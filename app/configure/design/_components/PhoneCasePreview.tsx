// components/PhoneCasePreview.tsx
"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { CaseBackground } from "./CaseBackground";
import { useDesign } from "../hooks/useDesign-context";
import { DraggableText } from "./DraggableText";
import { DraggableImage } from "./DraggableImage";
import { DraggableSticker } from "./DraggableSticker";
import { SelectModelDialog } from "./SelectModelDialog";
import CaseColorPicker from "./CaseColorPicker";
import { SaveButton } from "./SaveButton";

export const PhoneCasePreview = () => {
  const { imagesState, textState, stickersState, phoneCaseRef, containerRef } =
    useDesign();

  return (
    <div
      ref={containerRef}
      className="relative w-full  box-border   overflow-hidden lg:col-span-2 
                  gap-2 md:gap-5  bg-transparent 
                  rounded-lg px-12 py-6 text-center flex flex-col items-center justify-center "
    >

      {/* Contenedor con tamaño dinámico */}
      <div className="relative 
                w-[calc((79dvh-150px)*(900/1700))]
                aspect-[920/1900] 
                 max-w-full
                max-h-[85dvh] 
                bg-opacity-50 pointer-events-none 
                flex justify-center items-center overflow-hidden">
        <AspectRatio  ref={phoneCaseRef} ratio={920 / 1900}>
          <Image
            fill
            alt="phone image"
            src="/phone-template.png"
            className="pointer-events-none z-50  object-center object-cover overflow-hidden"
          />
        </AspectRatio>
        <CaseBackground />
      </div>

      <CaseColorPicker />

      <SaveButton className="md:hidden absolute right-1.5 top-[50%] -translate-y-[50%] size-[40px] rounded-full" />

      {textState.content && <DraggableText />}
      {imagesState?.map((image) => (
        <DraggableImage key={image.url} image={image} />
      ))}
      {stickersState.items.map((sticker: any) => (
        <DraggableSticker key={sticker.id} sticker={sticker} />
      ))}
    </div>
  );
};

