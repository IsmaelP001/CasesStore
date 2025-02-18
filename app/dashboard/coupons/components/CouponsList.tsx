'use client'
import { IoIosInfinite } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import ActiveToogleDropdown from "./ActiveToogleDropdown";
import { formatDateToLocal } from "../../../../lib/utils/utils";
import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import DialogDeleteCoupon from './DialogDeleteCoupon'
import { CouponItem } from "@/server/coupon/domain/models";
import useCouponData from "../useCouponData";
import { useMemo } from "react";
import Loading from "@/components/Loading";
import { Ellipsis } from "lucide-react";

interface CouponListProps{
  couponsType: "active" | "expired",
  canDeactivate?:boolean,
  isInactive?:boolean
}

const CouponsActiveList = ({ couponsType, canDeactivate, isInactive }:CouponListProps) => {

  const {activeCoupons,expiredCoupons,isPending}=useCouponData()

  const couponList=useMemo(()=>{
    return couponsType === 'active' ? activeCoupons : expiredCoupons
  },[couponsType,activeCoupons,expiredCoupons])

  if(isPending){
    <div className="grid place-content-center min-h-20">
      <Loading/>
    </div>
  }

  return (
    <div className="overflow-x-auto mb-10">
      <Table className="table">
        {/* head */}
        <TableHeader>
          <TableRow>
            <TableHead>Estado</TableHead>
            <TableHead>Codigo</TableHead>
            <TableHead>Cantidad de descuento</TableHead>
            <TableHead>Usos</TableHead>
            <TableHead>Limite</TableHead>
            <TableHead>Productos</TableHead>
            <TableHead>Fecha de expiracion</TableHead>
            <TableHead>options</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {/* row 1 */}
          {couponList?.map((coupon) => (
            <TableRow key={coupon.id} className="text-center">
              <TableCell>
                {coupon.isActive && !isInactive ? (
                  <FaCheckCircle className="text-xl text-green-600 m-auto" />
                ) : (
                  <IoIosCloseCircle className="text-xl text-red-600 m-auto" />
                )}
              </TableCell>
              <TableCell>{coupon.code}</TableCell>
              <TableCell>{coupon.discountAmount}</TableCell>
              <TableCell>{coupon.uses}</TableCell>
              <TableCell>
                {coupon.limit === null ? (
                  <IoIosInfinite className="text-xl m-auto" />
                ) : (
                  coupon.limit
                )}
              </TableCell>
              <TableCell>
                {/* {coupon.allProducts ? (
                  <HiMiniGlobeAlt className="text-2xl text-blue-700 m-auto" />
                ) : (
                  coupon?.productDiscount?.map((item) => {
                    return (
                      <spam key={coupon.id} className="text-[0.60rem]">
                        {item.productDiscount.name}
                      </spam>
                    );
                  })
                )} */}
              </TableCell>
              <TableCell>{formatDateToLocal(coupon?.expiresAt!)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger >
                    <Ellipsis/>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent asChild>
                    <div className="flex flex-col gap-0.5">
                      {canDeactivate && (
                        <ActiveToogleDropdown
                          id={coupon?.id!}
                          isActive={coupon?.isActive!}
                        />
                      )}
                     <DialogDeleteCoupon canBeDeleted={coupon?.uses! > 0 ? false:true} id={coupon?.id!}/>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CouponsActiveList;
