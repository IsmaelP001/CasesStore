'use client'
import { trpc } from '@/lib/trpc/client'


const ActiveToogleDropdown = ({id,isActive}:{id:string,isActive:boolean}) => {
  const utils=trpc.useUtils()
  const {mutateAsync:toogleCouponState}=trpc.discountCode.toogleActiveCoupon.useMutation({
    onSuccess(){
      utils.discountCode.getActiveCoupons.invalidate()
    }
  })  
  return (
    <button className='' onClick={async()=>{
      toogleCouponState({id,isActive:!isActive});
     }}>
          {isActive?'Desactivar':'Activar'}
     </button>
  
  )
}

export default ActiveToogleDropdown