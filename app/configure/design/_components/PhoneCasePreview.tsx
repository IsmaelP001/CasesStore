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
      className="relative w-full    overflow-hidden lg:col-span-2 
                 flex flex-col gap-2 md:gap-5 items-center bg-transparent 
                 justify-center rounded-lg px-12 pb-2 md:py-5 text-center "
    >
      <SelectModelDialog />

      {/* Contenedor con tamaño dinámico */}
      <div className="relative 
                w-[calc((80vh-150px)*(900/1700))]
                aspect-[920/1900] 
                 max-w-full
                max-h-[80vh] 
                bg-opacity-50 pointer-events-none 
                flex justify-center items-center overflow-hidden">
        <AspectRatio  ref={phoneCaseRef} ratio={920 / 1900}>
          <Image
            fill
            alt="phone image"
            src="/phone-template.png"
            className="pointer-events-none z-50 select-none  object-center object-cover overflow-hidden"
          />
        </AspectRatio>
        <CaseBackground />
      </div>

      <CaseColorPicker />

      <SaveButton className="md:hidden absolute right-0 top-[50%] -translate-y-[50%] size-[40px] rounded-full" />

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

