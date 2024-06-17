import { HiMiniGlobeAlt } from "react-icons/hi2";
import { IoIosInfinite } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import ActiveToogleDropdown from "./ActiveToogleDropdown";
import DeleteDropdownItem from "./DeleteDropdownItem";
import { formatDateToLocal } from "../../../../lib/utils/utils";
import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
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
import { Button } from "../../../../components/ui/button";

const CouponsActiveList = ({ coupons, canDeactivate, isInactive }) => {
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* row 1 */}
          {coupons?.map((coupon) => (
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
                {coupon.allProducts ? (
                  <HiMiniGlobeAlt className="text-2xl text-blue-700 m-auto" />
                ) : (
                  coupon?.productDiscount?.map((item) => {
                    return (
                      <spam key={coupon.id} className="text-[0.60rem]">
                        {item.productDiscount.name}
                      </spam>
                    );
                  })
                )}
              </TableCell>
              <TableCell>{formatDateToLocal(coupon.expiresAt)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <BsThreeDots className="text-xl" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent asChild>
                    <div className="flex flex-col gap-0.5">
                      {canDeactivate && (
                        <ActiveToogleDropdown
                          id={coupon.id}
                          isActive={coupon.isActive}
                        />
                      )}
                      <DeleteDropdownItem
                        id={coupon.id}
                        disabled={coupon.order.length > 0}
                      />
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

// <TableCell>
// <div className="dropdown dropdown-left">
//   <div tabIndex={0} role="button" className="btn m-1">
//     <BsThreeDotsVertical className="text-xl" />
//   </div>
//   <ul
//     tabIndex={0}
//     className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
//   >
//     {canDeactivate && (
//       <ActiveToogleDropdown
//         id={coupon.id}
//         isActive={coupon.isActive}
//       />
//     )}
//     <DeleteDropdownItem
//       id={coupon.id}
//       disabled={coupon.order.length > 0}
//     />
//   </ul>
// </div>
// </TableCell>
