
import Link from "next/link";
import React from "react";

import CouponsList from "./components/CouponsList";
import { Button } from "../../../components/ui/button";
import { serverHelpers } from "@/lib/trpc/serverHelper";
import { SidebarCreateCoupon } from "./components/SidebarCreateCoupon";
export const dynamic = "force-dynamic";

const page = async () => {
  await serverHelpers.discountCode.getActiveCoupons.prefetch()
  await serverHelpers.discountCode.getExpiredCoupons.prefetch()

  return (
    <div className="px-10 py-5">
      <header className="flex justify-between">
        <h2 className="text-5xl font-bold mb-10">Coupones</h2>
       <SidebarCreateCoupon/>
      </header>
      <div className="min-h-[300px]">
        <h4 className="font-semibold text-xl mb-5">Coupones activos</h4>
        <CouponsList couponsType="active" canDeactivate={true}  />
      </div>

      <div>
        <h4 className="font-semibold text-xl mb-5">Coupones expirados</h4>
        <CouponsList couponsType="expired" isInactive={true}  />
      </div>
    </div>
  );
};

export default page;
