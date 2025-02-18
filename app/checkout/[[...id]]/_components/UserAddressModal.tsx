"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { trpc } from "@/lib/trpc/client";
import { useAddressContext } from "../addressContext";
import AddressList from "./AddressList";
import CreateEditAddress from "./CreateEditAddress";
import { ChevronRight, House } from "lucide-react";

const UserAddressModal = () => {
  const { open, setOpen, renderState,handleSetCurrentAddressId } = useAddressContext()!;
  const [defaultAddress] = trpc.userFeatures.address.getDefaultAddress.useSuspenseQuery(
    undefined,
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  useEffect(()=>{
    handleSetCurrentAddressId(defaultAddress?.addressId!)
  },[defaultAddress,handleSetCurrentAddressId])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-transparent  text-black  w-full hover:text-white hover:bg-primary flex gap-2 items-center justify-between px-3 py-3">
          <House size={30} />
          {defaultAddress ? (
            <div className="  text-left flex-1 ">
              <p >
                <span className="text-base font-semibold tracking-wider">
                  {defaultAddress?.address?.street}
                </span>
              </p>
              <p className="text-base space-x-2 font-semibold tracking-wider">
                <span> {defaultAddress?.address?.city}</span>
                <span>{defaultAddress?.address?.zipCode}</span>
              </p>
            </div>
          ) : (
            <div className="flex font-semibold items-center justify-between gap-5 flex-1">
              <span>Añadir dirección</span>
            </div>
          )}
          <ChevronRight />
        </button>
      </DialogTrigger>
      <DialogContent>
        {renderState === "list" ? <AddressList /> : <CreateEditAddress />}
      </DialogContent>
    </Dialog>
  );
};

export default UserAddressModal;
