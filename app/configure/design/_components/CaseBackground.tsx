// components/CaseBackground.tsx
'use client'

import { useDesign } from "../hooks/useDesign-context"

export const CaseBackground = () => {
  const { designOptions } = useDesign()
  
  return (
    <>
      <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
      <div
        style={{ backgroundColor: designOptions.color.hex }}
        className="absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]"
      />
    </>
  )
}