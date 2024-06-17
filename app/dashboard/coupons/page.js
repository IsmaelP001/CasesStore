import {
  getActiveCoupons,
  getAsociatedProductsToCoupons,
  getExpiredCoupons,
} from "./data";
import Link from "next/link";
import React from "react";

import CouponsList from "./components/CouponsList";
import CouponsInactiveList from "./components/CouponsInactiveList";
import { Button } from "../../../components/ui/button";

const page = async () => {
  const expiredCoupons = await getExpiredCoupons();
  const activeCoupons = await getActiveCoupons();

  console.log("expiredCoupons", expiredCoupons);
  console.log("activeCoupons", activeCoupons);

  return (
    <div className="px-10 py-5">
      <header className="flex justify-between">
        <h2 className="text-5xl font-bold mb-10">Coupones</h2>
        <Button asChild>
          <Link href={"/dashboard/coupons/create"} className="btn btn-primary">
            Crear coupon
          </Link>
        </Button>
      </header>
      <div>
        <h4 className="font-semibold text-xl mb-5">Coupones activos</h4>
        <CouponsList coupons={activeCoupons} canDeactivate={true} />
      </div>

      <div>
        <h4 className="font-semibold text-xl mb-5">Coupones expirados</h4>
        <CouponsList isInactive={true} coupons={expiredCoupons} />
      </div>
    </div>
  );
};

export default page;
