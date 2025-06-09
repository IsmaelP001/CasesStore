"use client";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ALargeSmall, ChevronLeft, Edit, Trash, X } from "lucide-react";
import {
  DesignElement,
  TextElement,
  useDesignElements,
  useDesignOptions,
  useDesignUI,
} from "../hooks/useDesign-contextV2";
import { cn } from "@/lib/utils/utils";
import {
  CUSTOM_FONTS,
  FONT_COLORS,
  FONT_SIZES,
} from "@/config/validators/fonts-options";
import {
  RxTextAlignBottom,
  RxTextAlignMiddle,
  RxTextAlignTop,
} from "react-icons/rx";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useTextPosition from "../hooks/useTextPosition";
import ColorPicker from "@/components/ColorPicker";

function truncateToTwoDecimals(num: number): number {
  return Math.floor(num * 100) / 100;
}

export function ColorEdit({
  item,
  onUpdate,
  close,
}: {
  item: any;
  close: () => void;
  onUpdate: (fontFamily: string) => void;
}) {
  return (
    <div className="absolute inset-0 flex flex-col bg-background">
      <button
        className="border-b py-0.5 flex items-center justify-center gap-x-1"
        onClick={close}
      >
        {" "}
        <ChevronLeft size={20} /> Atras
      </button>
      <div className="grid place-content-center place-items-center gap-2 h-full grid-cols-[repeat(auto-fill,minmax(60px,1fr))]  overflow-y-scroll px-4 py-1">
        {FONT_COLORS.map((color) => (
          <button
            className={cn(
              "block border-4 w-full  rounded-full size-10  px-2 py-0.5 text-start",
              color.hex === item.color && "border-blue-500"
            )}
            key={color.id}
            onClick={() => onUpdate(color.hex)}
            style={{ background: color.hex }}
          ></button>
        ))}
        <ColorPicker
          className="size-10 rounded-full"
          value={item.color}
          onChange={(e) => onUpdate(e.target.value)}
        />
      </div>
    </div>
  );
}

