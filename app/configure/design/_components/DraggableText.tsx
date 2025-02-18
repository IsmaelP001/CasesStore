// components/DraggableText.tsx
"use client";
import { Rnd } from "react-rnd";
import { Textfit } from "react-textfit";
import { useDesign } from "../hooks/useDesign-context";
import HandleComponent from "./HandleComponent";
import { useEffect } from "react";

export const DraggableText = () => {
  const { textState, setTextState, selectedElement, setSelectedElement } =
    useDesign();



  return (
    <Rnd
      default={{
        x: textState.position.x,
        y: textState.position.y,
        width: textState.size.width,
        height: textState.size.height,
      }}
      position={textState.position}
      size={textState.size}
      onDragStop={(_, data) =>
        setTextState((prev) => ({
          ...prev,
          position: { x: data.x, y: data.y },
        }))
      }
      onResizeStop={(_, __, ref) => {
        setTextState((prev) => ({
          ...prev,
          size: {
            ...prev.size,
            width: parseInt(ref.style.width),
            height: parseInt(ref.style.height),
          },
        }));
      }}
      resizeHandleComponent={{
        bottomRight:
          selectedElement === "text" ? <HandleComponent /> : undefined,
        bottomLeft:
          selectedElement === "text" ? <HandleComponent /> : undefined,
        topRight: selectedElement === "text" ? <HandleComponent /> : undefined,
        topLeft: selectedElement === "text" ? <HandleComponent /> : undefined,
      }}
      onClick={(e: any) => {
        setSelectedElement("text");
      }}
      bounds="parent"
    >
      <TextContent />
    </Rnd>
  );
};

const TextContent = () => {
  const { textState, textContainerRef } = useDesign();

  return (
    <div
      ref={textContainerRef}
      className="w-full h-full flex items-center justify-center select-none"
    >
      <Textfit
        mode={textState.direction === "vertical" ? "multi" : "single"}
        forceSingleModeWidth={textState.direction !== "vertical"}
        max={textState.direction === "vertical" ? 1000 : 270}
        className="px-5 select-none"
        style={{
          width: "100%",
          writingMode:
            textState.direction === "horizontal"
              ? "horizontal-tb"
              : "vertical-rl",

          height: "100%",
          lineHeight: 1,
          fontSmooth: "always",
          filter: "contrast(1.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontFamily: textState.font,
          color: textState.color.hex,
        }}
      >
        {textState.content}
      </Textfit>
    </div>
  );
};
