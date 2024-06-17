'use client'

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import { getProducts } from "../../../../lib/data/products";
import { cn } from "../../../../lib/utils/utils";
import { Label } from "../../../../components/ui/label";


const SelectProductsCoupon = ({allProductIds,handleSetAllProducts}) => {

    const [currentTab,setCurrentTab]=useState('iphone');

    const {data:products,refetch}=useQuery({
        queryKey:['selectCouponProducts',currentTab],
        queryFn:()=>getProducts(currentTab)
    })

    useEffect(()=>{
        refetch()
    },[currentTab,refetch])

    const handleCheckboxInput=(id)=>{
        if(allProductIds.includes(id)){
            const newProductsId=allProductIds.filter(currentId=>currentId !=id)
            handleSetAllProducts(newProductsId)
        }else{
            handleSetAllProducts([...allProductIds,id])
        }
    }

    
    return (
        <div className='w-full mt-10'>
             <h2 className='text-xl mb-2 font-semibold'>Seleccionar productos</h2>
     
            <div className='min-h-20  rounded-sm grid gap-5 grid-cols-[repeat(auto-fill,minmax(120px,1fr))]'>
                {
                    products?.map(({id,name})=>{
                        return(
                           <Label key={id} htmlFor={name}  className={cn('bg-slate-100   h-10 flex justify-between px-2 gap-1 items-center rounded-md',allProductIds.includes(id) && 'bg-blue-300')}>
                            <span className="text-sm capitalize font-medium">{name}</span>
                             <input type="checkbox"  id={name}  className="checkbox checkbox-xs"
                             value={id} 
                             checked={allProductIds.includes(id)}
                             onChange={(e)=>handleCheckboxInput(parseInt(e.target.value))}></input>
                           </Label>
                        )
                         
                    })
                }

            </div>
        </div>
    )
}



export default SelectProductsCoupon