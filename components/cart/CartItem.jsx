"use client";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCartItem, updateCartQuantity } from "../../lib/actions/cart";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Phone from "../../app/(store)/_components/Phone";
import { formatPrice } from "../../lib/utils/utils";


const CartItem = ({ id,cartId, storageId, product,quantity,configirationImage}) => {
  const { id:productId,name, model, price, version, discountId, images } = product;
  const [currentQuantity,setCurrentQuantity]=useState(parseInt(quantity))
  const queryClient=useQueryClient();
  

  const {
    mutate: CartQuantityAction,
    isPending,
    data: newCartData,
  } = useMutation({
    mutationFn: (data) =>
    updateCartQuantity(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['cartInfo',"totalPrice"])
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: removeItemCartAction } = useMutation({
    mutationFn: (data) =>
      removeCartItem(data),
    onSuccess: (e) => {
      console.log("elemento eliminado con exito", e);
      queryClient.invalidateQueries(["cartInfo","totalPrice"]);
    },
    onError: (e) => {
      console.log("error", e);
    },
  });

  console.log('product,',product)


  const handleQuantityChange = (e) => {
    
    const actionType=e.currentTarget.dataset.id;
    let newQuantity=currentQuantity;
    
    
    if(actionType === 'INCREASE'){
        newQuantity++;

    }else{
        newQuantity--;
    }

    if(newQuantity<1){ //elimina articulo si es menor a 1
        removeItemCartAction({id})
        return;
    }
    setCurrentQuantity(newQuantity);
    CartQuantityAction({cartId,quantity:newQuantity,productId})
  };

  
  return (
    <article className=" hover:bg-base-300 px-4 py-1  ">
    <div className="border-b border-b-neutral grid grid-cols-4 gap-1 text-center gap-1  justify-between items-center">
    <figure className="w-20 h-20  relative  flex justify-center">
       {
        configirationImage?.imageUrl ? (
        
          <Phone imgSrc={configirationImage?.imageUrl} className=" absolute inset-0 w-9 h-[74px] m-auto" />
        
        ):
        (
          <img src={images ? images[0].image : ''} className="h-full w-full rounded-md object-cover "></img>

        )
       }
      </figure>

      {/* PRODUCT-INFO */}
      <div className=" flex flex-col gap-1 col-span-2 capitalize pt-3 ">
        <div className="flex items-center gap-1">
           <h4 className="text-sm font-extrabold text-neutral text-left  truncate text-ellipsis">{name}</h4>
           <span className="text-xs text-base-200">{version}</span>
        </div>
        <h4 className="flex items-center gap-2 text-xs text-base-800">
          Color:
          {/* <span className="badge w-4 h-3" style={{background:color}}></span> */}
        </h4>
        <div className="">
        <p className="text-xs text-left font-semibold">{formatPrice(price)}</p>
        </div>
      </div>

      {/* BUTTOMS */}
      <div className=''>
        <form onSubmit={(e)=>e.preventDefault()} className="flex gap-3 items-center  bg-slate-200 rounded-2xl">
          <Input type="hidden" defaultValue={productId} name="productId"></Input>
          <button
            className="rounded-full w-7 h-7 bg-gray-400 grid place-content-center"
            disabled={isPending}
            data-id='DECREASE'
            onClick={handleQuantityChange}
          >
         
            {currentQuantity<=1 ?     <FaTrash className="text-lg text-red-600  " /> : <span className=" text-primary-foreground">-</span>}
          </button>
          <div className="max-h-20 w-[0.1rem]">
            {isPending ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
                <input type="number" name="quantity" readOnly  className="bg-transparent  text-primary" value={currentQuantity}></input>
            )}
          </div>
          <button
            className="rounded-full w-7 h-7 ml-1.5 bg-gray-400 text-primary-foreground grid place-content-center"
            disabled={isPending}
            data-id='INCREASE'
            onClick={handleQuantityChange}
          >
            +
          </button>
        </form>
      </div>
    </div>
    </article>
  );
};

export default CartItem;
