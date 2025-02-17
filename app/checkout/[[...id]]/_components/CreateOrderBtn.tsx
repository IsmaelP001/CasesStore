"use client";
import { cn, formatPrice } from "../../../../lib/utils/utils";

import { trpc } from "@/lib/trpc/client";
import Loading from "@/components/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/config/redux/hooks";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useMemo } from "react";
import useCartData from "@/hooks/useCartData";
import { setErrors } from "@/config/redux/features/order/orderSlice";

const CreateOrderBtn = () => {
  const { paymentMethod, scheduledDate } = useAppSelector(
    (store) => store.orderState
  );
   
  const { total, isPending: isFetchingTotalCart, cartItems } = useCartData();
  const router = useRouter();
  const utils = trpc.useUtils();
  const { toast } = useToast();
  const dispath=useAppDispatch()

  const searchParams = useSearchParams();
  const cartId = useMemo(() => {
    return searchParams?.get("cartId")!;
  }, [searchParams]);

  const [couponInCart] = trpc.discountCode.getCouponsInCart.useSuspenseQuery(
    { cartId },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: createOrderAction, isPending: isPendingCreateNewOrder } =
    trpc.order.createOrder.useMutation({
      onSuccess: (data) => {
        utils.cart.getItems.invalidate();
        utils.cart.getTotalCart.invalidate();
        router.push("/thanks");
      },
      onError: (err) => {
        const orderZodErrors= err.data?.zodError?.fieldErrors
        if(orderZodErrors){
          dispath(setErrors(orderZodErrors))
          return
        }
          
        let defaultErrMsg =
          "Error al crear la orden, intente otra vez mas tarde.";
        if (err.data?.code === "FORBIDDEN") {
          defaultErrMsg = err.message;
        }
        toast({
          title: "Orden",
          description: defaultErrMsg,
          variant: "destructive",
        });
      },
    });

  useEffect(() => {
    if (isFetchingTotalCart || isPendingCreateNewOrder) return;
    if (cartItems?.length === 0) {
      router.push("/");
    }
  }, [cartItems, isFetchingTotalCart, isPendingCreateNewOrder, router]);

  return (
    <div className="">
      <button
        disabled={isPendingCreateNewOrder}
        onClick={() =>
          createOrderAction({
            paymentMethod: paymentMethod?.value! as any,
            scheduledDate: scheduledDate?.date,
            deliveryType: scheduledDate?.deliveryType || ("standard" as any),
            cartId,
            discountId: couponInCart?.discountId,
          })
        }
        className={cn(
          "flex w-full px-4 items-center justify-between  bg-primary  h-7  box-border rounded-2xl text-primary-foreground hover:bg-slate-700 transition-300",
          isPendingCreateNewOrder && 'bg-gray-400'
        )}
      >
        {paymentMethod?.label ? (
          <p className="space-x-1">
            <span>Pagar </span>
            {paymentMethod?.label !== "al entregar" && <span>con</span>}
            <span className="text-white">{paymentMethod.label}</span>
          </p>
        ) : (
          <span className="font-semibold">Total</span>
        )}
        {isFetchingTotalCart || isPendingCreateNewOrder ? (
          <span>
            {" "}
            <Loading size={20} />
          </span>
        ) : (
          <span className="text-sm">
            {formatPrice(
              (total.subTotal || 0) - (couponInCart?.discountValue || 0)
            )}
          </span>
        )}
      </button>
    </div>
  );
};

export default CreateOrderBtn;
