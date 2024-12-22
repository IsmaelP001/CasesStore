"use client";
import { cn, formatPrice } from "../../lib/utils/utils";
import useCartData from "@/hooks/useCartData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {  ChevronRight } from "lucide-react";
const CartTotalBtn = () => {
  const { total, activeCartId, isPending } = useCartData();
  const router = useRouter();

  const { status } = useSession();

  return (
    <div className="">
      <button
        disabled={isPending}
        onClick={() => {
          if (status !== "loading" && status === "unauthenticated") {
            router.push("/auth/signin");
            return;
          }
          router.push(`/checkout?cartId=${activeCartId}`);
        }}
        className={cn("flex w-full px-3 justify-between items-center bg-primary  h-7  box-border rounded-2xl text-primary-foreground hover:bg-slate-700 transition-300",status === "unauthenticated" && 'flex-row-reverse')}
      >
        <span className="font-semibold">
          {status === "unauthenticated" ? (
            <p className="text-sm flex items-center gap-1">
              Inicie sección  <ChevronRight />
            </p>
          ) : (
            "Total"
          )}
        </span>
        <span className="text-sm">
          {formatPrice(total.grossTotal! as number || 0) }
        </span>
      </button>
    </div>
  );
};

export default CartTotalBtn;
