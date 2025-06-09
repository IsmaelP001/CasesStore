import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import NextImage from "next/image";
import { cn } from "@/lib/utils/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Texture, useDesign } from "../hooks/useDesign-context";
import { PATTERNS } from "@/config/validators/patterns";
import { ChevronUp } from "lucide-react";
import {
  ImageElement,
  useDesignElements,
  useDesignUI,
} from "../hooks/useDesign-contextV2";
import { v4 as uuidv4 } from "uuid";

const TextureGrid = ({
  items,
  label,
  isExpanded,
  onToggleExpand,
  onSelectTexture,
  selectedTextureId,
}: {
  items: { id: string; src: string }[];
  label?: string;
  isExpanded?: boolean;
  onToggleExpand?: (label: string) => void;
  onSelectTexture: (item: { id: string; src: string }) => void;
  selectedTextureId?: string;
}) => {
  return (
    <div className="space-y-4">
      {label && onToggleExpand && (
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-semibold">{label}</p>
          <Button
            size="sm"
            variant="link"
            className="text-xs rounded-2xl py-1 px-2"
            onClick={() => onToggleExpand(label)}
          >
            {isExpanded ? "Ocultar" : "Ver más"}
          </Button>
        </div>
      )}

      <div
        className={cn(
          isExpanded ? "grid grid-cols-3 gap-2" : "flex gap-2 overflow-x-scroll"
        )}
      >
        {items.map((item, index) => (
          <article
            onClick={() => onSelectTexture(item)}
            className={cn(
              "flex-none border-2",
              isExpanded ? "w-full" : "",
              item.id === selectedTextureId && "border-blue-500"
            )}
            key={item.id}
          >
            <NextImage
              src={item.src}
              width={50}
              height={50}
              className={cn(
                "w-[50px] h-[50px]",
                isExpanded && "w-full h-auto object-cover aspect-square"
              )}
              alt={label ? `${label}-image-${index + 1}` : `image-${index + 1}`}
            />
          </article>
        ))}
      </div>
    </div>
  );
};

export const TexturesPicker = () => {
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  const { designElements, setDesignElements } = useDesignElements();
  const { configuratorDimensions } = useDesignUI();
  const isMobile = useIsMobile();

  const toggleExpand = (label: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const currentTexture = useMemo(() => {
    return designElements?.find((item) => item?.type === "texture");
  }, [designElements]);

  const handleSaveImage = (item: { id: string; src: string }) => {
    const img = new Image();
    img.src = item.src;

    const x = configuratorDimensions.container.width / 2;
      const y = configuratorDimensions.container.height / 2;
      const id = uuidv4();
      const designItem: ImageElement = {
        id,
        type:'texture',
        url: item.src,
        size: { width:550, height:configuratorDimensions.phone.height },
        position: { x, y },
        rotation: 0,
      };
      let newItems = currentTexture
        ? designElements.filter((item) => item.id !== currentTexture.id)
        : designElements;
      newItems = [designItem, ...newItems];
      setDesignElements(newItems);
  };

  if (isMobile) {
    return (
      <Drawer>
        <div className="space-y-2 flex flex-col">
          <DrawerTrigger className="text-sm self-end font-medium underline flex gap-1 items-center">
            Ver mas <ChevronUp size={15} />
          </DrawerTrigger>
          <div className="flex gap-2 overflow-x-scroll max-w-[93svw]">
            {PATTERNS.flatMap(({ items }) => items).map((item, index) => (
              <article
                onClick={() => handleSaveImage(item)}
                className={cn(
                  "flex-none border-2",
                  item.id === "designOptions.texture.id" && "border-blue-500"
                )}
                key={item.id}
              >
                <NextImage
                  src={item.src}
                  width={50}
                  height={50}
                  className="w-[50px] h-[50px]"
                  alt={`image-${index + 1}`}
                />
              </article>
            ))}
          </div>
        </div>
        <DrawerContent className="h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>Texturas</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 space-y-4">
            {PATTERNS.map(({ label, items }) => (
              <TextureGrid
                key={label}
                label={label}
                items={items}
                isExpanded={expandedCategories[label]}
                onToggleExpand={toggleExpand}
                onSelectTexture={handleSaveImage}
                selectedTextureId={"designOptions.texture.id"}
              />
            ))}
          </div>
          <DrawerFooter>
            <DrawerClose>
              <Button className="w-full rounded-2xl">Guardar</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <div>
      <h3 className="text-base font-semibold">Texturas</h3>
      {PATTERNS.map(({ label, items }) => (
        <TextureGrid
          key={label}
          label={label}
          items={items}
          isExpanded={expandedCategories[label]}
          onToggleExpand={toggleExpand}
          onSelectTexture={handleSaveImage}
          selectedTextureId={"designOptions.texture.id"}
        />
      ))}
    </div>
  );
};
