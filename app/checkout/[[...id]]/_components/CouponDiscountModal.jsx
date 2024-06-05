import { useMutation, useQuery } from "@tanstack/react-query";
import { applyCouponToCart } from "../action";
import { useEffect, useState } from "react";
import { getCartItems } from "../../../../lib/data/cart";


const CouponDiscountModal = () => {

  const [cartItemIds,setCartItemIds]=useState(null)
  const applyCoupontToCartWithProductIds=applyCouponToCart.bind(null,cartItemIds)
  const[isError,setIsError]=useState(null)

  const { data: cartItems, isPending, } = useQuery({
    queryKey: ["cartInfo"],
    queryFn: async () => await getCartItems(),
  });



  useEffect(()=>{
    if(isPending)return
    const cartProductIds=cartItems?.map(item=>{
      return {cartDetailsId:item.id,productId:item.productId}
    })
    setCartItemIds(cartProductIds)
  },[cartItems])


  const {mutate}=useMutation({
    mutationKey:['applyCouponToCart'],
    mutationFn:applyCoupontToCartWithProductIds,
    onSuccess:(data)=>{
      if(data?.isError) {
        setIsError(data)
      }
      else{
        setIsError(null)
      }
      console.log(data)
    },
    onError:(err)=>{
      console.log(err)
    }
  })
  
  return (
    <dialog id="modalCoupon" className="modal ">
      <div className="modal-box flex flex-col gap-4">
        <header className="flex justify-between">
          <h2 className="font-bold text-2xl mb-5">Codigo de descuento</h2>
          <button
            className="btn btn-xs btn-ghost text-xl"
            onClick={() => document.getElementById("modalCoupon").close()}
          >
            X
          </button>
        </header>

        <form action={mutate} className="">
          <div className="flex items-end gap-2">
            <div>
              <label htmlFor="name" className="font-semibold text-sm">Introduzca codigo de descuento</label>
              <input
                name="code"
                type="text"
                className="input input-md rounded-md input-info w-full mt-1  "
                placeholder="ej. EHF50"
              ></input>

            </div>
            <button className="btn btn-primary">Aplicar</button>
          </div>
          {isError && <p className="ml-1 mt-2 text-xs font-bold text-red-500">{isError.message}</p>}
        </form>
      </div>
    </dialog>
  );
};

export default CouponDiscountModal;
