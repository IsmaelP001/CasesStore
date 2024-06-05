'use client'
import { useRouter } from 'next/navigation'


const ActiveToogleDropdown = ({id,isActive}) => {

  const router= useRouter()
  return (
       <li>
         <button className='' onClick={()=>{
          activeToogleCoupons(id,!isActive);
          router.refresh()
         }}>
              {isActive?'Desactivar':'Activar'}
         </button>
       </li>
  
  )
}

export default ActiveToogleDropdown