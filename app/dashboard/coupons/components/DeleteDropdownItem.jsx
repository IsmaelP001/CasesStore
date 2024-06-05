'use client'
import { deleteCoupon } from "../actions"
import { useRouter } from 'next/navigation'


const DeleteDropdownItem = ({id,disable}) => {

  const router= useRouter()

  return (
    <li>
      <button disabled={disable} onClick={()=>{
        deleteCoupon(id);
        router.refresh();
      }}>
        Eliminar
      </button>
    </li>
  )
}

export default DeleteDropdownItem