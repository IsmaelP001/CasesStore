"use client";
import React, { useMemo } from "react";
import { formatPrice } from "../../../../lib/utils/utils";
import { Button } from "../../../../components/ui/button";
import { trpc } from "@/lib/trpc/client";
import { useSearchParams } from "next/navigation";
import useCartData from "@/hooks/useCartData";

const CheckoutTotals = () => {
  const searchParams = useSearchParams();
  const cartId = useMemo(() => {
    return searchParams?.get("cartId")!;
  }, [searchParams]);
  const utils = trpc.useUtils();
  const {total,isPending:isPendingTotals,activeCartId}=useCartData()

  const [couponsInCart] = trpc.discountCode.getCouponsInCart.useSuspenseQuery(
    { cartId:activeCartId},
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: removeCouponMutation } =
    trpc.discountCode.removeDiscountCodeFromCart.useMutation({
      onSuccess: () => {
        utils.discountCode.getCouponsInCart.invalidate();
      },
      onError: (err: any) => {
        console.log("error al remover coupon", err);
      },
    });

  return (
    <div className="border border-primary rounded-md p-2  border-b">
      <div>
       {
        couponsInCart?.discountCode && (
          <article className="flex justify-between text-sm font-semibold">
          <span>{couponsInCart.discountCode}</span>
          <div>
            <span>{formatPrice(couponsInCart.discountValue || 0)}</span>
            <Button
              size="icon"
              variant="destructive"
              onClick={() =>
                removeCouponMutation({ discountId: couponsInCart.discountId!, cartId })
              }
              className="w-5 h-5 ml-1 rounded-full"
            >
              X
            </Button>
          </div>
        </article>
        )
       }
      </div>
      <div className="text-base font-semibold flex justify-between ">
        <span className="">Sub total</span>
        <span>{formatPrice(total.grossTotal)}</span>
      </div>
      <div className="text-base font-semibold flex justify-between ">
        <span className="">Envio</span>
        <span>{formatPrice(total.shipping)}</span>
      </div>
      {couponsInCart?.discountValue  && (
        <div className="text-base font-semibold flex justify-between ">
          <span className="">Total descuentos</span>
          <span>{formatPrice(couponsInCart.discountValue)}</span>
        </div>
      )}
      <div className="text-base font-semibold flex justify-between border-b pb-1 border-primary ">
        <span className="">Itebis</span>
        <span>{formatPrice(total.grossTotal * 0.18)}</span>
      </div>
      <div className="text-xl font-semibold flex justify-between mt-3">
        <span className="">Total</span>
        <span>{formatPrice((total.subTotal || 0) - (couponsInCart.discountValue || 0))}</span>
      </div>
    </div>
  );
};

export default CheckoutTotals;
