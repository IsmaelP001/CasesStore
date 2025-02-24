"use client";
import ErrorBoundary from "@/components/ErrorBoundary";
import FilterDevices from "./FilterDevices";
import { Suspense, useEffect, useState } from "react";
import FilterCollections from "./FilterCollections";
import SkeletonFilters from "./SkeletonFilters";
import FilterColors from "./FilterColors";
import FilterGetPrintPatterns from "./FilterGetPrintPatterns";
import FilterMaterials from "./FilterMaterials";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils/utils";
import { ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

type RenderElementType =
  | "devices"
  | "colections"
  | "colors"
  | "design"
  | "materials";
interface RenderElementTypeProps {
  type: RenderElementType[];
  currentElement: RenderElementType;
}

const FILTER_TYPES = [
  { value: "devices", label: "Dispositivos" },
  { value: "colections", label: "Colecciones" },
  { value: "colors", label: "Colores" },
  { value: "design", label: "Diseños" },
  { value: "materials", label: "Materiales" },
];
function RenderElementType({ type, currentElement }: RenderElementTypeProps) {
  const isRenderElement = (element: RenderElementType) => {
    return type.includes(element) ? true : false;
  };
  return (
    <div>
      {isRenderElement("colections") && currentElement === "colections" ? (
        <ErrorBoundary>
          <Suspense fallback={<SkeletonFilters />}>
            <FilterCollections />
          </Suspense>
        </ErrorBoundary>
      ) : null}
      {isRenderElement("colors") && currentElement === "colors" ? (
        <ErrorBoundary>
          <Suspense fallback={<SkeletonFilters />}>
            <FilterColors />
          </Suspense>
        </ErrorBoundary>
      ) : null}

      {isRenderElement("devices") && currentElement === "devices" ? (
        <ErrorBoundary>
          <Suspense fallback={<SkeletonFilters />}>
            <FilterDevices />
          </Suspense>
        </ErrorBoundary>
      ) : null}
      {isRenderElement("materials") && currentElement === "materials" ? (
        <ErrorBoundary>
          <Suspense fallback={<SkeletonFilters />}>
            <FilterMaterials />
          </Suspense>
        </ErrorBoundary>
      ) : null}
      {isRenderElement("design") && currentElement === "design" ? (
        <ErrorBoundary>
          <Suspense fallback={<SkeletonFilters />}>
            <FilterGetPrintPatterns />
          </Suspense>
        </ErrorBoundary>
      ) : null}
    </div>
  );
}

export default function FilterSidebar() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [renderFilter, setRenderFilter] = useState<RenderElementType[]>([
    "devices",
  ]);
  const isMobile = useIsMobile();

  const handleScroll = () => {
    if (window.scrollY > 68) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <Sidebar variant="sidebar">
      <SidebarHeader />
      <SidebarContent>
        <div className={cn("space-y-3   px-5 mt-0.5 ", !hasScrolled  && !isMobile ? "mt-14" :null)}>
          <h3 className="quicksand text-center font-bold text-base ">
            Filtrar
          </h3>
          <div className="space-y-2 ">
            {FILTER_TYPES.map((item) => (
              <>
                <article
                  className="px-3 py-2  font-medium bg-white  border border-gray-100 rounded-xl flex items-center justify-between gap-2"
                  key={item.label}
                  onClick={() => {
                    if (
                      renderFilter.includes(item.value as RenderElementType)
                    ) {
                      setRenderFilter((prev) =>
                        prev.filter((filter) => filter !== item.value)
                      );
                      return;
                    }
                    setRenderFilter([
                      ...renderFilter,
                      item.value as RenderElementType,
                    ]);
                  }}
                >
                  <p >{item.label}</p>
                  <ChevronRight
                    size={18}
                    className={cn(
                      "transition-all duration-300",
                      renderFilter.includes(item.value as RenderElementType) &&
                        "rotate-90 "
                    )}
                  />
                </article>
                <div className="ml-2">
                  <RenderElementType
                    currentElement={item.value as RenderElementType}
                    type={renderFilter}
                  ></RenderElementType>
                </div>
              </>
            ))}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}


