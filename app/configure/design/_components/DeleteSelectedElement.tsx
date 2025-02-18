'use client'
import { Trash2 } from "lucide-react"

interface DeleteSelectedElementProps{
  deleteFn:()=>void
}
export default function DeleteSelectedElement({deleteFn}:DeleteSelectedElementProps) {
  return (
    <div className="relative !z-[999] pr-1 pt-1">
          <button className=" handle-component" onClick={deleteFn}><Trash2 className="text-red-500" size={20}/></button>

    </div>
  )
}
