"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { ChangeEvent, useRef, useState, useEffect } from "react";
import { useDesign } from "../hooks/useDesign-context";
import { useMediaQuery } from "react-responsive";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  TextElement,
  useDesignElements,
  useDesignOptions,
  useDesignUI,
} from "../hooks/useDesign-contextV2";
import { v4 as uuidv4 } from "uuid";
import { useIsMobile } from "@/hooks/use-mobile";
import { Textarea } from "@/components/ui/textarea";

function CustomTextInput() {
  const {
    createDesignElement,
    updateDesignElement,
    setSelectDesignElement,
    selectedElement,
  } = useDesignElements();
  const { designOptions } = useDesignOptions();
  const { configuratorDimensions } = useDesignUI();
  const isMobile = useIsMobile();

  const [inputValue, setInputValue] = useState("");
  const textIdRef = useRef("");
  const isCreatedRef = useRef(false);

  useEffect(() => {
    const selectedTextElement: any =
      selectedElement && selectedElement?.type === "text"
        ? selectedElement
        : null;
    if (!textIdRef.current && !selectedTextElement) {
      textIdRef.current = uuidv4();
      isCreatedRef.current = false;
    } else if (selectedTextElement) {
      textIdRef.current = selectedTextElement.id;
      setInputValue(selectedTextElement.content);
      isCreatedRef.current = true;
    }
  }, [selectedElement]);

  const handleTextChange = (e: any) => {
    const value = e.target.value;
    setInputValue(value);

    const width = 230;
    const height = 180;
    const containerCenterX = configuratorDimensions.container.width / 2;
    const containerCenterY = configuratorDimensions.container.height / 2;

    const x = containerCenterX;
    const y = containerCenterY;

    const textElement: TextElement = {
      id: textIdRef.current,
      type: "text",
      content: value,
      position: { x, y },
      rotation: 0,
      font: designOptions.text.font,
      color: designOptions.text.color.hex,
      size: { width, height },
      isSelected: false,
    };

    if (isCreatedRef.current) {
      updateDesignElement(textElement);
    } else {
      createDesignElement(textElement);
      isCreatedRef.current = true;
    }
  };

  const handleBlur = () => {
    if (inputValue.trim() !== "") {
      textIdRef.current = uuidv4();
      isCreatedRef.current = false;
      setInputValue("");
    }
  };

  if (isMobile) {
    return (
      <div className="px-2">
        <Input
          type="text"
          className="rounded-xl"
          autoFocus
          value={inputValue}
          onChange={handleTextChange}
          onBlur={handleBlur}
        />
      </div>
    );
  }
  return (
    <div className="">
      <Textarea
        className="rounded-xl max-h-16"
        placeholder="Escribe tu texto aqui!"
        autoFocus
        value={inputValue}
        onChange={handleTextChange}
        onBlur={handleBlur}
      />
    </div>
  );
}

export default function TextCustomConfigurator() {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const { selectedElement } = useDesignElements();

  const textElement = (
    selectedElement && selectedElement?.type === "text" ? selectedElement : null
  ) as TextElement | null;

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="flex-grow">
          <div className="rounded-xl bg-white border-2  text-gray-500 border-gray-300 flex-grow h-8 flex items-center px-3 tracking-wider py-5">
            {textElement ? textElement.content : "Escribe tu texto aqui!"}
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Texto Personalizado</DrawerTitle>
          </DrawerHeader>
          <div className="px-2">
            <CustomTextInput />
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
    <div className="space-y-1">
      <Label className="font-semibold text-base">Texto Personalizado</Label>
      <div className="px-2">
        <CustomTextInput />
      </div>
    </div>
  );
}

