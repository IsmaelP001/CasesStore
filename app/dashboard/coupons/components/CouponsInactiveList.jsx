import { HiMiniGlobeAlt } from "react-icons/hi2";
import { IoIosInfinite } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import ActiveToogleDropdown from './ActiveToogleDropdown'
import DeleteDropdownItem from './DeleteDropdownItem'
import { formatDateToLocal } from "../../../../lib/utils/utils";

const CouponsInactiveList = ({coupons,isInactive,canDeactivate}) => {
    
    return (
      <div className="overflow-x-auto mb-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Estado</th>
              <th>Codigo</th>
              <th>Cantidad de descuento</th>
              <th>Usos</th>
              <th>Limite</th>
              <th>Productos</th>
              <th>Fecha de expiracion</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {coupons?.map((coupon) => (
              <tr key={coupon.id}>
                <th>
                  {!coupon.isActive && isInactive? (
                    <FaCheckCircle className="text-xl text-green-600" />
                  ) : (
                    <IoIosCloseCircle className="text-xl text-red-600" />
                  )}
                </th>
                <td>{coupon.code}</td>
                <td>{coupon.discountAmount}</td>
                <td>{coupon.uses}</td>
                <td>
                  {coupon.limit === null ? <IoIosInfinite /> : coupon.limit}
                </td>
                <td>{coupon.allProducts ? <HiMiniGlobeAlt /> : "Products"}</td>
                <td>{formatDateToLocal(coupon.expiresAt)}</td>
                <td>
                <div className="dropdown dropdown-left">
                <div tabIndex={0} role="button" className="btn m-1">
                  <BsThreeDotsVertical className="text-xl"/>
                </div>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                   <DeleteDropdownItem id={coupon.id} disabled={coupon.order.length>0}/>
                  </ul>
               </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default CouponsInactiveList;
  