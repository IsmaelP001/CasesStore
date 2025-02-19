// components/DesignConfigurator.tsx
"use client";
import { useRouter } from "next/navigation";
import { useDesign } from "../hooks/useDesign-context";
import { useSaveDesign } from "../hooks/useSaveDesign";
import { ConfigurationPanel } from "./ConfigurationPanel";
import { PhoneCasePreview } from "./PhoneCasePreview";
import { UploadOverlay } from "./UploadOverlay";
import { ChevronLeft } from "lucide-react";
import { SelectModelDialog } from "./SelectModelDialog";
import Link from "next/link";
import Image from "next/image";

const DesignConfigurator = () => {
  const router = useRouter();

  return (
    <section className="relative py-0   overflow-hidden  ">
      <div className="absolute top-1.5 left-4 z-[45] h-fit w-full flex justify-between ">
        <button
          className="border-2 border-black rounded-full grid place-content-center w-[35px] h-[35px]"
          onClick={() => router.back()}
        >
          <ChevronLeft size={20} />
        </button>
        <Link className="" href="/">
          <Image
            src="/icons/cartago-logo.png"
            width={50}
            height={50}
            className="w-[85px] h-[50px] object-cover pt-1 object-center"
            alt="cartago-logo"
          />
        </Link>
        <div/>
      </div>

      <div className=" fixed inset-0 "></div>
      <div className=" min-h-[100dvh] w-full  pt-1.5  relative  grid grid-rows-[1fr_155px] md:grid-rows-1 md:place-items-center md:grid-cols-2 lg:grid-cols-3   ">
        <div className="grid gap-1 md:gap-2 grid-rows-[auto_1fr] place-items-center lg:col-span-2 w-full">
           <div className="w-fit m-auto ">
           <SelectModelDialog />
           </div>
          <div className="w-full my-auto ">
          <PhoneCasePreview />
          </div>
        </div>
        <ConfigurationPanel />
      </div>
    </section>
  );
};

export default DesignConfigurator;
