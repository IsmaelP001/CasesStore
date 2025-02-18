// components/SaveButton.tsx
'use client'
import { ArrowRight, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDesign } from "../hooks/useDesign-context"
import { useSaveDesign } from "../hooks/useSaveDesign"
import { UploadOverlay } from "./UploadOverlay"
import { cn } from "@/lib/utils/utils"
import { useIsMobile } from "@/hooks/use-mobile"

interface SaveButtonProps{
  className?:string
}
export const SaveButton = ({className}:SaveButtonProps) => {
  const {saveConfiguration, isUploading, } = useSaveDesign()
  const isMobile = useIsMobile()
  return (
   <>
    {isUploading && <UploadOverlay/>}
      <Button
      disabled={isUploading}
      onClick={saveConfiguration}
      className={cn("w-full rounded-2xl bg-accent flex justify-center hover:bg-accent/50  z-50",className)}
    >
      <span className={cn( 'text-black',isMobile && 'hidden')}>Guardar</span>
      <ChevronRight className="h-8 w-8 text-black" />
    </Button></>
  )
}