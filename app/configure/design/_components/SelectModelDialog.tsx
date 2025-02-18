"use client";
import { Button } from "@/components/ui/button";
import { MATERIALS, MODELS } from "@/config/validators/option-validator";
import { BackpackIcon, ChevronDown, ChevronLeft } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/utils";
import { useDesign } from "../hooks/useDesign-context";
import { trpc } from "@/lib/trpc/client";
import { Skeleton } from "@/components/ui/skeleton";

type RenderElementType = "DEVICES" | "MATERIALS";
export function SelectModelDialog() {
  const [renderElementType, setRenderElementType] =
    useState<RenderElementType>("DEVICES");

  const { openSelectDeviceSidebar,setOpenSelectDeviceSidebar,designOptions, setDesignOptions } = useDesign();

  const { data: devices ,isPending:isPendingDevices} = trpc.catalog.getDevices.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const { data: materials,isPending:isPendingMaterials } = trpc.catalog.getProductsByType.useQuery(
    {
      productType: "CUSTOM_CASE_MATERIAL",
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const handleSelectDevice = (model: any) => {
    setRenderElementType("MATERIALS");
    setDesignOptions((prev) => ({ ...prev, model }));
  };

  const handleSelectMaterial = (material: any) => {
    setDesignOptions((prev) => ({ ...prev, material }));
  };

  useEffect(() => {
    if (designOptions.device.name && renderElementType !== "MATERIALS") {
      setRenderElementType("MATERIALS");
    }
  }, [openSelectDeviceSidebar, designOptions.device]);

  useEffect(()=>{
    if(devices?.length){
      setDesignOptions((prev)=>({...prev,device:devices[0]}))
    }
    if(materials?.length){
      const material={id:materials[0].id!,name:materials[0].name!}
      setDesignOptions((prev)=>({...prev,material}))
    }
  },[devices,materials])

  return (
    <>
      <Sheet open={openSelectDeviceSidebar} onOpenChange={setOpenSelectDeviceSidebar}>
        <SheetTrigger asChild>
          <div className="relative z-50 py-2 px-6 flex items-center cursor-pointer gap-1 bg-accent  text-base  text-black rounded-3xl  font-semibold space-x-2 ">
            <div className="flex gap-1 items-center  text-nowrap">
              {isPendingDevices && <Skeleton className="w-[80px] h-3"/>}
              <span className="text-nowrap">{designOptions.device.name}</span>{" "}
              <ChevronDown size={15} />
            </div>
            <span>|</span>
            <div className="flex gap-1 items-center text-nowrap">
            {isPendingMaterials && <Skeleton className="w-[80px] h-3"/>}
              <span className="text-nowrap">{designOptions.material.name}</span>{" "}
              <ChevronDown size={15} />
            </div>
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader></SheetHeader>
          <div className="relative overflow-hidden min-h-[75vh] mt-2">
            {renderElementType === "DEVICES" ? (
              <div className="space-y-3">
                <header>
                  <h3 className="text-base font-semibold mb-0.5">
                    Dispositivo
                  </h3>
                  <p className="font-light">
                    Selecciona tu tipo de dispositivo
                  </p>
                </header>
                <div className=" space-y-1 h-[75vh] overflow-scroll ">
                  {devices?.map((device) => (
                    <article
                      className={cn(
                        "border border-gray-400  rounded-xl p-2",
                        device.name === designOptions.device.name &&
                          "border-accent"
                      )}
                      key={device.name}
                      onClick={() => handleSelectDevice(device)}
                    >
                      {device.name}
                    </article>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <header className="flex items-center gap-2">
                  <button
                    onClick={() => setRenderElementType("DEVICES")}
                    className="rounded-full grid place-content-center w-[35px] h-[35px] border border-black"
                  >
                    <ChevronLeft />
                  </button>
                  <div>
                    <h3 className="text-base font-semibold ">Material</h3>
                    <p className="font-light">Selecciona el tipo de material</p>
                  </div>
                </header>
                <div className=" space-y-1 max-h-[75vh]">
                  {materials?.map((material) => (
                    <article
                      className={cn(
                        "border border-gray-400 rounded-xl p-2",
                        material?.name === designOptions.material.name &&
                          "border-accent"
                      )}
                      key={material.name}
                      onClick={() => handleSelectMaterial(material)}
                    >
                      {material.name}
                    </article>
                  ))}
                </div>
              </div>
            )}
            <div className=" absolute bottom-0 left-0 right-0 from-transparent bg-gradient-to-b to-white h-[30px] w-full" />
          </div>
          <SheetFooter>
            <SheetClose className="w-full mt-2">
              {renderElementType === "MATERIALS" && (
                <Button className="w-full" type="button">
                  Guardar
                </Button>
              )}
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
