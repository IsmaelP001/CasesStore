"use client";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog";
import { Button } from "../../../../components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {changeUserRol} from '../action'

const DialogChangeStatus = ({ selectedRol,setSelectedRol,isDialogOpen,setIsDialogOpen }) => {
  const router = useRouter()


  const { mutate: changeUserRolAction } = useMutation({
    mutationFn: changeUserRol,
    onSuccess: (data) => {
        setSelectedRol({...selectedRol,allRols:{[data?.userId]:data?.rol}})
    },
    onError: () => {
    },
  });


  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cambio de Rol</AlertDialogTitle>
          <AlertDialogDescription>
            Esta seguro que desea cambiar el rol de este usuario?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button type="button" className="text-primary">Cancelar</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button type="submit" onClick={() => changeUserRolAction(selectedRol)}>
              Guardar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogChangeStatus;
