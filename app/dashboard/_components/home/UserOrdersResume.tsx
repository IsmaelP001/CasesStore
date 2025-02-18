'use client'
import { formatPrice } from "@/lib/utils/utils";
import { trpc } from "@/lib/trpc/client";
import React from "react";
import { BsFillHandbagFill } from "react-icons/bs";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { IoBagCheck, IoPeople } from "react-icons/io5";

export default function UserOrdersResume() {


    const [ordersData]=trpc.order.getTotalOrderRevenue.useSuspenseQuery(undefined,{
        refetchOnMount:false,
        refetchOnWindowFocus:false
    })
    const [usersData]=trpc.user.getTotalCustomers.useSuspenseQuery(undefined,{
        refetchOnMount:false,
        refetchOnWindowFocus:false
    })

  return (
    <div className="flex justify-between gap-5">
      <div className="space-y-2 bg-white p-2 rounded-xl flex-1 px-5">
        <div className="p-3 rounded-md bg-blue-100 w-fit">
          <BsFillHandbagFill className="text-xl  text-blue-600" />
        </div>
        <h4 className="text-sm font-normal tracking-wide">Total de ingresos</h4>
        <span className="text-xl font-semibold mt-1">
          {formatPrice(ordersData?.totalRevenew)}
        </span>
      </div>

      <div className="space-y-2 bg-white p-2 rounded-xl flex-1 px-5">
        <div className="p-3 rounded-md bg-blue-100 w-fit">
          <IoBagCheck className="text-xl text-blue-600" />
        </div>
        <h4 className="text-sm font-normal tracking-wide">Total ordenes</h4>
        <span className="text-xl font-semibold mt-1">
          {ordersData?.totalOrders}
        </span>
      </div>

      <div className="space-y-2 bg-white p-2 rounded-xl flex-1 px-5">
        <div className="p-3 rounded-md bg-blue-100 w-fit">
          <FaMoneyCheckDollar className="text-xl text-blue-600" />
        </div>
        <h4 className="text-sm font-normal tracking-wide">
          Promedio de ordenes
        </h4>
        <span className="text-xl font-semibold mt-1">
          {formatPrice(ordersData?.orderAverage)}
        </span>
      </div>

      <div className="space-y-2 bg-white p-2 rounded-xl flex-1 px-5">
        <div className="p-3 rounded-md bg-blue-100 w-fit">
          <IoPeople className="text-xl text-blue-600" />
        </div>
        <h4 className="text-sm font-normal tracking-wide">Total de usuarios</h4>
        <span className="text-xl font-semibold mt-1">
          {usersData?.totalUsers}
        </span>
      </div>
    </div>
  );
}
