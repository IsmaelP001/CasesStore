"use client";
import ErrorBoundary from "@/components/ErrorBoundary";
import FilterDevices from "./FilterDevices";
import { Suspense } from "react";
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

export default function FilterSidebar() {
  return (
    <Sidebar  variant='sidebar'>
      <SidebarHeader />
      <SidebarContent >
        <div className="space-y-3 mt-16  px-5">
          <ErrorBoundary>
            <Suspense fallback={<SkeletonFilters />}>
              <FilterDevices />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SkeletonFilters />}>
              <FilterCollections />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SkeletonFilters />}>
              <FilterColors />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SkeletonFilters />}>
              <FilterGetPrintPatterns />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SkeletonFilters />}>
              <FilterMaterials />
            </Suspense>
          </ErrorBoundary>
        </div>
      </SidebarContent>
    </Sidebar>
  );

}
