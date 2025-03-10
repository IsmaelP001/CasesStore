// components/DraggableImage.tsx
"use client";
import { Rnd } from "react-rnd";
import NextImage from "next/image";
import { ImageState, useDesign } from "../hooks/useDesign-context";
import HandleComponent from "./HandleComponent";
import DeleteSelectedElement from "./DeleteSelectedElement";

interface DraggableImageProps {
  image: ImageState;
}
export const DraggableImage = ({ image }: DraggableImageProps) => {
  const {setImagesState, selectedElement, setSelectedElement } =
    useDesign();

  const handleDelete = (url: string) => {
    setImagesState((prev) => prev.filter((image) => image.url !== url));
  };

  return (
    <Rnd
      default={{
        x: image.position.x,
        y: image.position.y,
        height: image.height,
        width: image.width,
      }}
      onResizeStop={(_, __, ref, ___, position) => {
        setImagesState((prev) =>(
          prev.map((item) => {
            if (item.url === image.url) {
              return {
                ...item,
                position: { x: position.x, y: position.y },
                width: parseInt(ref.style.width),
                height: parseInt(ref.style.height),
              };
            }
            return item
          })
        ));
      }}
      onDragStop={(_, data) => {
        setImagesState((prev) =>(
          prev.map((item) => {
            if (item.url === image.url) {
              return {
                ...item,
                position: { x: data.x, y: data.y },
              };
            }
            return item
          })
        ));
      }}
      lockAspectRatio
      resizeHandleComponent={{
        bottomRight:
          selectedElement === `image-${image.url}` ? (
            <HandleComponent />
          ) : undefined,
        bottomLeft:
          selectedElement === `image-${image.url}` ? (
            <DeleteSelectedElement deleteFn={() => handleDelete(image.url!)} />
          ) : undefined,
        topRight:
          selectedElement === `image-${image.url}` ? (
            <HandleComponent />
          ) : undefined,
        topLeft:
          selectedElement === `image-${image.url}` ? (
            <HandleComponent />
          ) : undefined,
      }}
      onClick={(e: any) => {
        setSelectedElement(`image-${image.url}`);
      }}
    >
      <div className="relative w-full h-full">
        <NextImage
          src={image.url!}
          fill
          alt="your image"
          className="pointer-events-none object-cover"
        />
      </div>
    </Rnd>
  );
};
