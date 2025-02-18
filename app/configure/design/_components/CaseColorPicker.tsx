"use client";
import ColorPicker from "@/components/ColorPicker";
import { RadioGroup } from "@headlessui/react";
import React from "react";
import { useDesign } from "../hooks/useDesign-context";
import { FONT_COLORS } from "@/config/validators/fonts-options";
import { cn } from "@/lib/utils/utils";

export default function CaseColorPicker() {
  const { designOptions, setDesignOptions } = useDesign();
  return (
      <div className="absolute left-2 top-[50%] -translate-y-[50%] z-40 flex flex-col items-center justify-center gap-2  px-1">
        <RadioGroup
          value={designOptions.color}
          onChange={(color) => setDesignOptions((prev) => ({ ...prev, color }))}
          className="flex flex-col gap-2"
        >
          {FONT_COLORS.map((color) => (
            <RadioGroup.Option
              key={color.name}
              value={color}
              className={({ checked }) =>
                cn(
                  "h-6 w-6 rounded-full border-2 cursor-pointer",
                  checked
                    ? "border-white/75 ring-2 ring-blue-500"
                    : "border-transparent"
                )
              }
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </RadioGroup>

        <ColorPicker
        className="w-[30px] h-[30px]"
          value={designOptions.color.hex}
          onChange={(e) =>
            setDesignOptions((prev) => ({
              ...prev,
              color: { ...prev.color, hex: e.target.value },
            }))
          }
        />
      </div>
  );
}
