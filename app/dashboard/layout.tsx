"use client";
import Link from "next/link";
import Sidebar from "./_components/Sidebar";
import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarAdmin } from "./_components/SidebarAdmin";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <SidebarAdmin/>
      <div className="relative w-[100vw] overflow-x-auto">
        <SidebarTrigger/>
        {children}
        </div>
    </SidebarProvider>
  );
};

export default Layout;
