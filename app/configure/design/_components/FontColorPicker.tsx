"use client";
import ColorPicker from "@/components/ColorPicker";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@headlessui/react";
import React, { useMemo } from "react";
import { useDesign } from "../hooks/useDesign-context";
import { FONT_COLORS } from "@/config/validators/fonts-options";
import { cn } from "@/lib/utils/utils";
import {
  TextElement,
  useDesignElements,
  useDesignOptions,
} from "../hooks/useDesign-contextV2";

export default function FontColorPicker() {
  const { designOptions, setDesignOptions } = useDesignOptions();
  const { selectedElement, updateDesignElement } = useDesignElements();

  const selectedTextElement = useMemo(() => {
    if (selectedElement?.type === "text") {
      return selectedElement as TextElement;
    }
    return null;
  }, [selectedElement]);

  const defaultColor = useMemo(() => {
    if (!selectedTextElement?.color) return designOptions.text.color.hex;
    return selectedTextElement.color;
  }, [designOptions,selectedTextElement]);

  const handleUpdateColor = (color: string) => {
    if (selectedTextElement) {
      updateDesignElement({
        ...selectedTextElement,
        color,
      });
      return;
    }
    setDesignOptions({
      ...designOptions,
      text: {
        ...designOptions.text,
        color: { ...designOptions.text.color, hex: color },
      },
    });
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-2 pl-0.5">
        <RadioGroup
          value={defaultColor}
          onChange={(hex: string) => handleUpdateColor(hex)}
          className="flex gap-3"
        >
          {FONT_COLORS.map((color) => (
            <RadioGroup.Option
              key={color.name}
              value={color.hex}
              className={({ checked }) =>
                cn(
                  "h-8 w-8 rounded-full border-4 cursor-pointer",
                  checked
                    ? "border-white/50 ring-2 ring-yellow-600"
                    : "border-transparent"
                )
              }
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </RadioGroup>

        <ColorPicker
          value={defaultColor}
          onChange={(e) => handleUpdateColor(e.target.value)}
        />
      </div>
    </div>
  );
}
