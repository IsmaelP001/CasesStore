"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getTotalPrice } from "../../lib/data/cart";
import { isPending } from "@reduxjs/toolkit";
import { cookies } from "next/cache";

const CartTotalBtn = () => {
  const {
    data: cartData,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["totalPrice"],
    queryFn: async () => await getTotalPrice(),
  });



  return (
    <div className="">
      <Link
        href={`/checkout/id=${cartData?.cartId}`}
        className="flex w-full px-4 justify-between items-center bg-primary  h-7  box-border rounded-2xl text-primary-foreground hover:bg-slate-700 transition-300"
      >
        <span className="font-semibold">Total</span>
        {isFetching ? (
          <span>Loading...</span>
        ) : (
          <span>{cartData?.price?.totalPrice || 0}</span>
        )}
      </Link>
    </div>
  );
};

export default CartTotalBtn;
