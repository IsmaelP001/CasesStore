"use client";
import {
  createNewGift,
  deleteGift,
  updateDefaultGift,
  updateGiftInfo,
} from "../action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
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

const UserGiftModal = ({ defaultGiftId }) => {
  const [isNewGift, setIsNewGift] = useState(false);
  const [editGift, setEditGift] = useState(null);
  const [open, setOpen] = React.useState(false)

  const queryClient = useQueryClient();

  const { data: giftData } = useQuery({
    queryKey: ["regalo"],
    queryFn: async () => await getUserGift(17),
  });
  const closeGiftModal = () => {
    document.getElementById("modalGift").close();
  };

  const { data: giftDataDefault } = useQuery({
    queryKey: ["gift"],
    queryFn: async () => await getDefaultGift(),
  });

  const userId = giftData ? giftData[0]?.userId : null;

  const { mutate: createGiftAction } = useMutation({
    mutationKey: ["createdGift"],
    mutationFn: createNewGift,
    onSuccess: () => {
      queryClient.invalidateQueries(["regalo"]);
      setIsNewGift(false);
      setOpen(false)
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
      setOpen(false)
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

  const handleEditGift = (giftData) => {
    setEditGift(giftData);
  };

  const handleReset = () => {
    setEditGift(null);
    setIsNewGift(null);
  };

  const handleNewGiftForm = (FormData) => {
    if (editGift) {
      updateGiftAction(FormData);
    } else {
      createGiftAction(FormData);
    }
    handleReset();
  };



  function CreateGiftContent(){
    return(
    
         <div className="modal-box flex flex-col gap-4">
          <header className="flex justify-between">
            <h2 className="font-bold text-2xl ">Informacion de la persona</h2>
          </header>

          <form action={handleNewGiftForm} className="space-y-5">
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


  function DefaultGIftContent(){
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
                    {giftId !== defaultGiftId ? (
                      <Button
                        type="btn"
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
                      type="btn"
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
          className="hover:bg-primary hover:text-primary-foreground"
          onClick={() => setIsNewGift(true)}
        >
          Añadir Informacio de regalo
        </Button>
      </div>
   
    )
  }

  

  return (
    <Dialog open={open} onOpenChange={setOpen} id="modalGift" className="modal ">
      <DialogTrigger asChild>
        <Button
          className="bg-transparent  text-primary border-x border-primary rounded-none  w-full  hover:text-secondary  flex items-center justify-between px-3 py-7 "
        >
          {giftDataDefault?.gift ? (
            <div className="flex justify-between">
              <div className="flex gap-5 items-center">
                <FaGifts className="text-2xl" />
                <div>
                  <p className="flex gap-1">
                    <span className=" text-base font-semibold ">
                      {giftDataDefault.gift.firstName}
                    </span>
                    <span className="text-base font-semibold">{giftDataDefault.gift.lastName}</span>
                  </p>
                  <p className="text-base  font-semibold">
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
        {isNewGift || editGift ? <CreateGiftContent/>:<DefaultGIftContent/>}
      </DialogContent>
     
    </Dialog>
  );
};

export default UserGiftModal;
