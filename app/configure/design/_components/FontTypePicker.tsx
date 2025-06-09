"use client";
import { Label } from "@/components/ui/label";
import { CUSTOM_FONTS } from "@/config/validators/fonts-options";
import React, { useMemo } from "react";
import { cn } from "@/lib/utils/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import { TextElement, useDesignElements, useDesignOptions } from "../hooks/useDesign-contextV2";

export default function FontTypePicker() {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const {updateDesignElement,selectedElement}=useDesignElements()
 const {designOptions,setDesignOptions}=useDesignOptions();

 const selectedTextElement:any =
 selectedElement?.type === "text" ? selectedElement : null

 const defaultFontFamily =useMemo(()=>{
  if (selectedTextElement) {
    return selectedTextElement.font.fontFamily;
  }
  return designOptions.text.font.fontFamily;
 },[designOptions,selectedElement])


  const handleUpdateFont = (font: string) => {
    if (selectedTextElement) {
      updateDesignElement({
        ...selectedTextElement,
        font: {
          ...selectedTextElement.font,
          fontFamily: font,
        },
      });
      return
    }
    setDesignOptions({
      ...designOptions,
      text: {
        ...designOptions.text,
        font: {
          ...designOptions.text.font,
          fontFamily: font,
        },
      },
    });
  };
  

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger>
          <div
            className="size-10 grid place-content-center border-2 border-blue-500 rounded-xl"
            style={{ fontFamily: defaultFontFamily }}
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
                    handleUpdateFont(font.fontFamily)}
                  className={cn(
                    "p-3 rounded-lg border-2 text-lg",
                    defaultFontFamily === font.fontFamily
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
              handleUpdateFont(font.fontFamily)}
            className={cn(
              "p-3 rounded-lg border-2 text-lg",
              defaultFontFamily === font.fontFamily
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
