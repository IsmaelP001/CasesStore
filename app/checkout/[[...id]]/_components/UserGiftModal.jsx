"use client";
import {
  createNewGift,
  deleteGift,
  updateDefaultGift,
  updateGiftInfo,
} from "../action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { Suspense, useRef, useState } from "react";
import { getDefaultGift, getUserGift } from "../data";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { FaGifts } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";



function GiftContent({handleOpenCloseModal}){
  const [isNewGift, setIsNewGift] = useState(false);
  const [editGift, setEditGift] = useState(null);
  const [error,setError]=useState(null)
  const queryClient = useQueryClient();


  const handleEditGift = (giftData) => {
    setEditGift(giftData);
  };

  const handleReset = () => {
    setEditGift(null);
    setIsNewGift(null);
  };

  const handleNewGiftForm = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    if (editGift) {
      updateGiftAction(data);
      console.log('updateGift')

    } else {
      createGiftAction(data);
      console.log('createGift')
    }
    // handleReset();
  };

  const { data: giftData } = useQuery({
    queryKey: ["regalo"],
    queryFn: async () => await getUserGift(17),
  });

  const { mutate: createGiftAction } = useMutation({
    mutationKey: ["createdGift"],
    mutationFn: createNewGift,
    onSuccess: (data) => {
      if (data?._error) {
        setError(data?._error);
        return
      }
      if (error !== null) setError(null);
      queryClient.invalidateQueries(["regalo"]);
      setIsNewGift(false);
      handleOpenCloseModal()
    },
    onError: (e) => {
      console.log("error updating gift");
    },
  });

  const { mutate: setDefaultAction } = useMutation({
    mutationKey: ["setDefaultGift"],
    mutationFn: updateDefaultGift,
    onSuccess: () => {
      queryClient.invalidateQueries(["default"]);
      setIsNewGift(false);
      handleOpenCloseModal()
    },
    onError: (e) => {
      console.log("error updating Gift");
    },
  });

  const { mutate: updateGiftAction } = useMutation({
    mutationKey: ["updateGift"],
    mutationFn: updateGiftInfo,
    onSuccess: () => {
      queryClient.invalidateQueries(["userGift"]);
      setIsNewGift(false);
      setEditGift(null)
    },
    onError: (e) => {
      console.log("error updating gift");
    },
  });

  const { mutate: deleteGiftAction } = useMutation({
    mutationKey: ["deleteGift"],
    mutationFn: deleteGift,
    onSuccess: () => {
      queryClient.invalidateQueries(["userGift"]);
      console.log("gift deleted successfuly");
    },
    onError: (e) => {
      console.log("error updating gift");
    },
  });

  if(!isNewGift && !editGift){
    return(
      <div className="modal-box flex flex-col gap-4">
        <header className="flex justify-between">
          <h2 className="font-bold text-2xl mb-5">Cambiar informacion</h2>
        </header>
        <div>
          <div className="space-y-6">
            {giftData?.map((gift) => {
              const {
                id: giftId,
                firstName,
                lastName,
                message,
                userId,
              } = gift;
              return (
                <article key={giftId}>
                  <p className="space-x-2">
                    <span>{firstName}</span>,<span>{lastName}</span>
                  </p>
                  <p className="text-xs text-ellipsis overflow-hidden">
                    <span>{message}</span>
                  </p>
                  <div className="flex gap-6">
                    {giftId ? (
                      <Button
                        type="button"
                        variant="link"
                        className=""
                        onClick={() => setDefaultAction({ giftId, userId })}
                      >
                        Seleccionar
                      </Button>
                    ) : null}
                    <Button
                      type="btn"
                      variant="link"
                      className=""
                      onClick={() => handleEditGift(gift)}
                    >
                      Editar
                    </Button>
                    <Button
                      type="button"
                      variant="link"
                      className="text-red-600"
                      onClick={() => deleteGiftAction({ giftId, userId })}
                    >
                      Eliminar
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <Button variant="secondary"
        type="button"
          className="hover:bg-primary hover:text-primary-foreground"
          onClick={() => setIsNewGift(true)}
        >
          Añadir Informacio de regalo
        </Button>
      </div>
   
    )
  }


  return(
  
       <div className="modal-box flex flex-col gap-4">
        <header className="flex justify-between">
          <h2 className="font-bold text-2xl ">Informacion de la persona</h2>
        </header>

        <form onSubmit={handleNewGiftForm} className="space-y-5">
          <div className="space-y-5 ">
            <Input type="hidden" name="giftId" value={editGift?.id} />
            <div className="space-y-1.5">
              <Label htmlFor="name" className=" text-sm font-semibold">
                Tu nombre completo
              </Label>
              <Input
                name="senderName"
                type="text"
                className=" w-full "
                placeholder="ej. Pedro Rodriguez"
                defaultValue={editGift?.senderName}
              ></Input>
               {error?.hasOwnProperty("senderName") && (
              <span className="text-red-500 font-normal text-sm ml-1 mt-0.5">
                {error?.senderName[0]}
              </span>
            )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="name" className=" text-sm font-semibold">
                Mensaje
              </Label>
              <Textarea
                name="message"
                id=""
                cols="10"
                rows="4"
                className="  w-full resize-none text-sm font-semibold"
                placeholder="Ej. te aprecio mucho, espero que te guste!!."
                defaultValue={editGift?.message}
              ></Textarea>
               {error?.hasOwnProperty("message") && (
              <span className="text-red-500 font-normal text-sm ml-1 mt-0.5">
                {error?.message[0]}
              </span>
            )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className=" space-y-1.5">
              <Label
                htmlFor="firstName"
                className="text-sm font-semibold"
              >
                Nombre
              </Label>
              <Input
                name="firstName"
                type="text"
                className="rounded-md input-info  "
                placeholder="ej. maria"
                defaultValue={editGift?.firstName}
              ></Input>
               {error?.hasOwnProperty("firstName") && (
              <span className="text-red-500 font-normal text-sm ml-1 mt-0.5">
                {error?.firstName[0]}
              </span>
            )}
            </div>
            <div className=" space-y-1.5">
              <Label
                htmlFor="lastName"
                className="text-sm font-semibold"
              >
                Apellido
              </Label>
              <Input
                name="lastName"
                type="text"
                className=" rounded-md input-info"
                placeholder="ej. perez"
                defaultValue={editGift?.lastName}
              ></Input>
               {error?.hasOwnProperty("lastName") && (
              <span className="text-red-500 font-normal text-sm ml-1 mt-0.5">
                {error?.lastName[0]}
              </span>
            )}
            </div>
          </div>

          <div className=" ">
            <div className=" space-y-1.5">
              <Label
                htmlFor="zipCode"
                className=" text-sm font-semibold"
              >
                Numero de telefono
              </Label>
              <Input
                name="phonenumber"
                type="number"
                className=" rounded-md input-info"
                placeholder="ej. 809-601-0262"
                defaultValue={parseInt(editGift?.phonenumber)}
              ></Input>
               {error?.hasOwnProperty("phonenumber") && (
              <span className="text-red-500 font-normal text-sm ml-1 mt-0.5">
                {error?.phonenumber[0]}
              </span>
            )}
            </div>
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
   
  )
}

const UserGiftModal = () => {
  const [open, setOpen] = React.useState(false)

  const handleOpenCloseModal=()=>{
    setOpen(!open)
  }

  const { data: giftDataDefault } = useQuery({
    queryKey: ["gift"],
    queryFn: async () => await getDefaultGift(),
  });


  return (
    <Dialog open={open} onOpenChange={setOpen} id="modalGift" className="modal ">
      <DialogTrigger asChild>
        <Button
        type="button"
          className="bg-transparent  text-primary border-x border-primary rounded-none  w-full  hover:text-secondary  flex items-center justify-between px-3 py-7 "
        >
          {giftDataDefault?.gift ? (
            <div className="flex justify-between flex-1 items-center">
              <div className="flex gap-5 items-center">
                <FaGifts className="text-2xl" />
                <div>
                  <p className="flex gap-1">
                    <span className=" text-base font-semibold  tracking-wider">
                      {giftDataDefault.gift.firstName}
                    </span>
                    <span className="text-base font-semibold tracking-wider">{giftDataDefault.gift.lastName}</span>
                  </p>
                  <p className="  font-semibold tracking-wider">
                    {giftDataDefault.gift.phonenumber.toString()}
                  </p>
                </div>
              </div>
              <MdKeyboardArrowRight className="text-2xl  " />
            </div>
          ) : (
              <div className="flex items-center justify-between gap-5  flex-1">
               <div className='flex gap-3 items-center'>
                <FaGifts className="text-2xl" />
                <span>Enviar como regalo</span>
               </div>
              <MdKeyboardArrowRight className="text-2xl" />

            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Suspense fallback={<div>Loading...</div>}>
         <GiftContent handleOpenCloseModal={handleOpenCloseModal}/>
        </Suspense>
      </DialogContent>
     
    </Dialog>
  );
};

export default UserGiftModal;
