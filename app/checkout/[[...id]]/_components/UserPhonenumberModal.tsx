"use client";

import { Phone, ChevronRight } from "lucide-react";

import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { useEffect, useState } from "react";
import { Input } from "../../../../components/ui/input";
import { cn, formatPhoneNumber } from "../../../../lib/utils/utils";
import { trpc } from "@/lib/trpc/client";
import useFormHandler from "@/hooks/useFormHandler";
import { UserSchema, userSchema } from "@/lib/schemas/userSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const UserPhonenumberModal = () => {
  const [open, setOpen] = useState(false);
  const utils = trpc.useUtils();

  const { form, isInputChanged } = useFormHandler(userSchema.partial(), {
    phonenumber: "",
  });

  const [userData] = trpc.user.getUser.useSuspenseQuery(undefined, {
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    form.setValue(
      "phonenumber",
      formatPhoneNumber(userData?.phonenumber || "")
    );
  }, [userData, form]);

  const { mutate: updatePhonenumberAction, isPending: isPendingMutation,error} =
    trpc.user.updateUser.useMutation({
      onSuccess: () => {
        utils.user.getUser.invalidate();
        setOpen(false);
      },
      onError: (err) => {
        console.log("error al actualizar numero de telefono", err);
      },
    });

  const handleSubmit = (values: Partial<UserSchema>) => {
    updatePhonenumberAction(values);
  };

  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={cn(
            "bg-transparent gap-2   text-black  w-full   hover:text-white hover:bg-primary flex items-center justify-between px-3 py-3 "
          )}
        >
          <Phone size={30} />

          <div className="flex gap-2 items-center flex-1">
            {userData?.phonenumber ? (
              <span className="text-base font-semibold">
                {formatPhoneNumber(userData.phonenumber)}
              </span>
            ) : (
              <div className="flex items-center font-semibold justify-between gap-5 flex-1">
                <span>Numero de contacto</span>
              </div>
            )}
          </div>
          <ChevronRight />
        </button>
      </DialogTrigger>
      <DialogContent>
        <div className="modal-box flex flex-col gap-4">
          <header className="flex justify-between">
            <DialogTitle className="font-bold text-2xl mb-5">
              Modificar numero de telefono
            </DialogTitle>
          </header>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="phonenumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numero de telefono</FormLabel>
                    <FormControl>
                      <Input
                        maxLength={12}
                        className="text-base font-medium"
                        placeholder="Ej: 809-541-6541"
                        {...field}
                        onChange={(e) => {
                          const formattedNumber = formatPhoneNumber(
                            e.target.value
                          );
                          field.onChange(formattedNumber);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-5 mt-5">
             
                <Button
                  disabled={!isInputChanged || isPendingMutation}
                  type="submit"
                  className="w-full"
                >
                  {isPendingMutation ? <p>Guardando...</p> : <p>Guardar</p>}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserPhonenumberModal;
