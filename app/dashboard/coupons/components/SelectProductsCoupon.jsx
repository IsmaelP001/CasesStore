'use client'

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import { getProducts } from "../../../../lib/data/products";


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
                        <h2 className='text-xl mb-5 font-semibold'>Seleccionar productos</h2>
            <div className='flex justify-between rounded-md'>
                {
                     ['iphone','ipad','mac','airpods'].map((tab,index) => (
                        <button
                            key={index}
                            className={`btn ${tab === currentTab ? 'btn-outline rounded-t-md border-b-primary' : 'btn-ghost  '} flex-1 btn-sm p-1 rounded-none border-b-2 border-b-neutral hover:bg-primary`}
                            onClick={() => setCurrentTab(tab)}
                            type="button"
                            
                        >
                          <span className='text-xs md:text-base'>{tab}</span>
                        </button>
                    ))
                }
            </div>
            <div className='min-h-20 p-5 bg-base-200 rounded-sm grid gap-5 grid-cols-[repeat(auto-fit,minmax(120px,1fr))]'>
                {
                    products?.map(product=>{
                        
                        return(
                        
                           <label key={product.products.id} htmlFor={product.products.name}  className={`bg-base-100 text-xs  h-10 flex justify-between px-2 gap-1 items-center rounded-md  ${allProductIds.includes(product.products.id) ? 'bg-blue-300':''}`}>

                            <span>{product.products.name}</span>
                           
                             <input type="checkbox"  id={product.products.name}  className="checkbox checkbox-xs"
                             value={product.products.id} 
                             checked={allProductIds.includes(product.products.id)}
                             onChange={(e)=>handleCheckboxInput(parseInt(e.target.value))}></input>

                           </label>
                            
                        )
                         
                    })
                }

            </div>
        </div>
    )
}



export default SelectProductsCoupon