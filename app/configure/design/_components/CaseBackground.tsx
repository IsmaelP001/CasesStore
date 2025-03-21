"use client";

import { cn } from "@/lib/utils/utils";
import { useDesign } from "../hooks/useDesign-context";

export const CaseBackground = () => {
  const { designOptions,showSurrondingImage } = useDesign();

  return (
    <>
      <div className={cn("absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]",showSurrondingImage ? 'shadow-[0_0_0_99999px_rgba(245,245,245,0.6)]' :'shadow-[0_0_0_99999px_rgba(245,245,245,1)]')} />
      <div
        style={{
          backgroundColor: designOptions.color.hex,
          borderRadius: "13%/8%",
        }}
        className="absolute shiny-background inset-0   overflow-hidden"
      />
    </>
  );
};
