import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { FaHome } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { GrProductHunt } from "react-icons/gr";
import { RiExpandRightFill } from "react-icons/ri";
import { RiContractLeftFill } from "react-icons/ri";
import { GrStorage } from "react-icons/gr";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";

// Menu items.
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
export function SidebarAdmin() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {LINKS.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Link href={item.path}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
