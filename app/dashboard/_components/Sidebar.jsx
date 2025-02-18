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
import { GrStorage } from "react-icons/gr";
import { usePathname } from "next/navigation";
import { cn } from "../../../lib/utils/utils";
import { RiLogoutCircleRLine } from "react-icons/ri";

const LINKS = [
  {
    label: "Home",
    path: "/dashboard",
    icon:FaHome
  },
  {
    label: "Productos",
    path: "/dashboard/products",
    icon:GrProductHunt

  },
  {
    label: "Ordenes",
    path: "/dashboard/orders",
    icon:FaShoppingBag
  },
  {
    label: "Descuentos",
    path: "/dashboard/coupons",
    icon:MdDiscount
  },
  {
    label: "Almacen",
    path: "/dashboard/storage",
    icon:GrStorage

  },
  {
    label: "Clientes",
    path: "/dashboard/users",
    icon:BsFillPeopleFill
  },
];

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const path = usePathname()

  return (
    <div className="">
      <aside
        className={`bg-blue-300/25 transition-all duration-300 px-5 ease-in-out h-full sticky inset-0`}
        style={{ minWidth: open ? "14rem" : "4rem" }}
      >
        <header className='px-5 py-10  flex items-end pt-5 absolute  right-0 left-0'>
        <h2
            className={`text-2xl font-semibold h-7 transition-all  ease-in-out ${
              open ? "opacity-100 visible delay-300" : "absolute opacity-0 invisible left-100 "
            }`}
          >
            Dashboard
          </h2>
          <button
            onClick={() => setOpen(!open)}
            className="text-white flex  w-full"
          >
            {open ? (
              <RiContractLeftFill className="text-2xl text-primary  ml-8 " />
            ) : (
              <RiExpandRightFill className=" text-2xl text-primary " />
            )}
          </button>
        </header>
        <nav className=" pt-2 absolute mt-24">
          <ul className="space-y-8">
            {LINKS.map((link) => {
             return <li key={link.label}>
                <Link href={link.path} className={cn("flex gap-2 items-end text-gray-600 tracking-wider",path.endsWith(link.path) && "font-semibold text-blue-600 ")}>
                  <link.icon className="text-xl text-inherit" />
                  {open && (
                    <span className="text-sm font-inherit">{link.label}</span>
                  )}
                </Link>
              </li>;
            })}
          </ul>
          <div className=" border-t-2 border-black mt-10"></div>
          <Link
            href="/dashboard/products"
            className="border-t-1 border-black mt-4 flex items-center gap-2"
          >
            <RiLogoutCircleRLine className="text-2xl" />
            {open && <span className="text-sm font-semibold">Logout</span>}
          </Link>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
