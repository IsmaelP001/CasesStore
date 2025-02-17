"use client";

import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { trpc } from "@/lib/trpc/client";
import { useAddressContext } from "../addressContext";
import useAddressActions from "../useAddressActions";
import useFormHandler from "@/hooks/useFormHandler";
import { AddressSchema, addressScheme } from "@/lib/schemas/newAdressSheme";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import Loading from "@/components/Loading";
import { useEffect } from "react";
import { DialogTitle } from "@/components/ui/dialog";

const CreateEditAddress = () => {
  const { currentAddressId, renderState, editAddressData, handleReset } =
    useAddressContext()!;
  const { form, isInputChanged } = useFormHandler(addressScheme, {
    street: "",
    city: "",
    country: "",
    zipCode: "",
    references: "",
  });


  const { updateAddress, createAddress, isPending } = useAddressActions();

  useEffect(()=>{
    if(renderState === 'update' && editAddressData){
      form.setValue('city',editAddressData?.city!)
      form.setValue('country',editAddressData?.country!)
      form.setValue('references',editAddressData?.references!)
      form.setValue('street',editAddressData?.street!)
      form.setValue('zipCode',editAddressData?.zipCode!)
    }else{
      form.reset()
    }
  },[renderState,editAddressData,form])

  const handleSubmit = (values: AddressSchema) => {
    editAddressData || renderState === "update"
      ? updateAddress({ ...values, id: editAddressData?.id! })
      : createAddress(values);
  };

  return (
    <div className="modal-box flex flex-col gap-4">
      <header className="flex justify-between">
        <DialogTitle className="font-bold text-2xl mb-5">
          {renderState === "update"
            ? "Actualizar información"
            : "Nueva dirección"}
        </DialogTitle>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Calle</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: Los claveles" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Santo domingo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pais</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Republica dominicana" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Codigo postal</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: Republica dominicana" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="references"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Referencias</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ej: Junto a la farmacia Ramirez"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-5">
            <Button disabled={isPending} variant="outline" type="button" onClick={handleReset}>
              Atrás
            </Button>
            <Button disabled={!isInputChanged || isPending} type="submit">
               {isPending ?  <p className="flex gap-1">Creando <Loading/></p>: 'Guardar'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateEditAddress;
