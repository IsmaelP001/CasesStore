"use client";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import { cn } from "../../../lib/utils/utils";
import Phone from "../../(store)/_components/Phone";
import { Button } from "../../../components/ui/button";
import {  useRouter, useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import useCartItemsActions from "@/hooks/useCartItemsActions";
import useCartData from "@/hooks/useCartData";

const DesignPreview = ({ configuration }: any) => {
  const [showConfetti, setConfetti] = useState(false);
  const { id, imageUrl } = configuration || {};
  const searchParams = useSearchParams()
  const router = useRouter();


  useEffect(() => {
    setConfetti(true);
  }, []);

 
  const {handleAddCustomCaseItem,isPending}=useCartItemsActions()
  const { activeCartId, isPending:isPendingCart } = useCartData();

  const handleSubmit =async(
  ) => {
    const {deviceId,materialId}= Object.fromEntries(searchParams.entries())
    await handleAddCustomCaseItem({ configurationId: id,deviceId,productId:materialId });
  };

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
      >
        {id && (
          <Confetti
            active={showConfetti}
            config={{ elementCount: 400, spread: 180 }}
          />
        )}
      </div>

      <div className=" pt-8 pb-5 px-10 space-y-5">
        <header className="text-center">
          <h2 className="text-3xl font-semibold">Felicitaciones!</h2>
          <p>Tu funda personalizada esta lista</p>
        </header>
        <div className="gap-4 md:gap-10  flex flex-col md:flex-row  justify-center items-center pb-2">
          <div className="relative ">
            <Phone
              imgSrc={imageUrl}
              dark={false}
              className={cn(
                "max-w-[120px] md:max-w-[220px]"
              )}
            ></Phone>
          </div>
          <div className="flex flex-col gap-5">
            <div className="space-y-5">
              <h2 className="text-xl font-semibold">Caracteristicas</h2>
              <div>
                <p className="flex items-center gap-2">
                  <Check className="text-green-700"/>
                  <span>Materal de Silicona de alta calidad</span>
                </p>
                <p className="flex items-center gap-2">
                  <Check className="text-green-700"/>
                  <span>Laminado resistente a rallones y huellas dactilares</span>
                </p>
                <p className="flex items-center gap-2">
                  <Check className="text-green-700"/>
                  <span>Laminado con garantia</span>
                </p>
              </div>
            </div>
            <div >
            <Button className="block w-full mb-2 bg-accent rounded-3xl font-medium hover:bg-accent/80" disabled={isPending} onClick={async()=>await handleSubmit()}>Añadir al carrito</Button>
            <Button className="block w-full rounded-3xl font-medium" disabled={isPending || isPendingCart} onClick={async()=>{
              router.push(`/cases`);
            }} >Seguir comprando</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignPreview;
