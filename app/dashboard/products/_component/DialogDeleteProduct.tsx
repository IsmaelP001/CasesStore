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
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

const DialogDeleteProduct = ({id}:{id:string}) => {
  const router = useRouter()
  const [open,setOpen]=useState(false)

  // const { mutate: deleteProductAction,isPending } = useMutation({
  //   mutationFn: deleteProduct,
  //   onSuccess: (data) => {
  //       setOpen(false)
  //   },
  //   onError: () => {
  //   },
  // });


  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <MdDelete className="text-2xl text-red-500" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar producto</AlertDialogTitle>
          <AlertDialogDescription>
            Esta seguro que desea eliminar este producto?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button type="button" className="text-primary">Cancelar</Button>
          </AlertDialogCancel>
            {/* <Button type="submit" disabled={isPending} onClick={() => deleteProductAction(id)}>
              {
                isPending ? <span>Eliminando</span>:<span>Eliminar</span>
              }
            </Button> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogDeleteProduct;
