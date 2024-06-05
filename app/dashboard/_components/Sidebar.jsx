"use client";
import Link from "next/link";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { GrProductHunt } from "react-icons/gr";
import { RiExpandRightFill } from "react-icons/ri";
import { RiContractLeftFill } from "react-icons/ri";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <aside
        className={`bg-blue-400 overflow-hidden transition-all duration-300 ease-in-out`}
        style={{ minWidth: open ? "16rem" : "4rem" }}
      >
        <header className="flex justify-between items-end px-2 pt-5">
          <h2 className={` text-2xl font-semibold h-7 ${open ? "block" : "hidden"}`}>Dashboard</h2>
          <button onClick={() => setOpen(!open)} className={`text-white  w-full flex ${open ? 'justify-end' : 'justify-center'}`}>
            {open ? <RiContractLeftFill className="text-2xl text-primary"/> : <RiExpandRightFill className=" text-2xl text-primary "/>}
          </button>
        </header>
        <nav className="px-5 pt-10">
          <ul className="space-y-5">
            <li>
              <Link
                href="/dashboard"
                className="btn btn-ghost btn-block flex gap-2 items-end"
              >
                <FaHome className="text-2xl" />
                {open && <span className="text-sm font-semibold">Home</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/orders"
                className="btn btn-ghost btn-block flex gap-2 items-end"
              >
                <FaShoppingBag className="text-2xl" />
                {open && (
                  <span className="text-sm font-semibold">Ordenes</span>
                )}{" "}
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/coupons"
                className="btn btn-ghost btn-block flex gap-2 items-end"
              >
                <MdDiscount className="text-2xl" />
                {open && (
                  <span className="text-sm font-semibold">Descuentos</span>
                )}
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/customers"
                className="btn btn-ghost btn-block flex gap-2 items-end"
              >
                <BsFillPeopleFill className="text-2xl" />
                {open && (
                  <span className="text-sm font-semibold">Clientes</span>
                )}
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/products"
                className="btn btn-ghost btn-block flex gap-2 items-end"
              >
                <GrProductHunt className="text-2xl" />
                {open && (
                  <span className="text-sm font-semibold">Productos</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
     
    </div>
  );
};

export default Sidebar;