export function FontListEdit({
  item,
  onUpdate,
  close,
}: {
  item: any;
  close: () => void;
  onUpdate: (fontFamily: string) => void;
}) {
  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <button
        className="border-b py-0.5 flex items-center justify-center gap-x-1"
        onClick={close}
      >
        {" "}
        <ChevronLeft size={20} /> Atras
      </button>
      <div className="  overflow-y-scroll px-4 py-1">
        {CUSTOM_FONTS.map((font) => (
          <button
            className={cn(
              "block border w-full rounded-md px-2 py-0.5 text-start",
              font.fontFamily === item.font.fontFamily && "border-blue-500"
            )}
            key={font.id}
            onClick={() => onUpdate(font.fontFamily)}
            style={{ fontFamily: font.fontFamily }}
          >
            {font.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function SelectFontSize({
  item,
  onUpdate,
  className,
}: {
  item: any;
  onUpdate: (item: DesignElement) => void;
  className?: string;
}) {
  return (
    <Select
      value={item?.fontSize?.toString()}
      onValueChange={(value) =>
        onUpdate({
          ...item,
          fontSize: parseInt(value),
          isManualFontSize: true,
        } as any)
      }
    >
      <SelectTrigger className={cn("w-[80px]", className)}>
        <div>{item.fontSize}</div>
      </SelectTrigger>
      <SelectContent>
        {FONT_SIZES.map((size) => (
          <SelectItem key={size} value={size.toString()}>
            {size}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function TextItem({
  item,
  onUpdate,
  onDelete,
}: {
  item: any;
  onUpdate: (data: DesignElement) => void;
  onDelete: (id: string) => void;
}) {
  const [isFontEdit, setIsFontEdit] = useState<boolean>(false);
  const [isColorEdit, setIsColorEdit] = useState<boolean>(false);

  useEffect(() => {
    if (!item.content.length) {
      onDelete(item.id);
    }
  }, [item, onDelete]);
  return (
    <div
      className={cn(
        "p-2 space-y-1 rounded-md border-2 relative",
        item?.isSelected ? " border-blue-500" : "border-gray-300"
      )}
    >
      <div className=" flex gap-x-1 w-full">
        <div className="flex gap-1 flex-grow w-full ">
          <div className="bg-gray-200 rounded-md p-2 w-10 h-10 ">
            <ALargeSmall size={25} />
          </div>
          <Input
            className="flex-grow w-full"
            value={item.content}
            onChange={(e) => {
              const newValue = e.target.value;
              onUpdate({ ...item, content: newValue });
            }}
          />
        </div>
        <button onClick={() => onDelete(item.id)}>
          <Trash className="text-red-600" />
        </button>
      </div>

      <div className="grid gap-2 grid-cols-5  w-full ">
        <div className="flex col-span-3 gap-2 items-center text-sm font-medium ">
          <Label>Font:</Label>

          <p
            className="text-nowrap truncate"
            style={{ fontFamily: item.font.fontFamily }}
          >
            {item.font.name}
          </p>
          <button onClick={() => setIsFontEdit(true)}>
            <Edit size={18} className="text-blue-600" />
          </button>
        </div>
        <div className="flex col-span-2 gap-x-2 items-center text-sm font-medium ">
          <Label>Color:</Label>
          <p
            style={{ background: item.color }}
            className=" w-7 h-5 border-2 border-gray-300 rounded-md"
          ></p>
          <button onClick={() => setIsColorEdit(true)}>
            <Edit size={18} className="text-blue-600" />
          </button>
        </div>
      </div>
      <div className="grid gap-2 grid-cols-2 w-full">
        <div>
          <Label>Texto</Label>
          <SelectFontSize item={item} onUpdate={onUpdate} className="w-full" />
        </div>
        <div>
          <Label>Rotacion</Label>
          <div className="flex gap-1 rounded-md">
            <Input
              value={item.rotation}
              type="number"
              onChange={(e) => onUpdate({ ...item, rotation: e.target.value })}
            />
            <div className="bg-gray-200 text-sm pt-2 font-medium px-2 rounded-md">
              Deg
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <div>
          <Label>Posicion top</Label>
          <Input
            value={truncateToTwoDecimals(
              Math.floor(item.position.y * 100) / 100
            )}
            type="number"
            onChange={(e) =>
              onUpdate({
                ...item,
                position: { ...item.position, y: parseFloat(e.target.value) },
              })
            }
          />
        </div>
        <div>
          <Label>Posicion left</Label>
          <Input
            value={truncateToTwoDecimals(item.position.x.toFixed(2))}
            type="number"
            onChange={(e) =>
              onUpdate({
                ...item,
                position: { ...item.position, x: parseFloat(e.target.value) },
              })
            }
          />
        </div>
      </div>
      <TextPositionConfiguration className=" justify-between px-1 py-0.5" />

      {isFontEdit && (
        <FontListEdit
          item={item}
          onUpdate={(fontFamily: string) =>
            onUpdate({ ...item, font: { ...item.font, fontFamily } })
          }
          close={() => setIsFontEdit(false)}
        />
      )}
      {isColorEdit && (
        <ColorEdit
          item={item}
          onUpdate={(color: string) => onUpdate({ ...item, color })}
          close={() => setIsColorEdit(false)}
        />
      )}
    </div>
  );
}

export function TextEditContainer() {
  const {
    designElements,
    updateDesignElement,
    removeDesignElement,
    unselectAllElements,
  } = useDesignElements();

  const textElements = useMemo(() => {
    return designElements.filter((item) => item.type === "text");
  }, [designElements]);

  return (
    <div>
      <header className="flex justify-between items-center !z-[999]">
        <h3 className="font-semibold text-xl mb-2 ">Editar texto</h3>
        <button onClick={() => unselectAllElements()}>
          <X />
        </button>
      </header>
      <div className="space-y-2">
        {textElements?.length > 0 &&
          textElements.map((item) => (
            <TextItem
              key={item.id}
              item={item}
              onUpdate={updateDesignElement}
              onDelete={removeDesignElement}
            />
          ))}
      </div>
    </div>
  );
}

export function TextPositionConfiguration({
  className,
}: {
  className?: string;
}) {
  const { selectedElement, updateDesignElement } = useDesignElements();
  const positionCoordinates = useTextPosition();

  if (!positionCoordinates) return null;

  return (
    <div className={cn("flex items-center", className)}>
      <button
        className={cn(
          "px-2 py-1 rounded-md font-bold border-2 border-gray-300",
          selectedElement?.position.y === positionCoordinates.top.y &&
            "border-blue-500 bg-blue-50"
        )}
        onClick={() =>
          updateDesignElement({
            ...selectedElement,
            position: positionCoordinates.top,
          } as any)
        }
      >
        <RxTextAlignTop size={25} className="text-center pt-1.5" />
      </button>
      <button
        className={cn(
          "px-2 py-1 rounded-md font-semibold border-2 border-gray-300",
          selectedElement?.position.y === positionCoordinates.center.y &&
            "border-blue-500 bg-blue-50"
        )}
        onClick={() =>
          updateDesignElement({
            ...selectedElement,
            position: positionCoordinates.center,
          } as any)
        }
      >
        <RxTextAlignMiddle size={25} className="text-center py-0.5" />
      </button>
      <button
        className={cn(
          "px-2 py-1 rounded-md font-semibold border-2 border-gray-300",
          selectedElement?.position.y === positionCoordinates.bottom.y &&
            "border-blue-500 bg-blue-50"
        )}
        onClick={() =>
          updateDesignElement({
            ...selectedElement,
            position: positionCoordinates.bottom,
          } as any)
        }
      >
        <RxTextAlignBottom size={25} className="text-center pb-1" />
      </button>
    </div>
  );
}

export function TextPositionConfigurationMobile() {
  const { removeDesignElement, selectedElement, updateDesignElement } =
    useDesignElements();
  return (
    <div className="flex gap-2 items-center  z-40">
      <SelectFontSize
        className="w-[70px]"
        item={selectedElement}
        onUpdate={updateDesignElement}
      />
      <TextPositionConfiguration className=" gap-2" />
      <button
        className="px-2.5 py-1.5 rounded-md font-semibold border-2 border-gray-300 "
        onClick={() => removeDesignElement(selectedElement?.id!)}
      >
        <Trash size={20} className="text-center  text-red-600 m-auto" />
      </button>
    </div>
  );
}

export function TextOrientationMobileConfiguration() {
  const { selectedElement, updateDesignElement } = useDesignElements();

  const defaultOrientation = useMemo(() => {
    if (selectedElement?.type !== "text" || selectedElement?.rotation === 0) {
      return "horizontal";
    }
    if (selectedElement?.rotation === 90) {
      return "vertical";
    }
  }, [selectedElement]);

  const handleDesignOptions = (rotation: number) => {
    if (!selectedElement || selectedElement?.type !== "text") return;
    updateDesignElement({
      ...selectedElement,
      rotation,
    } as any);
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <div
          className={cn(
            " size-10 grid place-content-center border-2 border-blue-500 rounded-xl",
            defaultOrientation === "vertical" && "[writing-mode:vertical-lr]"
          )}
        >
          TT
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Orientación</DrawerTitle>
        </DrawerHeader>
        <div className="flex gap-4 mt-1 px-4">
          <button
            className={cn(
              "px-4 py-2 rounded-xl font-semibold border-2 border-gray-300",
              defaultOrientation === "horizontal" &&
                "border-blue-500 bg-blue-50"
            )}
            onClick={() => handleDesignOptions(0)}
          >
            TT
          </button>

          <button
            className={cn(
              "px-3 py-3 rounded-xl font-semibold border-2 border-gray-300 rotate-90",
              defaultOrientation === "vertical" && "border-blue-500 bg-blue-50 "
            )}
            onClick={() => handleDesignOptions(90)}
          >
            TT
          </button>
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
