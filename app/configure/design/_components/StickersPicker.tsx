"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { STIKERS_OPTIONS } from "@/config/validators/option-validator";
import { cn } from "@/lib/utils/utils";
import NextImage from "next/image";
import { useDesign } from "../hooks/useDesign-context";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlusCircle, Trash } from "lucide-react";
import { ImageElement, useDesignV2 } from "../hooks/useDesign-contextV2";

const StickerItem = ({ sticker, addSticker, removeSticker, isAdded }: any) => {
  return (
    <button
      onClick={() =>
        isAdded ? removeSticker(sticker.id) : addSticker(sticker)
      }
      className={cn(
        "aspect-square relative rounded-lg overflow-hidden border-2 hover:border-primary transition-all",
        isAdded ? "border-blue-500 bg-blue-50/75" : null
      )}
    >
      <NextImage
        src={sticker.image}
        fill
        alt="sticker"
        className="object-contain p-2"
      />
      {isAdded && (
        <>
          <div className="absolute inset-0 z-20 bg-gray-300/50" />
          <button
            className="absolute bg-red-200/70 p-2 rounded-full z-20 top-[50%] -translate-y-[50%] right-[50%] translate-x-[50%]"
            onClick={() => removeSticker(sticker.id)}
          >
            <Trash className="text-red-500" size={15} />
          </button>
        </>
      )}
    </button>
  );
};

const StickersTabs = () => {
  const {
    setDesignElements,
    designElements,
    configuratorDimensions,
    setConfiguratorDimensions,
    removeDesignElement,
  } = useDesignV2();

  const addSticker = (
    sticker: (typeof STIKERS_OPTIONS)[number]["content"][number]
  ) => {
    const isStickerAdded = designElements.some(
      (item) => item.id === sticker.id
    );
    if (isStickerAdded) return;
    const x = configuratorDimensions.container.width / 2;
      const y = configuratorDimensions.container.height / 2;

    const newSticker: ImageElement = {
      ...sticker,
      url: sticker.image.src,
      type: "image",
      position: { x, y },
      size: { width: sticker.width, height: sticker.height },
      rotation:0
    };
    setDesignElements((prev) => [...prev, newSticker]);
  };

  const isStickerAdded = (sticker: any) =>
    designElements.some((item) => item.id === sticker.id);

  return (
    <Tabs defaultValue={STIKERS_OPTIONS[0].type}>
      <TabsList className="flex w-full rounded-2xl">
        {STIKERS_OPTIONS.map((item) => (
          <TabsTrigger
            key={item.type}
            className="flex-grow rounded-2xl "
            value={item.type}
          >
            {item.type}
          </TabsTrigger>
        ))}
      </TabsList>
      {STIKERS_OPTIONS.map((item) => (
        <TabsContent key={item.type} value={item.type}>
          <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(80px,1fr))]">
            {item.content.map((sticker) => (
              <StickerItem
                key={sticker.id}
                sticker={sticker}
                addSticker={addSticker}
                removeSticker={removeDesignElement}
                isAdded={isStickerAdded(sticker)}
              />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default function StickersPicker() {

  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  

  return isMobile ? (
    <Drawer>
      <DrawerTrigger className="flex gap-2 justify-center items-center flex-nowrap w-full overflow-x-scroll overflow-y-hidden">
        <PlusCircle size={40} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Stickers</DrawerTitle>
          <DrawerDescription>Pulse para añadir</DrawerDescription>
        </DrawerHeader>
        <div className="px-2">
          <StickersTabs />
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button className="w-full rounded-2xl">Guardar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <div className="space-y-3">
      <Label className="font-semibold">Stickers</Label>
      <StickersTabs />
    </div>
  );
}
