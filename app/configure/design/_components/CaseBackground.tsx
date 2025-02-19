"use client";

import { useDesign } from "../hooks/useDesign-context";

export const CaseBackground = () => {
  const { designOptions, phoneCaseRef } = useDesign();

return (
    <>
      <div className="absolute z-40 inset-0 overflow-hidden  shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
      <div
        style={{
          backgroundColor: designOptions.color.hex,
          borderRadius: '13%/8%'
        }}
        className="absolute inset-0 left-[1px] top-px right-[1px] bottom-px  overflow-hidden"
        />
    </>
  );
};
