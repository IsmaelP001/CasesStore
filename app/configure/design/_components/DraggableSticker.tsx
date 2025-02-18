// components/DraggableSticker.tsx
"use client";
import { Rnd } from "react-rnd";
import NextImage from "next/image";
import { useDesign } from "../hooks/useDesign-context";
import HandleComponent from "./HandleComponent";
import DeleteSelectedElement from "./DeleteSelectedElement";

type DraggableStickerProps = {
  sticker: {
    id: string;
    image: { src: string };
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

export const DraggableSticker = ({ sticker }: DraggableStickerProps) => {
  const { setStickersState, selectedElement, setSelectedElement } = useDesign();

  const handleDeleteSticker = (id: any) => {
    setStickersState((prev) => ({
      ...prev,
      items: prev.items.filter((sticker) => sticker.id !== id),
    }));
  };
  return (
    <Rnd
      default={{
        x: sticker.x,
        y: sticker.y,
        height: sticker.height,
        width: sticker.width,
      }}
      
      onResizeStop={(_, __, ref, ___, position) => {
        setStickersState((prev) => ({
          ...prev,
          selectedId: sticker.id,
          items: prev.items.map((item) =>
            item.id === sticker.id
              ? {
                  ...item,
                  x: position.x,
                  y: position.y,
                  width: parseInt(ref.style.width),
                  height: parseInt(ref.style.height),
                }
              : item
          ),
        }));
      }}
      onDragStop={(_, data) => {
        setStickersState((prev) => ({
          ...prev,
          selectedId: sticker.id,
          items: prev.items.map((item) =>
            item.id === sticker.id ? { ...item, x: data.x, y: data.y } : item
          ),
        }));
      }}
      lockAspectRatio
      enableResizing={{
        bottomRight: selectedElement === `sticker-${sticker.id}`,
        bottomLeft: selectedElement === `sticker-${sticker.id}`,
        topRight: selectedElement === `sticker-${sticker.id}`,
        topLeft: selectedElement === `sticker-${sticker.id}`,
      }}
      resizeHandleComponent={{
        bottomRight: <HandleComponent />,
        bottomLeft: (
          <DeleteSelectedElement
            deleteFn={() => handleDeleteSticker(sticker.id)}
          />
        ),
        topRight: <HandleComponent />,
        topLeft: <HandleComponent />,
      }}
      onClick={(e: any) => {
        setSelectedElement(`sticker-${sticker.id}`);
      }}
    >
      <div className="relative w-full h-full">
        <NextImage
          src={sticker.image.src}
          fill
          alt="sticker"
          className="pointer-events-none object-cover"
        />
      </div>
    </Rnd>
  );
};
