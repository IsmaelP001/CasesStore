"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ImageElement,
  useDesignElements,
} from "../hooks/useDesign-contextV2";
import { cn } from "@/lib/utils/utils";
import { Trash, X } from "lucide-react";
import {
  MdFlip,
  MdContentCopy,
  MdPhotoSizeSelectLarge,
} from "react-icons/md";

import useImageEdit from "../hooks/useImageEdit";
export function ImageItem({
  item,
  onUpdate,
  onDelete,
}: {
  item: ImageElement;
  onUpdate: (data: ImageElement) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      className={cn(
        "p-2 space-y-1 rounded-md border-2 relative",
        item?.isSelected ? "border-blue-500" : "border-gray-300"
      )}
    >
      <div>
        <Label>Rotacion</Label>
        <div className="flex items-end gap-x-1 w-full">
          <div className="bg-gray-200 rounded-md p-2 w-10 h-10 overflow-hidden">
            {item.url ? (
              <img
                src={item.url}
                alt="preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <span>No Img</span>
            )}
          </div>
          <div className="flex gap-1 w-full flex-grow rounded-md">
            <Input
              type="number"
              className="flex-grow w-full"
              value={item.rotation || 0}
              onChange={(e) =>
                onUpdate({ ...item, rotation: parseFloat(e.target.value) })
              }
            />
            <div className="bg-gray-200 text-sm pt-2 font-medium px-2 rounded-md">
              Deg
            </div>
          </div>
          <button
            onClick={() => onDelete(item.id)}
            className="border border-gray-200 rounded-md w-10 h-10"
          >
            <Trash className="text-red-600 m-auto" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <Label>Ancho</Label>
          <Input
            type="number"
            value={item.size.width}
            onChange={(e) =>
              onUpdate({
                ...item,
                size: { ...item.size, width: parseFloat(e.target.value) },
              })
            }
          />
        </div>
        <div className="flex flex-col">
          <Label>Alto</Label>
          <Input
            type="number"
            value={item.size.height}
            onChange={(e) =>
              onUpdate({
                ...item,
                size: { ...item.size, height: parseFloat(e.target.value) },
              })
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label>Posición top</Label>
          <Input
            type="number"
            value={item.position.y.toFixed(2)}
            onChange={(e) =>
              onUpdate({
                ...item,
                position: { ...item.position, y: parseFloat(e.target.value) },
              })
            }
          />
        </div>
        <div>
          <Label>Posición left</Label>
          <Input
            type="number"
            value={item.position.x.toFixed(2)}
            onChange={(e) =>
              onUpdate({
                ...item,
                position: { ...item.position, x: parseFloat(e.target.value) },
              })
            }
          />
        </div>
      </div>
      <EditImageToolbar className=" justify-between" />
    </div>
  );
}

export default function ImageEditContainer() {
  const { designElements, updateDesignElement, removeDesignElement,unselectAllElements } =
    useDesignElements();

  const imageElements = designElements.filter((item) => item.type === "image" || item.type === 'texture');

  return (
    <div>
      <header className="flex justify-between items-center !z-[999]">
        <h3 className="font-semibold text-xl mb-2 ">Editar imagenes</h3>
        <button onClick={() => unselectAllElements()}>
          <X />
        </button>
      </header>{" "}
      <div className="space-y-2">
        {imageElements.length > 0 &&
          imageElements.map((item) => (
            <ImageItem
              key={item.id}
              item={item as any}
              onUpdate={updateDesignElement}
              onDelete={removeDesignElement}
            />
          ))}
      </div>
    </div>
  );
}

export function EditImageToolbar({ className }: { className?: string }) {
  const {
    fitImageContainerSize,
    flipImageHorizontally,
    flipImageVertically,
    duplicateElement,
  } = useImageEdit();

  return (
    <div className={cn("flex gap-2", className)}>
      <button
        onClick={fitImageContainerSize}
        className="border border-gray-300 rounded-md px-2 py-1"
      >
        <MdPhotoSizeSelectLarge size={25} />
      </button>

      <button
        onClick={flipImageHorizontally}
        className="border border-gray-300 rounded-md px-2 py-1"
      >
        <MdFlip size={25} />
      </button>

      <button
        onClick={flipImageVertically}
        className="border border-gray-300 rounded-md px-2 py-1"
      >
        <MdFlip className=" rotate-90" size={25} />
      </button>

      <button
        onClick={duplicateElement}
        className="border border-gray-300 rounded-md px-2 py-1"
      >
        <MdContentCopy size={25} />
      </button>
    </div>
  );
}

export function ImageEditfigurationMobile() {
  const { removeDesignElement, selectedElement } = useDesignElements();
  return (
    <div className="flex gap-2 items-center  z-40">
      <EditImageToolbar className=" gap-2" />
      <button
        className="px-2.5 py-1.5 rounded-xl font-semibold border-2 border-gray-300 "
        onClick={() => removeDesignElement(selectedElement?.id!)}
      >
        <Trash size={20} className="text-center  text-red-600 m-auto" />
      </button>
    </div>
  );
}
