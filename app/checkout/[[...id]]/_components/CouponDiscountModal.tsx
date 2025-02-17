import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Button } from "../../../../components/ui/button";
import { MdOutlineDiscount } from "react-icons/md";
import { useToast } from "../../../../components/ui/use-toast";
import { trpc } from "@/lib/trpc/client";
import { ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

const CouponDiscountModal = () => {
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [coupon, setCoupon] = useState<string>("");
  const utils = trpc.useUtils();
  const { toast } = useToast();

  const searchParams=useSearchParams()
 const cartId=useMemo(()=>{
  return searchParams?.get('cartId')!
 },[searchParams])

  const { mutate: applyCouponMutation } =
    trpc.discountCode.applyDiscountCode.useMutation({
      onSuccess: (data) => {
        if (error !== null) setError(null);
        utils.discountCode.getCouponsInCart.invalidate()
        setOpen(false);
      },
      onError: (err) => {
        const errorType = err.data?.code;
        if (errorType === "CONFLICT" || errorType === "NOT_FOUND" || errorType === 'FORBIDDEN') {
          setError(err.message);
          return;
        }
        toast({
          title: "Error",
          description:
            "Error al aplicar el coupon, intente otra vez mas tarde..",
          variant: "destructive",
        });
      },
    });

  useEffect(() => {
    if (!open && error !== null) {
      setError(null);
    }
  }, [open,error]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className=" flex bg-transparent text-primary hover:text-white border border-primary  rounded-md justify-between w-full"
          onClick={() => setOpen(true)}
        >
          <div className="flex items-center gap-2">
            <MdOutlineDiscount className="text-2xl" />
            <span className="text-sm">Codigo de descuento o promocion</span>
          </div>
          <ChevronRight className=" text-2xl" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="modal-box flex flex-col gap-4">
          <header className="flex justify-between">
            <DialogTitle className="font-bold text-2xl mb-5">
              Codigo de descuento
            </DialogTitle>
          </header>

          <form
            action={(formData: FormData) => {
              applyCouponMutation({ code: coupon,cartId });
            }}
            className=""
          >
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Label htmlFor="name" className="font-semibold text-sm">
                  Introduzca codigo de descuento
                </Label>
                <Input
                  name="code"
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 w-full "
                  placeholder="ej. EHF50"
                ></Input>
              </div>
              <Button disabled={!coupon} type="submit" className="">
                Aplicar
              </Button>
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
