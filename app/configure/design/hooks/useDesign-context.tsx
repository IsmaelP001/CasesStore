// contexts/design-context.tsx
"use client";

import { CUSTOM_FONTS, FONT_COLORS } from "@/config/validators/fonts-options";
import {
  COLORS,
} from "@/config/validators/option-validator";
import React, { createContext, useContext, useState } from "react";
import useCasesRef from "./useCasesRef";

export interface ImageState {
  id:string
  url: string | null;
  width: number;
  height: number;
  position: { x: number; y: number };
}

export interface Device{
  id:string;
  name:string
}

export interface Material{
  id:string;
  name:string
}


export interface TextState {
  content: string;
  position: { x: number; y: number;};
  size: {
    width: number;
    height: number;
  };
  direction: "horizontal" | "vertical" | "smallVertical";
  font: string;
  color: { name: string; hex: string };
}

interface StickersState {
  items: Array<{
    id: string;
    image: { src: string };
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
}

interface DesignRefs {
  containerRef: React.RefObject<HTMLDivElement>;
  textContainerRef: React.RefObject<HTMLDivElement>;
  phoneCaseRef: React.RefObject<HTMLDivElement>;
}


interface DesignOptions {
  color: {
    hex: string;
    label: string;
    tw: string;
    value: string;
  };
  device:Device
  material:Material
}

type DesignState = {
  designOptions: DesignOptions;
  imagesState: ImageState[];
  textState: TextState;
  stickersState: StickersState;
  selectedElement:any,
  caseDimensions:any
  openSelectDeviceSidebar:boolean
};

type DesignActions = {
  setDesignOptions: React.Dispatch<React.SetStateAction<DesignOptions>>;
  setImagesState: React.Dispatch<React.SetStateAction<ImageState[]>>;
  setTextState: React.Dispatch<React.SetStateAction<TextState>>;
  setStickersState: React.Dispatch<React.SetStateAction<StickersState>>
  setSelectedElement:React.Dispatch<React.SetStateAction<string>>;
  setOpenSelectDeviceSidebar:React.Dispatch<React.SetStateAction<boolean>>;

};

type DesignFns={
  removeCustomImage:(id:string)=>void
  removeSticker:(id:string)=>void
}

const DesignContext = createContext<(DesignState & DesignActions & DesignRefs & DesignFns) | null>(null);

export function DesignProvider({ children }: { children: React.ReactNode }) {
  const [designOptions, setDesignOptions] = useState<DesignOptions>({
    color: COLORS[0],
    device: {id:'',name:''},
    material:{id:'',name:''},
  });

  const [imagesState, setImagesState] = useState<ImageState[]>([]);
  const [openSelectDeviceSidebar,setOpenSelectDeviceSidebar]=useState<boolean>(false)
  
  const [textState, setTextState] = useState<TextState>({
    content: "",
    position: { x: 0, y: 0},
    size: { width: 220, height: 200},
    direction: "horizontal",
    font: CUSTOM_FONTS[0].fontFamily,
    color: FONT_COLORS[0],
  });

  const [stickersState, setStickersState] = useState<StickersState>({
    items: [],
  });
  const [selectedElement,setSelectedElement]=useState<string>('')

  const removeCustomImage=(id:string)=>{
    setImagesState((prev:ImageState[])=>prev.filter(image=>image.id !== id))
  }

  const removeSticker=(id:string)=>{
    setStickersState((prev:StickersState)=>({items:prev.items.filter(sticker=>sticker.id !== id)}))
  }

  const {textContainerRef,containerRef,phoneCaseRef,caseDimensions}=useCasesRef({setTextState,setSelectedElement})

  return (
    <DesignContext.Provider value={{
      designOptions,
      imagesState,
      textState,
      stickersState,
      setDesignOptions,
      setImagesState,
      setTextState,
      setStickersState,
      selectedElement,
      setSelectedElement,
      textContainerRef,
      containerRef,
      phoneCaseRef,
      caseDimensions,
      removeCustomImage,
      removeSticker,
      setOpenSelectDeviceSidebar,
      openSelectDeviceSidebar
    }}>
      {children}
    </DesignContext.Provider>
  )
}

export const useDesign = () => {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error("useDesign must be used within a DesignProvider");
  }
  return context;
};




