"use client";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
// UserGiftModal.tsx
import { useGiftContext } from "../giftContext";
import useFormHandler from "@/hooks/useFormHandler";
import { giftScheme } from "@/lib/schemas/giftScheme";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useEffect } from "react";
import useGiftActions from "../giftActions";
import Loading from "@/components/Loading";
import { DialogTitle } from "@/components/ui/dialog";
import { formatPhoneNumber } from "@/lib/utils/utils";

const CreateEditUserGift = () => {
  const { editGiftData, handleReset, renderState } = useGiftContext()!;
  const { createGift, updateGift, isPending } = useGiftActions();

  const { form, isInputChanged } = useFormHandler(giftScheme, {
    senderName: "",
    message: "",
    firstName: "",
    lastName: "",
    phonenumber: "",
  });

  useEffect(() => {
    if (renderState === "update" && editGiftData) {
      form.setValue("firstName", editGiftData?.firstName!);
      form.setValue("lastName", editGiftData?.lastName!);
      form.setValue("message", editGiftData?.message!);
      form.setValue("senderName", editGiftData?.senderName!);
      form.setValue("phonenumber", editGiftData?.phonenumber!);
    } else {
      form.reset();
    }
  }, [renderState, editGiftData, form]);

  const handleSubmit = (values: z.infer<typeof giftScheme>) => {
    editGiftData || renderState === "update"
      ? updateGift({...values,id:editGiftData?.id!})
      : createGift(values);
  };

  return (
    <div className="modal-box flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
          <header className="flex justify-between">
            <DialogTitle className="font-bold text-2xl mb-5">
              { renderState === "update"
                ? "Actualizar información"
                : "Nueva persona"}
            </DialogTitle>
          </header>
          <FormField
            control={form.control}
            name="senderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tu nombre completo</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej:Juan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Rodriguez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Mensaje</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phonenumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numero de telefono</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej:809-549-5423"
                    {...field}
                    onChange={(e) => {
                      const formattedNumber = formatPhoneNumber(e.target.value);
                      field.onChange(formattedNumber);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-5">
            <Button
              disabled={isPending}
              variant="outline"
              type="button"
              onClick={handleReset}
            >
              Atrás
            </Button>
            <Button disabled={!isInputChanged || isPending} type="submit">
              {isPending ? (
                <p className="flex gap-1">
                  Creando <Loading />
                </p>
              ) : (
                "Guardar"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateEditUserGift;
