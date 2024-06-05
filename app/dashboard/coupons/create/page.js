'use client'

import { createCoupon } from "../actions";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react"
import SelectProductsCoupon from '../components/SelectProductsCoupon'
const CreateCouponPage = () => {

    const [allProducts,setAllProducts]=useState(true);
    const [allProductIds,setAllProductIds]=useState([])

    const createCouponWithProductIds=createCoupon.bind(null,allProductIds)

    const today=new Date();
    today.setMinutes(today.getMinutes() + today.getTimezoneOffset());

    const handleSetAllProducts=(state)=>{
        setAllProductIds(state)
    }

    const {mutate}=useMutation({
        mutationKey:['createCoupon'],
        mutationFn:createCouponWithProductIds,
        onSuccess:()=>{
          console.log('coupon creado con exito')
        },
        onError:(err)=>{
            console.log('error al actualizar numero de telefono',err)
        }
      })

      
  return (
    <div className="py-10 px-20">
        <h2 className="text-3xl font-bold mb-10">Crear coupon</h2>

        <form action={mutate} className="space-y-10">
            <div>
                <label htmlFor="code" className="label font-semibold">Code</label>
                <input type="text" name="code" className="input"></input>
            </div>
            {/* DISCOUNT TYPE AND DISCOUNT AMOUNG */}
            <div className="flex items-baseline gap-10">
            <div className="">
                <p className="font-semibold mb-2">Tipo de descuento</p>
                <div className="flex gap-1 mb-2">
                  <input type="radio" name="discountType" className="radio" value={'FIXED'}></input>
                  <label htmlFor="discountType">Fijo</label>
                </div>
                <div className="flex gap-1">
                  <input type="radio" name="discountType" className="radio"  value={'PORCENTAGE'}></input>
                  <label htmlFor="discountType">Porcentaje</label>
                </div>
            </div>
            <div>
                <label htmlFor="discountAmount" className="label mt-0 font-semibold">Cantidad de descuento</label>
                <input type="number" name="discountAmount" className="input"></input>
            </div>
            </div>

            {/* LIMIT */}
            <div>
                <label htmlFor="limit" className="label font-semibold">Limit</label>
                <input type="number" className="input" name="limit"></input>
                <p className="text-xs mt-2 font-semibold">Dejar vacio para usos infinitos</p>
            </div>

            {/* EXPIRES AT */}
            <div>
                <label htmlFor="code" className="label font-semibold">Fecha de expiracion</label>
                <input type="datetime-local" className="input" name="expiresAt" min={today.toJSON().split(":").slice(0,-1).join(":")}></input>
            </div>

            {/* ALLOWED PRODUCTS */}
            <div>
                <label htmlFor="code" className="label font-semibold mb-2">Productos permitidos</label>
                <div className="flex items-center gap-2 mb-2">
                    <input type="radio" name="allProducts" className="radio" value={true} onChange={(e)=>{
                        setAllProducts(true);
                        setAllProductIds([]);
                    }}></input>
                    <label htmlFor="allProducts" className="text-sm">Todos los productos</label>
                </div>
                <div className="flex items-center gap-2">
                    <input type="radio" name="allProducts"  className="radio" value={false}  onChange={(e)=>setAllProducts(false)}></input>
                    <label htmlFor="allProducts" className="text-sm">Seleccionar productos</label>
                </div>                
            </div>

            {allProducts !==true && <SelectProductsCoupon allProductIds={allProductIds} handleSetAllProducts={handleSetAllProducts}/>}                


            <button type="submit" className="btn btn-primary">Crear cupon</button>
        </form>
    </div>
  )
}

export default CreateCouponPage