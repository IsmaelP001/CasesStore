"use client";

import {  useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils/utils";
import {  SlidersHorizontal } from "lucide-react";

export default function SidebarFilterTrigger() {
  const {openMobile, setOpenMobile } = useSidebar();
  const isMobile = useIsMobile()

  return (
    <button
      className={cn(" flex items-center text-sm gap-1 font-medium px-2 py-1  right-4 z-10 text-black  rounded-full",!isMobile && 'hidden' )}
      onClick={() => setOpenMobile(!openMobile)}
    >
      <SlidersHorizontal size={15} />
      <span>Filtrar</span>
    </button>
  );
}
