// components/DesignConfigurator.tsx
"use client";
import { useRouter } from "next/navigation";
import { useDesign } from "../hooks/useDesign-context";
import { useSaveDesign } from "../hooks/useSaveDesign";
import { ConfigurationPanel } from "./ConfigurationPanel";
import { PhoneCasePreview } from "./PhoneCasePreview";
import { UploadOverlay } from "./UploadOverlay";
import { ChevronLeft } from "lucide-react";

const DesignConfigurator = () => {
  const router = useRouter();

  return (
    <section className="relative py-0   overflow-hidden pt-1.5">
      <div className="absolute top-1.5 left-4 z-[45] h-fit w-fit">
        <button
          className="border-2 border-black rounded-full p-1"
          onClick={() => router.back()}
        >
          <ChevronLeft />
        </button>
      </div>

      <div className="bg-gray-200 fixed inset-0 "></div>
      <div className="select-none min-h-[99vh] relative  grid grid-rows-[1fr_auto] md:place-items-center md:grid-cols-2 lg:grid-cols-3  px-5 overflow-hidden">
        
          <PhoneCasePreview />
          <ConfigurationPanel />
        
      </div>
    </section>
  );
};

export default DesignConfigurator;
