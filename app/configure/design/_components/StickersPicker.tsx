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
import { Plus, PlusCircle, Trash } from "lucide-react";

export default function StickersPicker() {
  const { stickersState, setStickersState, removeSticker } = useDesign();
  const addSticker = (
    sticker: (typeof STIKERS_OPTIONS)[number]["content"][number]
  ) => {
    const isStickerAdded = stickersState.items.some(
      (item) => item.id === sticker.id
    );
    if (isStickerAdded) return;

    const newSticker = {
      ...sticker,
      x: 300,
      y: 300,
      width: 100,
      height: 100,
    };

    setStickersState((prev) => ({
      ...prev,
      items: [...prev.items, newSticker],
    }));
  };

  const isStickerAdded = (sticker: any) => {
    const isAdded = stickersState.items.some((item) => item.id === sticker.id);
    return isAdded;
  };

  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="flex gap-2 justify-center items-center flex-nowrap w-full  overflow-x-scroll overflow-y-hidden">
          <>
            <PlusCircle size={40} />
            {stickersState.items.map((sticker) => (
              <article key={sticker.id} className="relative w-[50px] h-[50px]">
                <Image
                  src={sticker.image.src}
                  fill
                  className=" object-cover"
                  alt="sticker image"
                />
              </article>
            ))}
          </>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Stickers</DrawerTitle>
            <DrawerDescription>Pulse para añadir</DrawerDescription>
          </DrawerHeader>
          <div className="px-2">
            <Tabs defaultValue={`${STIKERS_OPTIONS[0].type}`}>
              <TabsList className="flex w-full">
                {STIKERS_OPTIONS.map((item) => (
                  <TabsTrigger
                    key={item.type}
                    className="flex-grow"
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
                      <button
                        key={sticker.id}
                        onClick={() => addSticker(sticker)}
                        className={cn(
                          "aspect-square relative rounded-lg overflow-hidden border-2 hover:border-primary transition-all",
                          isStickerAdded(sticker)
                            ? "border-blue-500 bg-blue-50/75"
                            : null
                        )}
                      >
                        <NextImage
                          src={sticker.image}
                          fill
                          alt={`sticker `}
                          className="object-contain p-2"
                        />
                        {isStickerAdded(sticker) && (
                          <>
                            <div className="absolute inset-0 z-20 bg-gray-300/50" />
                            <button
                              className="absolute  bg-red-200/70 p-2 rounded-full z-20 top-[50%] -translate-y-[50%]  right-[50%] translate-x-[50%] "
                              onClick={() => removeSticker(sticker.id)}
                            >
                              <Trash className="text-red-500" />
                            </button>
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          <DrawerFooter>
            <DrawerClose>
              <Button className="w-full rounded-2xl">Guardar</Button>
            </DrawerClose>{" "}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <div className="space-y-3">
      <Label className="font-semibold">Stickers</Label>

      {/* Stickers tabs */}
      <Tabs defaultValue={`${STIKERS_OPTIONS[0].type}`}>
        <TabsList className="flex w-full">
          {STIKERS_OPTIONS.map((item) => (
            <TabsTrigger
              key={item.type}
              className="flex-grow"
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
                <button
                  key={sticker.id}
                  onClick={() => addSticker(sticker)}
                  className={cn(
                    "aspect-square relative rounded-lg overflow-hidden border-2 hover:border-primary transition-all",
                    isStickerAdded(sticker)
                      ? "border-blue-500 bg-blue-50/75"
                      : null
                  )}
                >
                  <NextImage
                    src={sticker.image}
                    fill
                    alt={`sticker `}
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
