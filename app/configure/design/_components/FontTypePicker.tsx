"use client";
import { Label } from "@/components/ui/label";
import { CUSTOM_FONTS } from "@/config/validators/fonts-options";
import React from "react";
import { useDesign } from "../hooks/useDesign-context";
import { cn } from "@/lib/utils/utils";
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

export default function FontTypePicker() {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const { setTextState, textState } = useDesign();

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger>
          <div
            className="size-10 grid place-content-center border-2 border-blue-500 rounded-xl"
            style={{ fontFamily: textState.font }}
          >
            Aa
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Tipo de fuente</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-scroll max-h-[200px] px-4">
            <div className="grid grid-cols-4 gap-3 mt-2">
              {CUSTOM_FONTS.map((font) => (
                <button
                  key={font.id}
                  onClick={() =>
                    setTextState({ ...textState, font: font.fontFamily })
                  }
                  className={cn(
                    "p-3 rounded-lg border-2 text-lg",
                    textState.font === font.fontFamily
                      ? "border-blue-500 bg-blue-50/75"
                      : "border-gray-200 hover:border-blue-200"
                  )}
                  style={{ fontFamily: font.fontFamily }}
                >
                  Aa
                </button>
              ))}
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose>
            <Button className="w-full rounded-2xl">Guardar</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <div>
      <Label className="font-semibold text-base">Fuentes Disponibles</Label>
      <div className="grid grid-cols-4 gap-3 mt-2">
        {CUSTOM_FONTS.map((font) => (
          <button
            key={font.id}
            onClick={() =>
              setTextState({ ...textState, font: font.fontFamily })
            }
            className={cn(
              "p-3 rounded-lg border-2 text-lg",
              textState.font === font.fontFamily
                ? "border-blue-500 bg-blue-50/75"
                : "border-gray-200 hover:border-blue-200"
            )}
            style={{ fontFamily: font.fontFamily }}
          >
            Aa
          </button>
        ))}
      </div>
    </div>
  );
}
