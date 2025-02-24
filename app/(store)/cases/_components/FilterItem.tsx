import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils/utils'
import { CircleCheck, IdCardIcon } from 'lucide-react'
import React, { ReactNode } from 'react'

interface FilterItemProps{
    checked:boolean;
    identifier:string
    onCheckedChange:()=>void;
    children:ReactNode;
}
export default function FilterItem({identifier,checked,onCheckedChange,children}:FilterItemProps) {
  return (
    <div  className="flex items-center gap-1">
    <Checkbox
      className="hidden"
      id={identifier}
      checked={checked}
      onCheckedChange={onCheckedChange}
    />
    <Label
      className={cn("py-1 px-2.5  text-base quicksand border border-gray-300 w-full hover:border-accent/50 rounded-xl flex justify-between items-center",checked && 'border-accent border ')}
      htmlFor={identifier}
    >
      {children}
      <CircleCheck className={cn('fill-gray-100 text-gray-300',checked && "fill-black text-white")} size={15}/>
    </Label>
  </div>  )
}
