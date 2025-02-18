"use client";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { trpc } from "@/lib/trpc/client";
import { useGiftContext } from "../giftContext";
import GiftContactList from "./GiftContactList";
import CreateEditUserGift from "./CreateEditUserGift";

import {  ChevronRight, Gift } from "lucide-react"; // solo importa los necesarios
import { formatPhoneNumber } from "@/lib/utils/utils";
import { useEffect } from "react";

const UserGiftModal = () => {
  const { open, setOpen, renderState,handleSetCurrentGiftId} = useGiftContext()!;
  const [giftDataDefault] = trpc.userFeatures.gift.getDefaultGift.useSuspenseQuery(
    undefined,
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  useEffect(()=>{
    handleSetCurrentGiftId(giftDataDefault?.giftId!)
  },[giftDataDefault,handleSetCurrentGiftId])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="bg-transparent text-black   w-full hover:text-white hover:bg-primary flex items-center justify-between gap-2 px-3 py-2"
        >
          <Gift size={30} />
          {giftDataDefault?.gift ? (
            <div className="text-left flex-1 ">
              <p className="flex gap-x-1">
                <span className="text-base font-semibold tracking-wider">
                  {giftDataDefault.gift.firstName}
                </span>
                <span className="text-base font-semibold tracking-wider">
                  {giftDataDefault.gift.lastName}
                </span>
              </p>
              <p className="font-semibold text-xs tracking-wider">
                {formatPhoneNumber(giftDataDefault?.gift.phonenumber!)}
              </p>
            </div>
          ) : (
            <div className="flex font-semibold items-center justify-between gap-5 flex-1">
              <span>Enviar como regalo</span>
            </div>
          )}
          <ChevronRight />
        </button>
      </DialogTrigger>
      <DialogContent aria-describedby="dialog content">
        {renderState === "list" ? <GiftContactList /> : <CreateEditUserGift />}
      </DialogContent>
    </Dialog>
  );
};

export default UserGiftModal;
