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

export const PhoneCasePreview = () => {
  const {
    imagesState,
    textState,
    stickersState,
    phoneCaseRef,
    containerRef,
  } = useDesign();

  return (
    <div
      ref={containerRef}
      className="relative h-[34.5rem] md:h-[37.5rem] overflow-hidden lg:col-span-2 w-full  flex flex-col gap-5 items-center bg-transparent justify-center rounded-lg p-12 text-center"
    >
      {/* Encabezado del modelo */}
      <SelectModelDialog />

      {/* Vista previa del teléfono */}
      <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
        <AspectRatio ref={phoneCaseRef} ratio={896 / 1831}>
          <Image
            fill
            alt="phone image"
            src="/phone-template.png"
            className="pointer-events-none z-50 select-none object-contain"
          />
        </AspectRatio>
        <CaseBackground />
      </div>

      {/* Elementos arrastrables */}
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
