"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils/utils";
import { Filter } from "lucide-react";

export default function SidebarFilterTrigger() {
  const {open, setOpen } = useSidebar();
  const isMobile = useIsMobile()
  return (
    <button
      className={cn(" flex items-center text-sm font-semibold px-2 py-1  right-4 z-50 bg-accent text-white  rounded-full",!isMobile && 'hidden' )}
      onClick={() => setOpen(!open)}
    >
      <Filter size={15} />
      <span>Filtrar</span>
    </button>
  );
}
