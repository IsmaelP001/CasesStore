"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useReducer,
  useRef,
  useEffect,
} from "react";
import { CUSTOM_FONTS, FONT_COLORS, FontColor, FontType } from "@/config/validators/fonts-options";
import { COLORS } from "@/config/validators/option-validator";

// Definición de tipos
type BaseDesignElement = {
  id: string;
  isSelected?: boolean;
  type: "image" | 'text' | "texture";
  rotation:number
  position: { x: number; y: number };
  size:{ width: number; height: number };
};

export type ImageElement = BaseDesignElement & {
  url: string;
  flipX?:boolean;
  flipY?:boolean
};

export type TextElement = BaseDesignElement & {
  content: string;
  direction?: "horizontal" | "vertical";
  fontSize?: number;
  font: FontType;
  color: string;
  isManualFontSize?: boolean;

};

export type DesignElement = TextElement | ImageElement;

export interface Device {
  id: string;
  name: string;
}

export interface Material {
  id: string;
  name: string;
}

export interface Texture {
  id: string;
  src: string;
  position?: { x: number; y: number };
  size: { width: number; height: number };
}

export interface Text {
  color: FontColor;
  font: FontType;
}

export interface DesignOptions {
  color: {
    hex: string;
    label: string;
    tw: string;
    value: string;
  };
  device: Device;
  material: Material;
  texture: Texture;
  text: Text;
}

interface ConfiguratorDimensions {
  container: {
    width: number;
    height: number;
    x: 0;
    y: 0;
  };
  phone: {
    x: number;
    y: number;
    width: number;
    height: number;
    borderRadius:number[]
  };
}

// Dividimos los contextos para evitar re-renderizados innecesarios
// Contexto para opciones de diseño
interface OptionsContextType {
  designOptions: DesignOptions;
  setDesignOptions: React.Dispatch<React.SetStateAction<DesignOptions>>;
}

// Contexto para elementos de diseño
interface ElementsContextType {
  designElements: DesignElement[];
  selectedElement: DesignElement | null;
  setDesignElements: React.Dispatch<React.SetStateAction<DesignElement[]>>;
  removeDesignElement: (id: string) => void;
  updateDesignElement: (item: DesignElement) => void;
  setSelectDesignElement: (designElementId: string) => void;
  unselectAllElements: () => void;
  createDesignElement:(item:DesignElement)=>void
}

// Contexto para UI
interface UIContextType {
  configuratorDimensions: ConfiguratorDimensions;
  openSelectDeviceSidebar: boolean;
  showSurrondingImage: boolean;
  stageRef: React.RefObject<any>;
  stageContainerRef: React.RefObject<HTMLDivElement>;
  phoneContainerRef:React.RefObject<any>
  setConfiguratorDimensions: React.Dispatch<React.SetStateAction<ConfiguratorDimensions>>;
  setOpenSelectDeviceSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSurrondingImage: React.Dispatch<React.SetStateAction<boolean>>;
  updateStageDimensions: () => void;
  konvaPhoneLayerRefHandler:(layer:any)=>void;
  getStageImage: () => Promise<string>;
}

const OptionsContext = createContext<OptionsContextType | null>(null);
const ElementsContext = createContext<ElementsContextType | null>(null);
const UIContext = createContext<UIContextType | null>(null);

export const useDesignOptions = () => {
  const context = useContext(OptionsContext);
  if (!context) {
    throw new Error("useDesignOptions debe usarse dentro de un DesignProviderV2");
  }
  return context;
};

export const useDesignElements = () => {
  const context = useContext(ElementsContext);
  if (!context) {
    throw new Error("useDesignElements debe usarse dentro de un DesignProviderV2");
  }
  return context;
};

export const useDesignUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useDesignUI debe usarse dentro de un DesignProviderV2");
  }
  return context;
};

export const useDesignV2 = () => {
  const optionsContext = useContext(OptionsContext);
  const elementsContext = useContext(ElementsContext);
  const uiContext = useContext(UIContext);
  
  if (!optionsContext || !elementsContext || !uiContext) {
    throw new Error("useDesignV2 debe usarse dentro de un DesignProviderV2");
  }
  
  return {
    ...optionsContext,
    ...elementsContext,
    ...uiContext
  };
};

export function DesignProviderV2({ children }: { children: React.ReactNode }) {
  return (
    <OptionsProvider>
      <ElementsProvider>
        <UIProvider>
          {children}
        </UIProvider>
      </ElementsProvider>
    </OptionsProvider>
  );
}

function OptionsProvider({ children }: { children: React.ReactNode }) {
  const [designOptions, setDesignOptions] = useState<DesignOptions>({
    color: COLORS[0],
    device: { id: "", name: "" },
    material: { id: "", name: "" },
    texture: { id: "", src: "", size: { width: 0, height: 0 } },
    text: { color: FONT_COLORS[0], font: CUSTOM_FONTS[0] }
  });

  const value = useMemo(() => ({
    designOptions,
    setDesignOptions
  }), [designOptions]);

  return (
    <OptionsContext.Provider value={value}>
      {children}
    </OptionsContext.Provider>
  );
}

