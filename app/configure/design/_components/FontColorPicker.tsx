'use client'
import ColorPicker from '@/components/ColorPicker'
import { Label } from '@/components/ui/label'
import { RadioGroup } from '@headlessui/react'
import React from 'react'
import { useDesign } from '../hooks/useDesign-context'
import { FONT_COLORS } from '@/config/validators/fonts-options'
import { cn } from '@/lib/utils/utils'

export default function FontColorPicker() {
  const {textState,setTextState}=useDesign()
  return (
    <div>
        <div className="flex items-center justify-center gap-2 pt-2 px-1">
          <RadioGroup 
            value={textState.color} 
            onChange={(color) => setTextState({ ...textState, color })}
            className="flex gap-3"
          >
            {FONT_COLORS.map((color) => (
              <RadioGroup.Option
                key={color.name}
                value={color}
                className={({ checked }) => 
                  cn("h-8 w-8 rounded-full border-2 cursor-pointer",
                    checked ? "border-white/75 ring-2 ring-blue-500" : "border-transparent"
                  )
                }
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </RadioGroup>
          
          <ColorPicker
            value={textState.color.hex}
            onChange={(e) => setTextState({
              ...textState,
              color: { ...textState.color, hex:e.target.value }
            })}
          />
        </div>
      </div>  )
}
