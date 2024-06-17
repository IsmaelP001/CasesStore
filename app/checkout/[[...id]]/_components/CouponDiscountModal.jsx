import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applyCouponToCart } from "../action";
import { useEffect, useState } from "react";
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
import { useToast } from "../../../../components/ui/use-toast";

const CouponDiscountModal = () => { 
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const {toast}=useToast()
  const queryClient=useQueryClient()

  const { mutate:applyCouponAction } = useMutation({
    mutationKey: ["applyCouponToCart"],
    mutationFn: applyCouponToCart,
    onSuccess: (data) => {
      if (data?._error) {
        setError(data?._error);
        return
      } 
      if(error !== null) setError(null);
      queryClient.invalidateQueries({queryKey:['cartInfo'],exact:true})
      setOpen(false);
      toast()
    },
    onError: (err) => {
      console.log(err);
    },
  });

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

          <form action={applyCouponAction}  className="">
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
              <Button type="submit" className="">Aplicar</Button>
            </div>
            {error && (
              <p className="ml-1 mt-2 text-xs font-bold text-red-500">
                {error}
              </p>
            )}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );


};

export default CouponDiscountModal;
