"use client";

import { CUSTOM_FONTS, FONT_COLORS } from "@/config/validators/fonts-options";
import {
  COLORS,
} from "@/config/validators/option-validator";
import React, { createContext, useContext, useRef, useState } from "react";
import useCasesRef from "./useCasesRef";
import { useEffect } from "react";

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

export interface Texture{
  id:string;
  src:string;
  position?:{x:number;y:number}
  size?:{width:number;height:number}
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
  style:React.CSSProperties | null
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
  texture:Texture
}

type DesignState = {
  designOptions: DesignOptions;
  imagesState: ImageState[];
  textState: TextState;
  stickersState: StickersState;
  selectedElement:any,
  caseDimensions:any
  openSelectDeviceSidebar:boolean
  showSurrondingImage:boolean
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

type DesignActions = {
  setDesignOptions: React.Dispatch<React.SetStateAction<DesignOptions>>;
  setImagesState: React.Dispatch<React.SetStateAction<ImageState[]>>;
  setTextState: React.Dispatch<React.SetStateAction<TextState>>;
  setStickersState: React.Dispatch<React.SetStateAction<StickersState>>
  setSelectedElement:React.Dispatch<React.SetStateAction<string>>;
  setOpenSelectDeviceSidebar:React.Dispatch<React.SetStateAction<boolean>>;
  setShowSurrondingImage:React.Dispatch<React.SetStateAction<boolean>>;

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
    texture:{id:'',src:''}
  });

  const [imagesState, setImagesState] = useState<ImageState[]>([]);
  const [openSelectDeviceSidebar,setOpenSelectDeviceSidebar]=useState<boolean>(false)
  const [showSurrondingImage,setShowSurrondingImage]=useState<boolean>(true);

  const [textState, setTextState] = useState<TextState>({
    content: "",
    position: { x: 0, y: 0},
    size: { width: 230, height: 180},
    direction: "horizontal",
    font: CUSTOM_FONTS[0].fontFamily,
    color: FONT_COLORS[0],
    style:null
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

  const canvasRef=useRef(null)

  useEffect(()=>{
    if(document){
      const canvas=document.createElement('canvas')
      canvas.width=920
      canvas.height=1900
      canvasRef.current=canvas!
    }
  },[document])

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
      openSelectDeviceSidebar,
      showSurrondingImage,
      setShowSurrondingImage,
      canvasRef
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




