"use client";
import { createNewAddress, deleteAddress, updateAddress, updateDefaultAddress } from "../action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { getDefaultAddress, getUserAddresses } from "../data";
import { Dialog, DialogContent, DialogHeader } from "../../../../components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../../../../components/ui/button";
import { FaHouse } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";

const UserAddress = ({defaultAddressId=1}) => {
  const [isAddNewAddress, setIsAddNewAddress] = useState(false);
  const [editAddress,setEditAddress]=useState(null)
  const [open, setOpen] = React.useState(false)

  const queryClient=useQueryClient();

  const { data: defaultAddress } = useQuery({
    queryKey: ["addressD"],
    queryFn: async () => await getDefaultAddress(),
  });


  console.log('defaultAddress',defaultAddress)

  const { data: addresses } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => await getUserAddresses(),
  });
 

  const {mutate:createAddressAction}=useMutation({
    mutationKey:['createAd'],
    mutationFn:createNewAddress,
    onSuccess:()=>{
        queryClient.invalidateQueries(['userAddresses'])
        setIsAddNewAddress(false);
        setOpen(false)
    },
    onError:(e)=>{
        console.log('error updating address')
    }
  })

  const {mutate:setDefaultAction}=useMutation({
    mutationKey:['setDefault'],
    mutationFn:updateDefaultAddress,
    onSuccess:()=>{
        queryClient.invalidateQueries(['userDefaultAddress'])
        setIsAddNewAddress(false);
        setOpen(false)
      
    },
    onError:(e)=>{
        console.log('error updating address')
    }
  })


  const {mutate:updateAddressAction}=useMutation({
    mutationKey:['update'],
    mutationFn:updateAddress,
    onSuccess:()=>{
        queryClient.invalidateQueries(['userAddresses'])
        setIsAddNewAddress(false);
        setEditAddress(null)
    },
    onError:(e)=>{
        console.log('error updating address')
    }
  })

  const {mutate:deleteAddressAction}=useMutation({
    mutationKey:['delete'],
    mutationFn:deleteAddress,
    onSuccess:()=>{
      queryClient.invalidateQueries(['userAddresses'])
      console.log('address deleted successfuly')
    },
    onError:(e)=>{
        console.log('error updating address')
    }
  })


  const handleEditAddress=(address)=>{
    setEditAddress(address)
  }

  const handleReset=()=>{
    setEditAddress(null);
    setIsAddNewAddress(null)
  }

  const handleNewAddressForm=(FormData)=>{
    if(editAddress){
        updateAddressAction(FormData);
    }else{
        createAddressAction(FormData);
    }
    handleReset();
  }
  

  function CreateAddressContent(){
    return(
      <div className="modal-box flex flex-col gap-4">
      <header className="flex justify-between">
        <h2 className="font-bold text-2xl mb-5">Añadir direccion</h2>
      
      </header>

      <form action={handleNewAddressForm}  className="space-y-5">
        <div className="grid grid-cols-2 gap-5 ">
          <input type="hidden" name="addressId" value={editAddress?.id}/>
          <div className="flex flex-col">
            <Label htmlFor="street" className=" text-sm font-semibold">Calle</Label>
            <Input
              name="street"
              type="text"
              className="  "
              placeholder="ej. maria"
              defaultValue={editAddress?.street}
            ></Input>
          </div>
          <div className="flex flex-col">
            <Label htmlFor="city" className=" text-sm font-semibold">Municipio</Label>
            <Input
              name="city"
              type="text"
              className=""
              placeholder="ej. perez"
              defaultValue={editAddress?.city}
            ></Input>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 ">
          <div className="flex flex-col">
            <Label htmlFor="country" className=" text-sm font-semibold">Ciudad</Label>
            <Input
              name="country"
              type="text"
              className=" "
              placeholder="ej. maria"
              defaultValue={editAddress?.country}
            ></Input>
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
        <Button type="submit" className=""> Guardar </Button>
      </div>
      </form>

     
    </div>
    )
  }



  function DefaultAddressContent(){
    return(
      <div className="modal-box flex flex-col gap-4">
      <header className="flex justify-between">
        <h2 className="font-bold text-2xl mb-5">Cambiar direccion</h2>
      </header>
      <div>
        <div className="space-y-6">
          {addresses?.map((addressData) => {
            const {id,street,city,country,zipCode,references,userId}=addressData
            return (
              <article key={id}>
                <p className="space-x-2">
                  <span>{street || ""}</span>,<span>{city}</span>
                </p>
                <p className="space-x-2">
                  <span>{country || ''}</span>,<span>{zipCode}</span>
                </p>
                <div className="flex gap-6">
                  {defaultAddressId !== 0 ?  <Button type="btn" variant="link" className="" onClick={()=>setDefaultAction({addressId:id,userId})}>Seleccionar</Button> : null}
                  <Button type="btn" variant="link" className="" onClick={()=>handleEditAddress(addressData)}>Editar</Button>
                  <Button type="btn" variant="link" className="text-red-600 hover:text-600 bg:secondary" onClick={()=>deleteAddressAction({addressId:id,userId})}>Eliminar</Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <Button variant="secondary"
          className="hover:bg-primary hover:text-primary-foreground"
        onClick={() => setIsAddNewAddress(true)}
      >
        Añadir nueva direccion
      </Button>
    </div>
    )
  }
  


  

  return (
    <Dialog open={open} onOpenChange={setOpen} id="modalAddress" className="modal ">
      <DialogTrigger asChild>
      <Button
          className="flex justify-between bg-transparent  text-primary border-2 border-primary p-6 hover:text-secondary w-full h-[5rem]"
        >
          {defaultAddress?.address ? (
            <div className="flex items-center gap-3 py-5 ">
              <FaHouse className="text-2xl" />
              <div>
                <p className="text-sm space-x-2">
                  <span>{defaultAddress.address.street}</span>,<span>{defaultAddress.address.city}</span>
                </p>
                <p className="text-sm space-x-2">
                  <span>{defaultAddress.address.country}</span>
                  <span>{defaultAddress.address.zipCode}</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-5">
              <FaHouse className="text-3xl" />
              <span>Seleccionar direccion</span>
              <MdKeyboardArrowRight className="text-2xl" />

            </div>
          )}

        </Button>
      </DialogTrigger>

      <DialogContent>
        {isAddNewAddress || editAddress ? <CreateAddressContent/> : <DefaultAddressContent/>}
      </DialogContent>

     
    </Dialog>
  );
};

export default UserAddress;
