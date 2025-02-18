"use client";

import { trpc } from "@/lib/trpc/client";

const useCouponData = () => {
  const { data: activeCoupons, isFetching: isFetchingActiveCoupons } =
    trpc.discountCode.getActiveCoupons.useQuery(undefined, {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  const { data: expiredCoupons, isFetching: isFetchingExpiredCoupons } =
    trpc.discountCode.getExpiredCoupons.useQuery(undefined, {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  const isPending =
    isFetchingActiveCoupons || isFetchingExpiredCoupons ? true : false;

    console.log('active coupons',activeCoupons)
    console.log('expired coupons',expiredCoupons)


  return {
    activeCoupons,
    expiredCoupons,
    isPending,
  };
};

export default useCouponData;
