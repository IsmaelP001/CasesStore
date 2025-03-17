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
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";

const TEXT_STYLES = [
  { 
    id: "shadow", 
    name: "Sombra", 
    style: { textShadow: "2px 2px 4px rgba(0,0,0,0.5)" } 
  },
  { 
    id: "outline", 
    name: "Contorno", 
    style: { WebkitTextStroke: "1px black", color: "transparent" } 
  },
  { 
    id: "neon", 
    name: "Neón", 
    style: { textShadow: "0 0 5px #0ff, 0 0 10px #0ff" } 
  },
  { 
    id: "highlight", 
    name: "Resaltado", 
    style: { backgroundColor: "#ffeb3b", padding: "2px 6px" } 
  },
  { 
    id: "3d", 
    name: "3D", 
    style: { textShadow: "1px 1px 0 #000, 2px 2px 0 #000, 3px 3px 0 #000" } 
  },
  { 
    id: "gradient", 
    name: "Gradiente", 
    style: { 
      background: "linear-gradient(45deg, #f3ec78, #af4261)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    } 
  },
  { 
    id: "emboss", 
    name: "Emboss", 
    style: { textShadow: "1px 1px 0 #fff, -1px -1px 0 #000" } 
  },
  { 
    id: "inner-shadow", 
    name: "Inner Shadow", 
    style: { textShadow: "0 2px 2px rgba(0,0,0,0.5)" } 
  },
  { 
    id: "glitter", 
    name: "Glitter", 
    style: { textShadow: "0 0 3px #ff0, 0 0 5px #ff0, 0 0 10px #ff0, 0 0 15px #ff0" } 
  },
];

export default function FontStylePicker() {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const { setTextState, textState } = useDesign();

  // Aplica el estilo seleccionado al textState
  const applyStyle = (styleId: string) => {
    const selectedStyle = TEXT_STYLES.find((s) => s.id === styleId);
    if (selectedStyle) {
      // Aquí se sobreescribe la propiedad "style" del textState con el objeto de estilo seleccionado.
      setTextState({ ...textState, style: selectedStyle.style });
    }
  };

  const renderFonts = () => (
    <div className="grid grid-cols-4 gap-3 mt-2">
      {CUSTOM_FONTS.map((font) => (
        <button
          key={font.id}
          onClick={() => setTextState({ ...textState, font: font.fontFamily })}
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
  );

  const renderTextStyles = () => (
    <div className="grid grid-cols-4 gap-3 mt-4">
      {TEXT_STYLES.map((style) => (
        <button
          key={style.id}
          onClick={() => applyStyle(style.id)}
          className="p-2 border-2 rounded-lg text-sm hover:bg-gray-100"
          style={style.style}
        >
          {style.name}
        </button>
      ))}
    </div>
  );

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
          <div className="overflow-y-scroll max-h-[300px] px-4">
            {renderFonts()}
            <Label className="font-semibold text-base mt-4">Efectos</Label>
            {renderTextStyles()}
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
      {renderFonts()}
      <Label className="font-semibold text-base mt-4">Efectos</Label>
      {renderTextStyles()}
    </div>
  );
}
