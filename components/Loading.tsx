import { LoaderCircle } from 'lucide-react'
import React from 'react'

const Loading = ({size=30}:{size?:number}) => {
  return (

    <LoaderCircle size={size} className="m-auto animate-spin" />

    
  )
}

export default Loading