'use client'
import React, { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getCartItems, getTotalPrice } from "../../../../lib/data/cart";
import { formatPrice } from "../../../../lib/utils/utils";
import { Button } from "../../../../components/ui/button";
import { removeCouponFromCart } from "../action";

const SHIPPING = Number(100.00);
const TAXES = Number(80.00);

const CheckoutTotals = () => {

  const queryClient = useQueryClient()
  const { data: cartItems, isPending } = useQuery({
    queryKey: ["cartInfo"],
    queryFn: async () => await getCartItems(),
  });

  const { data: totalPriceData, isFetching } = useQuery({
    queryKey: ["totalPrice"],
    queryFn: async () => await getTotalPrice(),
  });

  const {mutate:removeCouponAction}=useMutation({
    mutationKey:['removeCouponFromCart'],
    mutationFn:removeCouponFromCart,
    onSuccess:()=>{
      queryClient.invalidateQueries(['cartInfo'])
    },onError:(err)=>{
      console.log('error al remover coupon',err)
    }
  })

  const subTotal = totalPriceData?.price?.totalPrice ?? 0;
  
  const total = useMemo(()=>{
    const totalBeforeDiscount = Number(subTotal) + SHIPPING + TAXES;

    //calculate discount from all coupons
    const totalDiscounts = cartItems?.reduce((acc,current)=>{
      const {discountAmount,discountType}=current?.discount || {}
      if(discountType === 'FIXED'){
       return  acc + discountAmount
      }else{
        const porcentage = discountAmount / 100
       return acc + discountAmount * porcentage
      }
    },0) || 0
    return totalBeforeDiscount - totalDiscounts;
  },[cartItems])



  //verificar si algun producto contiene un coupon
  const isCouponsInCart = useMemo(()=>{
    return cartItems?.some(cartItem=>(
       cartItem?.discount
    ))
  },[cartItems])

  if (isFetching || isPending) {
    return <div>Cargando...</div>;
  }

 
  return (
    <div className='border border-primary rounded-md p-2 mt-5 border-b'>
      {isCouponsInCart && (
        <ul className="border-b border-primary pb-1 mb-1">
          <p className="text-base font-semibold">Coupones</p>
          {cartItems?.map(({id,discount})=>
          {
            const {discountAmount,discountType,code }= discount || {}
            return (
              <li key={id} className="flex justify-between text-sm font-semibold">
              <span>{code}</span>
              <div>
                <span>
                  {
                    discountType === 'FIXED' ?
                    <span>{formatPrice(discountAmount)}</span>
                    :
                    <span>% {discountAmount}</span>
                  }
                </span>
                <Button size="icon" variant="destructive" onClick={()=>removeCouponAction(id)}  className="w-5 h-5 ml-1 rounded-full">X</Button>
              </div>
            </li>
            )
          }
          
          )}
        </ul>
      )}
      <div className='text-base font-semibold flex justify-between '>
        <span className="">Sub total</span>
        <span>{formatPrice(subTotal)}</span>
      </div>
      <div className='text-base font-semibold flex justify-between '>
        <span className="">Envio</span>
        <span>{formatPrice(SHIPPING)}</span>
      </div>
      <div className='text-base font-semibold flex justify-between border-b pb-1 border-primary '>
        <span className="">Itebis</span>
        <span>{formatPrice(TAXES)}</span>
      </div>
      <div className='text-xl font-semibold flex justify-between mt-3'>
        <span className="">Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}

export default CheckoutTotals;
