import { HiMiniGlobeAlt } from "react-icons/hi2";
import { IoIosInfinite } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import ActiveToogleDropdown from './ActiveToogleDropdown'
import DeleteDropdownItem from './DeleteDropdownItem'


const CouponsActiveList = ({coupons,canDeactivate}) => {

  
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
                {coupon.isActive && canDeactivate ? (
                  <FaCheckCircle className="text-xl text-green-600" />
                ) : (
                  <IoIosCloseCircle className="text-xl text-red-600" />
                )}
              </th>
              <td>{coupon.code}</td>
              <td>{coupon.discountAmount}</td>
              <td>{coupon.uses}</td>
              <td>
                {coupon.limit === null ? <IoIosInfinite className="text-xl" /> : coupon.limit}
              </td>
              <td>{coupon.allProducts ? <HiMiniGlobeAlt className="text-2xl text-blue-700" /> : coupon?.productDiscount?.map(item=>{
                return <spam key={coupon.id} className='text-[0.60rem]'>{item.productDiscount.name}</spam>
              })}</td>
              <td>{coupon.expiredAt.toDateString()}</td>
              <td>
              <div className="dropdown dropdown-left">
                <div tabIndex={0} role="button" className="btn m-1">
                <BsThreeDotsVertical className="text-xl"/>

                </div>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                   {canDeactivate &&  <ActiveToogleDropdown id={coupon.id} isActive={coupon.isActive}/>}
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

export default CouponsActiveList;
