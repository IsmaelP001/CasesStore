"use client";
import {
  createNewAddress,
  deleteAddress,
  updateAddress,
  updateDefaultAddress,
} from "../action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { Suspense, useState } from "react";
import { getDefaultAddress, getUserAddresses } from "../data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "../../../../components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../../../../components/ui/button";
import { FaHouse } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";




function AddressContent({handleOpenCloseModal}) {
 const [isAddNewAddress, setIsAddNewAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);

  const { data: addresses } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => await getUserAddresses(),
    
  });

  const { mutate: createAddressAction } = useMutation({
    mutationKey: ["createAd"],
    mutationFn: async(data)=> await createNewAddress(data),
    onSuccess: (data) => {
      if (data?._error) {
        setError(data?._error);
        return
      }
      if (error !== null) setError(null);
      
      queryClient.invalidateQueries(["userAddresses"]);
      handleReset()
      handleOpenCloseModal()
    },
    onError: (e) => {
      console.log("error creating address", e);
    },
  });

  const { mutate: setDefaultAction } = useMutation({
    mutationKey: ["setDefault"],
    mutationFn: updateDefaultAddress,
    onSuccess: (data) => {
     
      queryClient.invalidateQueries(["userDefaultAddress"]);
      handleReset()
      handleOpenCloseModal()
    },
    onError: (e) => {
      console.log("error updating address");
    },
  });

  const { mutate: updateAddressAction } = useMutation({
    mutationKey: ["update"],
    mutationFn: updateAddress,
    onSuccess: (data) => {
      if (data?._error) {
        setError(data?._error);
        return
      }
      if (error !== null) setError(null);
      
      queryClient.invalidateQueries(["userAddresses"]);
      handleReset()
    },
    onError: (e) => {
      console.log("error updating address");
    },
  });

  const { mutate: deleteAddressAction } = useMutation({
    mutationKey: ["delete"],
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries(["userAddresses"]);
      console.log("address deleted successfuly");
    },
    onError: (e) => {
      console.log("error updating address");
    },
  });

  const handleEditAddress = (address) => {
    setEditAddress(address);
  };

  function handleReset () {
    setEditAddress(null);
    setIsAddNewAddress(null);
  };

  const handleNewAddressForm = (FormData) => {
    
    if(editAddress){
       updateAddressAction(FormData)
       console.log('update address')
    }else{
       createAddressAction(FormData)
       console.log('create address')

    }
  };


  console.log('editAddress',editAddress)

  if(!isAddNewAddress && !editAddress){
    return (
      <div className="modal-box flex flex-col gap-4">
        <header className="flex justify-between">
          <h2 className="font-bold text-2xl mb-5">Cambiar direccion</h2>
        </header>
        <div>
          <div className="space-y-6">
            {addresses?.map((addressData) => {
              const { id, street, city, country, zipCode, references, userId } =
                addressData;
              return (
                <article key={id}>
                  <p className="space-x-2">
                    <span>{street || ""}</span>,<span>{city}</span>
                  </p>
                  <p className="space-x-2">
                    <span>{country || ""}</span>,<span>{zipCode}</span>
                  </p>
                  <div className="flex gap-6">
                    
                      <Button
                        type="button"
                        variant="link"
                        className=""
                        onClick={() =>
                          setDefaultAction({ addressId: id, userId })
                        }
                      >
                        Seleccionar
                      </Button>
                    
                    <Button
                      type="button"
                      variant="link"
                      className=""
                      onClick={() => handleEditAddress(addressData)}
                    >
                      Editar
                    </Button>
                    <Button
                      type="button"
                      variant="link"
                      className="text-red-600 hover:text-600 bg:secondary"
                      onClick={() =>
                        deleteAddressAction({ addressId: id, userId })
                      }
                    >
                      Eliminar
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <Button
          variant="secondary"
          type="button"
          className="hover:bg-primary hover:text-primary-foreground"
          onClick={() => setIsAddNewAddress(true)}
        >
          Añadir nueva direccion
        </Button>
      </div>
    );
  }


  return (
    <div className="modal-box flex flex-col gap-4">
      <header className="flex justify-between">
        <h2 className="font-bold text-2xl mb-5">Añadir direccion</h2>
      </header>

      <form action={handleNewAddressForm} className="space-y-5">
        <div className="grid grid-cols-2 gap-5 ">
          <input type="hidden" name="addressId" value={editAddress?.id} />
          <div className="flex flex-col">
            <Label htmlFor="street" className=" text-sm font-semibold">
              Calle
            </Label>
            <Input
              name="street"
              type="text"
              className="  "
              placeholder="ej. maria"
              defaultValue={editAddress?.street}
            ></Input>
            {error?.hasOwnProperty("street") && (
              <span className="text-red-500 font-normal text-sm ml-1 mt-0.5">
                {error.street[0]}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Label htmlFor="city" className=" text-sm font-semibold">
              Municipio
            </Label>
            <Input
              name="city"
              type="text"
              className=""
              placeholder="ej. perez"
              defaultValue={editAddress?.city}
            ></Input>
            {error?.hasOwnProperty("city") && (
              <span className="text-red-500 font-normal text-sm ml-1 mt-0.5">
                {error.city[0]}
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 ">
          <div className="flex flex-col">
            <Label htmlFor="country" className=" text-sm font-semibold">
              Pais
            </Label>
            <Input
              name="country"
              type="text"
              className=" "
              placeholder="ej. maria"
              defaultValue={editAddress?.country}
            ></Input>
            {error?.hasOwnProperty("country") && (
              <span className="text-red-500 font-normal text-sm ml-1 mt-0.5">
                {error.country[0]}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Label htmlFor="zipCode" className=" text-sm font-semibold">
              Codigo postal <span className="ml-2 text-xs">*Opcional</span>
            </Label>
            <Input
              name="zipCode"
              type="number"
              className=""
              placeholder="ej. perez"
              defaultValue={editAddress?.zipCode}
            ></Input>
            {error?.hasOwnProperty("zipCode") && (
              <span className="text-red-500 font-normal text-sm ml-1 mt-0.5">
                {error.zipCode[0]}
              </span>
            )}
          </div>
        </div>
        <div>
          <Textarea
            name="references"
            id=""
            cols="10"
            rows="4"
            className=" w-full resize-none"
            placeholder="Ej. Junto a la farmacia"
            defaultValue={editAddress?.references}
          ></Textarea>
        </div>

        <div className="flex gap-5">
          <Button
            className="bg-secondary text-primary hover:text-secondary"
            type="button"
            onClick={handleReset}
          >
            Atras
          </Button>
          <Button type="submit" className="">
            {" "}
            Guardar{" "}
          </Button>
        </div>
      </form>
    </div>
  );
}


const UserAddressModal = () => {
 
  const [open, setOpen] = React.useState(false);

  const { data: defaultAddress } = useQuery({
    queryKey: ["addressD"],
    queryFn: async () => await getDefaultAddress(),
  });

  //cierra y abre modal en mutacion, en componente AddressContent
  const handleOpenCloseModal=()=>{
    setOpen(!open)
  }

 

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      id="modalAddress"
      className="modal "
    >
      <DialogTrigger asChild>
        <Button className="flex justify-between bg-transparent rounded-b-md  text-primary border rounded-t-none border-primary px-3 hover:text-secondary w-full py-7">
          {defaultAddress?.address ? (
            <div className="flex items-center justify-between  flex-1 gap-3 ">
               <div className='flex items-center gap-4'>
               <FaHouse className="text-2xl" />
              <div>
                <p className="text-base font-semibold space-x-2">
                  <span>{defaultAddress.address.street}</span>,
                  <span>{defaultAddress.address.city}</span>
                </p>
                <p className="text-base space-x-2 font-semibold">
                  <span>{defaultAddress.address.country}</span>
                  <span>{defaultAddress.address.zipCode}</span>
                </p>
              </div>
               </div>
              <MdKeyboardArrowRight className="text-2xl" />

            </div>
          ) : (
            <div className="flex items-center justify-between gap-5  flex-1">
              <div className="flex gap-3 items-center">
                <FaHouse className="text-2xl" />
                <span>Seleccionar direccion</span>
              </div>
              <MdKeyboardArrowRight className="text-2xl" />
            </div>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Suspense fallback={<div>Loading...</div>}>
          <AddressContent handleOpenCloseModal={handleOpenCloseModal} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};

export default UserAddressModal;
