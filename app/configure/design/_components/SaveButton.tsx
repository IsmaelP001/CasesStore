// components/SaveButton.tsx
'use client'
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDesign } from "../hooks/useDesign-context"
import { useSaveDesign } from "../hooks/useSaveDesign"
import { UploadOverlay } from "./UploadOverlay"

export const SaveButton = () => {
  const {saveConfiguration, isUploading, } = useSaveDesign()
  
  return (
   <>
    {isUploading && <UploadOverlay/>}
      <Button
      disabled={isUploading}
      onClick={saveConfiguration}
      size="sm"
      className="w-full rounded-2xl"
    >
      Guardar
      <ArrowRight className="h-4 w-4 ml-1.5 inline" />
    </Button></>
  )
}