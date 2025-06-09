import React, { useRef, useEffect } from "react";

import useImage from "use-image";
import { DesignElement, ImageElement } from "../hooks/useDesign-contextV2";
import { Image as ImageKonva, Transformer } from "react-konva";

interface KonvaImageProps {
  item: ImageElement;
  onChange: (item: DesignElement) => void;
  selectedItem:DesignElement | null
  onSelect: (id:string) => void;
}
const ResizableKonvaImage = ({ item, onChange,onSelect,selectedItem, ...props }: KonvaImageProps) => {
  const shapeRef = useRef(null);
  const trRef = useRef<any>(null);
  const [image] = useImage(item.url, "anonymous");

  useEffect(() => {
    if (selectedItem && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [image,selectedItem]);

  return (
    <>
      <ImageKonva
        {...props}
        image={image}
        draggable
        onClick={()=>onSelect(item.id)}
        onTap={()=>onSelect(item.id)}
        onDragStart={() => onSelect(item.id)}
        ref={shapeRef}
        zIndex={5}
        width={item.size.width}
        height={item.size.height}
        scaleX={item.flipX? -1 : 1}
        scaleY={item.flipY? -1 : 1}
        rotation={item.rotation || 0}
        offsetX={item.size.width / 2}  
        offsetY={item.size.height / 2} 
        x={item.position.x}
        y={item.position.y}
        onDragMove={(e) => {
          onChange({
            ...item,
            position: { x: e.target.x(), y: e.target.y() },
          });
        }}
        onDragEnd={(e) => {
          onChange({
            ...item,
            position: { x: e.target.x(), y: e.target.y() },
          });
        }}
        onTransform={(e) => {
          const node = shapeRef.current as any;
          if (!node) return;
        
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          const rotation = node.rotation();
        
          const hasScaled =
            Math.abs(scaleX) !== 1 || Math.abs(scaleY) !== 1;
        
          if (hasScaled) {
            const width = Math.max(50, node.width() * Math.abs(scaleX));
            const height = Math.max(50, node.height() * Math.abs(scaleY));
            const newFlipX = scaleX < 0;
            const newFlipY = scaleY < 0;
        
            node.scaleX(1);
            node.scaleY(1);
        
            onChange({
              ...item,
              position: { x: node.x(), y: node.y() },
              size: { width, height },
              flipX: newFlipX,
              flipY: newFlipY,
              rotation,
            });
          } else {
            onChange({
              ...item,
              position: { x: node.x(), y: node.y() },
              rotation,
            });
          }
        }}
        
      />
      {item.id ===   selectedItem?.id && (
        <Transformer
          className="handle-component"
          ref={trRef}
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-left",
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
          rotateEnabled={true}
          centeredScaling={true}
          rotationSnaps={[0, 45, 90, 135, 180, 225, 270, 315]} // Ayuda para alinear rotaciones
          keepRatio={true}        />
      )}
    </>
  );
};

export default ResizableKonvaImage;