function ElementsProvider({ children }: { children: React.ReactNode }) {
  const [designElements, setDesignElements] = useState<DesignElement[]>([]);

  const removeDesignElement = useCallback((id: string) => {
    setDesignElements(prev => prev.filter(el => el.id !== id));
  }, []);

  const updateDesignElement = (item: DesignElement) => {

    setDesignElements(prev => prev.map(el =>
      el.id === item.id ? { ...el, ...item } : el
    ))
  }

  const createDesignElement = (item:DesignElement)=>{
    setDesignElements(prev => ([...prev,item]));

  }

  const unselectAllElements = useCallback(() => {
    setDesignElements(prev =>
      prev.map(el => ({
        ...el,
        isSelected: false,
      }))
    );
  }, []);


  const setSelectDesignElement = useCallback((selectedId: string) => {
    setDesignElements(prev => {
      if (prev.some(el => el.id === selectedId && el.isSelected)) {
        return prev;
      }
      return prev.map(el => ({
        ...el,
        isSelected: el.id === selectedId,
      }));
    });
  }, []);

  const selectedElement = useMemo(() => 
    designElements.find(item => item.isSelected === true) || null, 
    [designElements]
  );

  const value = useMemo(() => ({
    designElements,
    selectedElement,
    setDesignElements,
    removeDesignElement,
    updateDesignElement,
    setSelectDesignElement,
    unselectAllElements,
    createDesignElement
  }), [designElements, selectedElement, removeDesignElement, setSelectDesignElement, unselectAllElements]);


  return (
    <ElementsContext.Provider value={value}>
      {children}
    </ElementsContext.Provider>
  );
}

function UIProvider({ children }: { children: React.ReactNode }) {
  // Estados del UI
  const [configuratorDimensions, setConfiguratorDimensions] = useState<ConfiguratorDimensions>({
    container: { width: 0, height: 0, x: 0, y: 0 },
    phone: { x: 0, y: 0, width: 200, height: 400, borderRadius: [0, 0, 0, 0] },
  });
  const [openSelectDeviceSidebar, setOpenSelectDeviceSidebar] = useState<boolean>(false);
  const [showSurrondingImage, setShowSurrondingImage] = useState<boolean>(true);
  
  // Referencias
  const stageContainerRef = useRef<any>(null);
  const phoneContainerRef = useRef<any>(null);

  const konvaPhoneLayerRefHandler = (layerNode: any) => {
    if (layerNode) {
      const sourceCanvas = layerNode.canvas._canvas;
      phoneContainerRef.current = sourceCanvas;
    } else {
      phoneContainerRef.current = undefined;
    }
  };

  const stageRef = useRef<any>(null);

  // Función para calcular radio de las esquinas
  const getCornerRadiusFromPercentages = (width: number, xPercent: number): [number, number, number, number] => {
    const radius = width * (xPercent / 100);
    return [radius, radius, radius, radius];
  };

  // Función para actualizar dimensiones
  const updateStageDimensions = () => {
    const container = stageContainerRef.current;
    if (!container) return;

    const { width, height, top, left } = container.getBoundingClientRect();

    const MAX_PHONE_WIDTH = 300;
    const MAX_PHONE_HEIGHT = 600;
    const aspectRatio = configuratorDimensions.phone.width / configuratorDimensions.phone.height;

    // Calcular tamaño base (75% del contenedor)
    let phoneWidth = width * 0.75;
    let phoneHeight = height * 0.75;

    // Ajustar a relación de aspecto
    const containerRatio = phoneWidth / phoneHeight;
    if (containerRatio > aspectRatio) {
      phoneWidth = phoneHeight * aspectRatio;
    } else {
      phoneHeight = phoneWidth / aspectRatio;
    }

    // Limitar por dimensiones máximas
    if (phoneWidth > MAX_PHONE_WIDTH) {
      phoneWidth = MAX_PHONE_WIDTH;
      phoneHeight = phoneWidth / aspectRatio;
    }
    if (phoneHeight > MAX_PHONE_HEIGHT) {
      phoneHeight = MAX_PHONE_HEIGHT;
      phoneWidth = phoneHeight * aspectRatio;
    }

    const borderRadius = getCornerRadiusFromPercentages(phoneWidth, 16);

    setConfiguratorDimensions({
      container: { width, height, x: top, y: left },
      phone: {
        width: phoneWidth,
        height: phoneHeight,
        x: (width - phoneWidth) / 2,
        y: (height - phoneHeight) / 2,
        borderRadius,
      },
    } as any);
  };

 
  // Función para descargar la imagen del stage
  const getStageImage = async() => {
    if (!stageRef.current) return;
  
    const stage = stageRef.current;
    const { phone } = configuratorDimensions;
  
    // Hide all Transformer nodes before exporting.
    const transformers = stage.find('Transformer');
    transformers.forEach((transformer:any) => transformer.hide());
    stage.draw();
  
    phoneContainerRef.current.hide();
    // Export only the phone area with the specified options.
    const dataURL = await stage.toBlob({
      x: phone.x,
      y: phone.y,
      width: phone.width,
      height: phone.height,
      pixelRatio: 7,
    });
    phoneContainerRef.current.show();

    // Restore the visibility of the Transformer nodes.
    transformers.forEach((transformer:any) => transformer.show());
    stage.draw();

    console.log('base 64 image',dataURL)
  
    return dataURL
  };



  // Memoizar el valor del contexto
  const value = useMemo(() => ({
    configuratorDimensions,
    openSelectDeviceSidebar,
    showSurrondingImage,
    stageRef,
    phoneContainerRef,
    stageContainerRef,
    setConfiguratorDimensions,
    setOpenSelectDeviceSidebar,
    setShowSurrondingImage,
    updateStageDimensions,
    getStageImage,
    konvaPhoneLayerRefHandler,
  }), [
    configuratorDimensions,
    openSelectDeviceSidebar,
    showSurrondingImage,
    stageContainerRef.current,
    phoneContainerRef.current,
    getStageImage,
    updateStageDimensions,
  ]);
  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
}