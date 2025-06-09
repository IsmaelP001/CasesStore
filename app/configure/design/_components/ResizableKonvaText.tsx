"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Text as KonvaText, Transformer } from "react-konva";
import { DesignElement, TextElement } from "../hooks/useDesign-contextV2";

interface KonvaTextProps {
  item: TextElement;
  selectedItem: DesignElement | null;
  onChange: (item: DesignElement) => void;
  onSelect: (id: string) => void;
}


const ResizableText = ({
  item,
  onChange,
  onSelect,
  selectedItem,
}: KonvaTextProps) => {
  const textRef = useRef<any>(null);
  const trRef = useRef<any>(null);
  const textContainerRef = useRef(null);
  const [localPos, setLocalPos] = useState(item.position);

  useEffect(() => {
    setLocalPos(item.position);
  }, [item.position]);


  const isSelected = useMemo(() => {
    return item.id === selectedItem?.id;
  }, [item, selectedItem]);

  const calculateOptimalFontSize = useCallback(() => {
    if (!textRef.current || !item.content) return item.fontSize;
    const context = textRef.current
      .getLayer()
      .getCanvas()
      ._canvas.getContext("2d");

    let min = 1;
    let max = 500;
    let best = min;

    while (min <= max) {
      const mid = Math.floor((min + max) / 2);
      context.font = `${mid}px ${item.font.fontFamily || "Arial"}`;
      const metrics = context.measureText(item.content);
      const textHeight = mid * 1.2;
      if (metrics.width <= item.size.width && textHeight <= item.size.height) {
        best = mid;
        min = mid + 1;
      } else {
        max = mid - 1;
      }
    }
    return Math.floor(best * 0.95);
  }, [item]);

  const calculateContainerSize = useCallback(() => {
    if (!textRef.current || !item.content) return item.size;
    const context = textRef.current
      .getLayer()
      .getCanvas()
      ._canvas.getContext("2d");

    context.font = `${item.fontSize}px ${item.font.fontFamily || "Arial"}`;
    const metrics = context.measureText(item.content);
    
    const width = Math.max(metrics.width * 1.1, 50);
    const height = Math.max(item?.fontSize! * 1.5, 50);
    
    return { width, height };
  }, [item.content, item.fontSize, item.font?.fontFamily]);

  useEffect(() => {
    if (!item.isManualFontSize && textRef.current) {
      const newFontSize = calculateOptimalFontSize();
      if (newFontSize !== item.fontSize) {
        onChange({ ...item, fontSize: newFontSize });
      }
    }
  }, [item, calculateOptimalFontSize, onChange]);

useEffect(() => {
  if (item.isManualFontSize && textRef.current) {
    const newSize = calculateContainerSize();
    if (
      newSize.width !== item.size.width ||
      newSize.height !== item.size.height
    ) {
      onChange({ 
        ...item, 
        size: newSize 
      });
    }
  }
}, [item.isManualFontSize, item.fontSize, item.content]);

  useEffect(() => {
    if (trRef.current && textRef.current) {
      trRef.current.nodes([textRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [selectedItem]);




  return (
    <div ref={textContainerRef}>
      <KonvaText
        ref={textRef}
        x={item.position.x}
        y={item.position.y}
        width={item.size.width}
        height={item.size.height}
        text={item.content}
        fontSize={item.fontSize}
        fontFamily={item.font?.fontFamily || "Arial"}
        fill={item.color}
        offsetX={item.size.width / 2}
        offsetY={item.size.height / 2}
        align="center"
        className="resizable-element"
        verticalAlign="middle"
        draggable
        rotation={item.rotation || 0}
        onClick={() => onSelect(item.id)}
        onTap={() => onSelect(item.id)}
        onDragStart={() => onSelect(item.id)}
        onDragMove={(e) => {
          onChange({
            ...item,
            position: { x: e.target.x(), y: e.target.y() },
          });
        }}
        onDragEnd={(e) => {
          const node = textRef.current as any;
          const absPos = node.getAbsolutePosition(); 
          console.log('abs pos', absPos);
          console.log("konva position", e.target.x(), e.target.y());
          onChange({
            ...item,
            position: { x: e.target.x(), y: e.target.y() },
          });
        }}
        onTransform={(e) => {
          const node = textRef.current as any;
          if (!node) return;

          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...item,
            size: {
              width: Math.max(50, node.width() * scaleX),
              height: Math.max(50, node.height() * scaleY),
            },
            rotation: node.rotation(),
            isManualFontSize: false
          });
        }}
      />

      {isSelected && (
        <>
          <Transformer
            ref={trRef}
            className="handle-component"
            enabledAnchors={[
              "top-left",
              "top-right",
              "top-center",
              "bottom-left",
              "bottom-center",
              "bottom-right",
            ]}
            anchorSize={12}
            borderStroke="black"
            borderDash={[4, 4]}
            anchorStyleFunc={(anchor) => {
              anchor.fill("black");
              anchor.width(10);
              anchor.height(10);
              anchor.cornerRadius(5);
            }}
            
          />
          

        </>
      )}
    </div>
  );
};

export default ResizableText;