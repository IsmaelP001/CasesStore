import { getActiveCoupons, getAsociatedProductsToCoupons, getExpiredCoupons } from "./data";
import Link from "next/link";
import React from "react";


import CouponsActiveList from './components/CouponsActiveList'
import CouponsInactiveList from './components/CouponsInactiveList'


const page = async () => {
  const expiredCoupons = await getExpiredCoupons();
  const activeCoupons = await getActiveCoupons();

  console.log(expiredCoupons)
  console.log(activeCoupons)


  return (
    <div className="px-10 py-5">
      <header className="flex justify-between">
        <h2 className="text-5xl font-bold mb-10">Coupones</h2>
        <Link href={"/dashboard/coupons/create"} className="btn btn-primary">
          Crear coupon
        </Link>
      </header>
      <div>
        <h4 className="font-semibold text-xl mb-5">Coupones activos</h4>
        <CouponsActiveList coupons={activeCoupons} canDeactivate={true}/>
      </div>

      <div>
        <h4 className="font-semibold text-xl mb-5">Coupones expirados</h4>
        <CouponsInactiveList coupons={expiredCoupons} isInactive={true}/>
      </div>
    </div>
  );
};

export default page;
