"use client";
import { useRouter } from "next/navigation";
import { ConfigurationPanelV2 } from "./ConfigurationPanelV2";
import { ChevronLeft } from "lucide-react";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";
const PhoneCaseConfiguratorV3 = dynamic(() => import('./PhoneCaseConfiguratorV3'), {
  ssr: false,
  loading: () => <div className="min-h-svh grid place-content-center">
    <Loading/>
  </div>,
});

const DesignConfiguratorContainer = () => {
  const router = useRouter();

  return (
    <section className="relative py-0  min-h-[100svh]  overflow-hidden  ">
      <div className="absolute  top-1.5 left-1 right-0 pr-5 z-[45] h-fit w-fit flex justify-between ">
        <button
          className="border-2 border-black rounded-full grid place-content-center w-[35px] h-[35px]"
          onClick={() => router.back()}
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      <div className=" w-full  h-[100svh]    relative  grid grid-rows-[1fr_auto] md:grid-rows-1  md:grid-cols-2 lg:grid-cols-3   ">
        <div className="w-full   box-border overflow-hidden lg:col-span-2  ">
         
        <PhoneCaseConfiguratorV3/>
        </div>
        <ConfigurationPanelV2 />
      </div>
     
    </section>
  );
};

export default DesignConfiguratorContainer;
