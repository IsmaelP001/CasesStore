// components/DesignConfigurator.tsx
"use client";
import { useRouter } from "next/navigation";
import { ConfigurationPanelV2 } from "./ConfigurationPanelV2";
import { ChevronLeft } from "lucide-react";
import { PhoneCasePreview } from "./PhoneCasePreview";

const DesignConfiguratorContainer = () => {
  const router = useRouter();

  return (
    <section className="relative py-0   overflow-hidden  ">
      <div className="absolute  top-1.5 left-4 right-0 pr-5 z-[45] h-fit w-full flex justify-between ">
        <button
          className="border-2 border-black rounded-full grid place-content-center w-[35px] h-[35px]"
          onClick={() => router.back()}
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      <div className=" fixed inset-0 "></div>
      <div className=" min-h-[100svh] w-full    relative  grid grid-rows-[1fr_155px] md:grid-rows-1  md:grid-cols-2 lg:grid-cols-3   ">
        <PhoneCasePreview />

        <ConfigurationPanelV2 />
      </div>
    </section>
  );
};

export default DesignConfiguratorContainer;
