"use client";

import { MdKeyboardArrowRight, MdOutlineLocalPhone } from "react-icons/md";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { updatePhoneNumber } from "../action";
import { useMutation, useQueryClient,useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getUserData } from "../data";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";

const UserPhonenumberModal = ({ defaultPhonenumber }) => {

  
  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient();

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => await getUserData(),
  });

  

  const { mutate: updatePhonenumberAction } = useMutation({
    mutationKey: ["updatePhonenumber"],
    mutationFn: updatePhoneNumber,
    onSuccess: () => {
      queryClient.invalidateQueries(["userData"]);
      setOpen(false)
    },
    onError: (err) => {
      console.log("error al actualizar numero de telefono", err);
    },
  });


  return (
    <Dialog open={open} onOpenChange={setOpen} id="modalPhonenumber" className="modal ">
      <DialogTrigger asChild>
      <Button
          className="bg-transparent  text-primary border-2 w-full border-primary  hover:text-secondary  flex items-center justify-between p-6 rounded-lg btn-outline btn-block"
        
        >
          <div className="flex gap-2 items-center">
            <MdOutlineLocalPhone className="text-2xl" />

            {userData?.phonenumber ? (
              <p>{userData?.phonenumber}</p>
            ) : (
              <span>Añadir informacion de contacto</span>
            )}
            <MdKeyboardArrowRight className="text-2xl" />

          </div>
        </Button>     
       </DialogTrigger>
      <DialogContent>
        <div className="modal-box flex flex-col gap-4">
          <header className="flex justify-between">
            <h2 className="font-bold text-2xl mb-5">
              Modificar numero de telefono
            </h2>
          </header>

          <form action={updatePhonenumberAction}>
            <div>
              <Label htmlFor="phonenumber">Numero de telefono</Label>
              <Input
                name="phonenumber"
                type="number"
                className=" w-full"
                placeholder="ej: 8098546526"
                defaultValue={userData?.phonenumber}
              ></Input>
            </div>
            <div className="flex gap-5 mt-5">
              <Button
                type="button"
                className="bg-secondary text-primary hover:text-secondary"
                onClick={()=>setOpen(false)}
              >
                Atras
              </Button>
              <Button type="submit" className="btn btn-primary btn-sm">
                Guardar
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserPhonenumberModal;
