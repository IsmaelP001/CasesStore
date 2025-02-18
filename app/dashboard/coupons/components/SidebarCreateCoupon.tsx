"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/muti-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import useFormHandler from "@/hooks/useFormHandler";
import { couponScheme } from "@/lib/schemas/couponScheme";
import { cn } from "@/lib/utils/utils";
import { trpc } from "@/lib/trpc/client";
import { CalendarIcon } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { z } from "zod";

export function SidebarCreateCoupon() {
  moment.locale("es");
  const { toast } = useToast();
  const { data: devices } = trpc.catalog.getDevices.useQuery();
  const [open, setOpen] = useState<boolean>(false);
  const devicesList = useMemo(() => {
    return devices?.map(({ id, name }) => ({ value: id, label: name })) || [];
  }, [devices]);
  const utils = trpc.useUtils()
  const { mutateAsync: createCouponAction, isPending } =
    trpc.discountCode.createCoupon.useMutation({
      onSuccess: (data) => {
        setOpen(false);
        utils.discountCode.getActiveCoupons.invalidate()
      },
      onError: (err) => {
        let errMessage="Error al crear el producto"
        if(err.data?.code === 'FORBIDDEN'){
          errMessage=err.message
        }
        toast({
          title: "Nuevo producto",
          description:errMessage,
          variant: "destructive",
        });
      },
    });

  const { form } = useFormHandler(couponScheme, {
    code: "",
    discountAmount: 0,
    discountType: "FIXED",
    allProducts: true,
  });

  const handleSubmit = async (values: z.infer<typeof couponScheme>) => {
    console.log("new coupon", values);
    await createCouponAction(values);
  };


  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Crear coupon</Button>
      </SheetTrigger>
      <SheetContent className="w-[400px]">
        <SheetHeader>
          <SheetTitle>Crear coupon</SheetTitle>
        </SheetHeader>
        <div className="py-5 px-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-3"
            >
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Codigo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: DESCUENTOALL20" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiresAt"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de expiracion</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field?.value ? (
                              // format(field.value, "PPP")
                              field?.value?.toDateString()
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <div>
                          <Calendar
                            mode="single"
                            selected={field?.value!}
                            onSelect={field.onChange}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discountAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad de descuento</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        placeholder="ej: 500"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discountType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Tipo de descuento</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="FIXED" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Descuento fijo
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="PORCENTAGE"
                              id="PORCENTAGE"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Descuento por porcentaje
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="allProducts"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Productos permitidos</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(val) => {
                          const value = val === "true" ? true : false;
                          field.onChange(value);
                        }}
                        defaultValue={field.value.toString()}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={"true"} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Todos los productos{" "}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={"false"} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Seleccionar productos
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="limit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Limite de usos</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        placeholder="ej:20"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Dejar vacio para usos infinitos
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Limite de usos</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={devicesList}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        placeholder="Selecciona dispositivos"
                        variant="inverted"
                        animation={2}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SheetFooter>
                <Button type="submit" className="btn btn-primary">
                  Crear cupon
                </Button>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="button">Atras</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
