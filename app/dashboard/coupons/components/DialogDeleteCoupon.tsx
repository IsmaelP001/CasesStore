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
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils/utils";

const DialogDeleteCoupon= ({ id ,canBeDeleted}:{id:string,canBeDeleted:boolean}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const utils = trpc.useUtils()

  const { mutate: deleteCouponAction, isPending } = trpc.discountCode.deleteCoupon.useMutation({
    onSuccess: (data) => {
      setOpen(false);
      utils.discountCode.invalidate()
    },
    onError: () => {},
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button
        disabled={!canBeDeleted}
        className={cn(!canBeDeleted && 'text-gray-300')}
        >
          Eliminar
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar coupon</AlertDialogTitle>
          <AlertDialogDescription>
            Esta seguro que desea eliminar este coupon?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button type="button" className="text-primary">
              Cancelar
            </Button>
          </AlertDialogCancel>
          <Button
            type="submit"
            disabled={isPending}
            onClick={() =>{
                deleteCouponAction({id})
                router.refresh()
            }}
          >
            {isPending ? <span>Eliminando</span> : <span>Eliminar</span>}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogDeleteCoupon;
