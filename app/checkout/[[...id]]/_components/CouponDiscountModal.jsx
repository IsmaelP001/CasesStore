import { useMutation, useQuery } from "@tanstack/react-query";
import { applyCouponToCart } from "../action";
import { useEffect, useState } from "react";
import { getCartItems } from "../../../../lib/data/cart";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { MdKeyboardArrowRight, MdOutlineLocalPhone } from "react-icons/md";
import { Button } from "../../../../components/ui/button";
import { MdOutlineDiscount } from "react-icons/md";

const CouponDiscountModal = () => {
  // const [cartItemIds, setCartItemIds] = useState(null);
  // const applyCoupontToCartWithProductIds = applyCouponToCart.bind(
  //   null,
  //   cartItemIds
  // );
  const [isError, setIsError] = useState(null);
  const [open, setOpen] = useState(false);

  // const { data: cartItems, isPending } = useQuery({
  //   queryKey: ["cartInfo"],
  //   queryFn: async () => await getCartItems(),
  // });

  // useEffect(() => {
  //   if (isPending) return;
  //   const cartProductIds = cartItems?.map((item) => {
  //     return { cartDetailsId: item.id, productId: item.productId };
  //   });
  //   setCartItemIds(cartProductIds);
  // }, []);

  // const { mutate } = useMutation({
  //   mutationKey: ["applyCouponToCart"],
  //   mutationFn: applyCoupontToCartWithProductIds,
  //   onSuccess: (data) => {
  //     if (data?.isError) {
  //       setIsError(data);
  //     } else {
  //       setIsError(null);
  //     }
  //     console.log(data);
  //   },
  //   onError: (err) => {
  //     console.log(err);
  //   },
  // });

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      id="modalPhonenumber"
      className="modal "
    >
      <DialogTrigger asChild>
            <Button
              className=" flex bg-transparent text-primary hover:text-white border border-primary  rounded-md justify-between w-full"
              onClick={()=>setOpen(true)}
            >
              <div className="flex items-center gap-2">
                <MdOutlineDiscount className="text-xl" />
                <spam className="text-sm">Codigo de descuento o promocion</spam>
              </div>
              <MdKeyboardArrowRight className=" text-2xl" />
            </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="modal-box flex flex-col gap-4">
          <header className="flex justify-between">
            <h2 className="font-bold text-2xl mb-5">Codigo de descuento</h2>
        
          </header>

          <form  className="">
            <div className="flex items-end gap-2">
              <div className='flex-1'>
                <Label htmlFor="name" className="font-semibold text-sm">
                  Introduzca codigo de descuento
                </Label>
                <Input
                  name="code"
                  type="text"
                  className="flex-1 w-full "
                  placeholder="ej. EHF50"
                ></Input>
              </div>
              <Button className="btn btn-primary">Aplicar</Button>
            </div>
            {isError && (
              <p className="ml-1 mt-2 text-xs font-bold text-red-500">
                {isError.message}
              </p>
            )}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );


};

export default CouponDiscountModal;
