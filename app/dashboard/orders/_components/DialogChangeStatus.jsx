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

const DialogChangeStatus = ({ selectedStatus,setSelectedStatus,isDialogOpen,setIsDialogOpen }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter()


  // const { mutate: changeOrderStatusAction } = useMutation({
  //   mutationFn: changeOrderStatus,
  //   onSuccess: (data) => {
  //     console.log(data)
  //     setSelectedStatus({...selectedStatus,status:{[data?.id]:data?.status}})
  //     setOpen(false);
  //   },
  //   onError: () => {
  //   },
  // });


  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cambio de estatus</AlertDialogTitle>
          <AlertDialogDescription>
            Esta seguro que desea cambiar el estatus de esta orden?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button type="button" className="text-primary" onClick={()=>{
              setSelectedStatus(null)
            }
            }>Cancelar</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button type="submit" 
            // onClick={() => changeOrderStatusAction(selectedStatus)}
            >
              Guardar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogChangeStatus;
