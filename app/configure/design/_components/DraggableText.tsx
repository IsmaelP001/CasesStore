"use client";
import { Rnd } from "react-rnd";
import { useDesign } from "../hooks/useDesign-context";
import HandleComponent from "./HandleComponent";
import { useEffect, useRef, useState } from "react";

export const DraggableText = () => {
  const { textState, setTextState, selectedElement, setSelectedElement } =
    useDesign();
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const rndRef = useRef<Rnd>(null);

  const updateContainerSize = () => {
    if (rndRef.current) {
      const element = rndRef.current.getSelfElement();
      if (element) {
        const { clientWidth, clientHeight } = element;
        if (clientWidth > 0 && clientHeight > 0) {
          setContainerSize({
            width: clientWidth,
            height: clientHeight
          });
        }
      }
    }
  };

  useEffect(() => {
    updateContainerSize();
    const timer = setTimeout(updateContainerSize, 50);
    return () => clearTimeout(timer);
  }, [textState.size]);

  useEffect(() => {
    const interval = setInterval(updateContainerSize, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <Rnd
      ref={rndRef}
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
      onResize={() => {
        updateContainerSize();
      }}
      onResizeStop={(_, __, ref) => {
        const width = parseInt(ref.style.width);
        const height = parseInt(ref.style.height);
        
        setTextState((prev) => ({
          ...prev,
          size: {
            ...prev.size,
            width,
            height,
          },
        }));
        
        setContainerSize({ width, height });
        
        setTimeout(updateContainerSize, 50);
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
        updateContainerSize();
      }}
    
    >
      <TextContent containerSize={containerSize} />
    </Rnd>
  );
};

interface TextContentProps {
  containerSize: {
    width: number;
    height: number;
  };
}

const TextContent = ({ containerSize }: TextContentProps) => {
  const { textState, textContainerRef } = useDesign();
  const [fontSize, setFontSize] = useState<number>(40);

  const prevDirectionRef = useRef(textState.direction);
  
  const calculateFontSize = () => {
    if (containerSize.width <= 10 || containerSize.height <= 10) return;
    
    const { width, height } = containerSize;
    const content = textState.content || " ";
    const contentLength = Math.max(content.length, 1);
    
    const directionChanged = prevDirectionRef.current !== textState.direction;
    prevDirectionRef.current = textState.direction;
    
    if (directionChanged) {
      return;
    }
    
    let newFontSize;
    const isVertical = textState.direction === "vertical";
    
    const availableWidth = width * 0.9;
    const availableHeight = height * 0.9;
    
    const widthPerChar = availableWidth / contentLength;
    
    newFontSize = Math.min(widthPerChar * 1.8, availableHeight * 0.8);
    //alternativa calcular font por alto en vertical
    // const heightPerChar = availableHeight / contentLength;
    // newFontSize = Math.min(heightPerChar * 1.2, availableWidth * 0.8);
    
    const minSize = 10;
    const maxSize = 500;
    const finalSize = Math.max(minSize, Math.min(newFontSize, maxSize));
    
    // Solo actualizar si hay un cambio significativo
    const sizeChange = Math.abs(fontSize - finalSize);
    if (sizeChange > 2) {
      setFontSize(finalSize);
    }
  };
  
  useEffect(() => {
    calculateFontSize();
  }, [containerSize, textState.content, textState.direction]);

  return (
    <div
      ref={textContainerRef}
      className="w-full h-full absolute inset-0 flex items-center justify-center select-none overflow-hidden"
      style={{ margin: 0, padding: 0 }}
    >
      <div
        className="select-none w-full h-full flex items-center justify-center"
        style={{
          width: "100%",
          height: "100%",
          writingMode:
            textState.direction === "horizontal"
              ? "horizontal-tb"
              : "vertical-rl",
          lineHeight: 1,
          fontSmooth: "always",
          filter: "contrast(1.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontFamily: textState.font,
          color: textState.color.hex,
          overflow: "hidden",
          wordWrap: "break-word",
          whiteSpace: textState.direction === "vertical" ? "pre-wrap" : "nowrap",
          fontSize: `${fontSize}px`,
          padding: "0 5px",
          letterSpacing: "normal",
          maxHeight: "100%",
          maxWidth: "100%",
        }}
      >
        {textState.content}
      </div>
    </div>
  );
};