"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { useRouter } from "next/navigation";
import { trpc } from "../../../../lib/trpc/client";
import useFormHandler from "@/hooks/useFormHandler";
import { productSchema } from "@/lib/schemas/productSchema";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { RiErrorWarningFill } from "react-icons/ri";
import Image from "next/image";
import { cn } from "@/lib/utils/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadProductImages } from "@/lib/actions/uploadProductImages";
import { MultiSelect } from "@/components/ui/muti-select";
import { productTypeEnumValues } from "@/server/catalog/domain/product.model";

export const fileSchema = z.object({
  image: z.any().refine((val) => (val?.length ? true : false), {
    message: "Seleccione una imagen",
  }),
  device: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

interface FilesImages {
  device: {
    id: string;
    name: string;
  };
  image: any;
}

export default function CreateProductSidebar() {
  const [files, setFiles] = useState<FilesImages[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);

  const { data: collections } = trpc.catalog.getCollections.useQuery(
    undefined,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const { data: printPattern } = trpc.catalog.getPrintPatterns.useQuery(
    undefined,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const { data: colors } = trpc.catalog.getColors.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: materials } = trpc.catalog.getMaterials.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: compatibleProducts } = trpc.catalog.getDevices.useQuery(
    undefined,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const devicesList = useMemo(() => {
    return (
      compatibleProducts?.map(({ id, name }) => ({ value: id, label: name })) ||
      []
    );
  }, [compatibleProducts]);

  const { form } = useFormHandler(productSchema, {
    name: "",
    price: 0,
    stock: 1,
    printPatternId: "",
    materialId: "",
    collectionId: "",
    colorId: "",
    isConfigurable: false,
    selectedProducts: [],
    productType: "CASE",
  });

  const formImage = useForm<z.infer<typeof fileSchema>>({
    resolver: zodResolver(fileSchema),
  });
  const fileRef = formImage.register("image");

  const mutation = trpc.catalog.createProduct.useMutation({
    onSuccess: (data) => {
      router.push("/dashboard/products");
    },
    onError: (err) => {
      if (err?.data?.zodError) {
        const zodErrors = Object.values(err.data.zodError.fieldErrors)
          .toString()
          .split(",");
        setErrors(zodErrors as any);
        return;
      }
      toast({
        title: "Nuevo producto",
        description: "Error al crear el producto",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (values: z.infer<typeof productSchema>) => {
    if (!files.length) {
      toast({
        title: "producto",
        description: "Incluye almenos una imagen al producto",
        variant: "destructive",
      });
    }

    const imagesData = new FormData();
    files.forEach((file, index) => {
      imagesData.append("files", file.image[0]);
    });

    const imagesUrlsUploaded = await uploadProductImages(imagesData);

    await mutation.mutateAsync({
      ...values,
      images: imagesUrlsUploaded,
    });
  };

  const handleSubmitImages = async (values: z.infer<typeof fileSchema>) => {
    const filesArray = Array.from(values.image);

    const newFileImages = {
      device: values.device,
      image: filesArray,
    };

    setFiles([...files, newFileImages]);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newId = e.target.value;
    if (e.target.checked) {
      setSelectedProducts((prev) => [...prev, newId]);
    } else {
      setSelectedProducts((prev) => {
        const newState = prev.filter((id) => id !== newId);
        return newState;
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Crear producto</Button>
      </SheetTrigger>
      <SheetContent className="md:w-[450px]">
        <SheetHeader>
          <SheetTitle className="mb-2 text-2xl">Crear producto</SheetTitle>
        </SheetHeader>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="product">Producto</TabsTrigger>
            <TabsTrigger value="images">Imagenes</TabsTrigger>
          </TabsList>
          <TabsContent value="product">
            <div>
              <div className=" space-y-0.5 overflow-y-scroll ">
                {errors &&
                  errors?.map((error, index) => (
                    <p
                      key={index}
                      className="text-sm font-normal text-red-600 flex gap-1"
                    >
                      <RiErrorWarningFill className="text-xl text-red-400" />{" "}
                      <span>{error}</span>
                    </p>
                  ))}
              </div>
              <Form {...form}>
                <form
                  method="post"
                  action={`/api/trpc/${mutation.trpc.path}`}
                  encType="multipart/form-data"
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="mt-10  px-3  space-y-2 overflow-y-scroll"
                >
                  {/* ROW */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="nombre" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            placeholder="precio"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>En almacen</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            placeholder="En stock"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="printPatternId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Patron</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione un patron" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              {printPattern?.map((printPattern) => (
                                <SelectItem
                                  key={printPattern?.id}
                                  value={printPattern?.id}
                                >
                                  {printPattern?.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="materialId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Material</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione un material" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              {materials?.map((material) => (
                                <SelectItem
                                  key={material?.id}
                                  value={material?.id}
                                >
                                  {material?.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="collectionId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Coleccion</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione una coleccion" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              {collections?.map((coleccion) => (
                                <SelectItem
                                  key={coleccion?.id}
                                  value={coleccion?.id}
                                >
                                  {coleccion?.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* ROW */}
                  <FormField
                    control={form.control}
                    name="colorId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione una color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              {colors?.map((color) => (
                                <SelectItem key={color?.id} value={color?.id}>
                                  {color?.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="productType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de producto</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione el tipo de producto" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              {productTypeEnumValues?.map((productType) => (
                                <SelectItem
                                  key={productType}
                                  value={productType}
                                >
                                  {productType}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isConfigurable"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Es configurable</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Es configurable?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={"false"}>Si</SelectItem>{" "}
                            <SelectItem value={"true"}>No</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <MultiSelect
                    options={devicesList}
                    onValueChange={setSelectedDevices}
                    defaultValue={selectedDevices}
                    placeholder="Selecciona dispositivos"
                    variant="inverted"
                    animation={2}
                    maxCount={3}
                  />

                  <div className="">
                    <Label className="text-base font-semibold ">
                      Dispositivos
                    </Label>
                    <div className="flex gap-5 flex-wrap flex-1 mt-1">
                      {compatibleProducts?.map(({ id, name }) => (
                        <Label
                          htmlFor={name}
                          key={id}
                          className={cn(
                            "px-3 py-2 border-2 rounded-xl",
                            selectedProducts.includes(id) && "border-blue-600"
                          )}
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            id={name}
                            checked={selectedProducts.includes(id)}
                            value={id}
                            onChange={handleCheckboxChange}
                          />
                          <span>{name}</span>
                        </Label>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" disabled={false}>
                    {false ? (
                      <span>Creando producto</span>
                    ) : (
                      <span>Crear producto</span>
                    )}{" "}
                  </Button>
                </form>
              </Form>
              {/* ROW */}

              {/* ROW */}
            </div>
          </TabsContent>
          <TabsContent value="images">
            <div className=" gap-5 ">
              <Form {...formImage}>
                <form onSubmit={formImage.handleSubmit(handleSubmitImages)}>
                  <FormField
                    control={formImage.control}
                    name="image"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>File</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              placeholder="shadcn"
                              {...fileRef}
                              onChange={(event) => {
                                const files = event.target.files?.length
                                  ? Array.from(event.target.files)
                                  : [];
                                field.onChange(files);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={formImage.control}
                    name="device"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dispositivo</FormLabel>
                        <Select
                          onValueChange={(val) =>
                            field.onChange(JSON.parse(val))
                          }
                          defaultValue={field.value?.id}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione un material" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              {compatibleProducts?.map((device) => (
                                <SelectItem
                                  key={device?.id}
                                  value={JSON.stringify(device)}
                                >
                                  {device?.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="mt-2 self-end" type="submit">
                    Añadir imagen
                  </Button>
                </form>
              </Form>
              <div>
                <div className=" flex-1 mt-1">
                  <div className="border   rounded-xl border-primary border-xl p-5 min-h-[350px] flex flex-wrap gap-2 ">
                    {files.length > 0 &&
                      files?.map((file, index) => {
                        const fileUrl = URL.createObjectURL(file.image[0]);
                        return (
                          <div
                            key={index}
                            className="relative w-[100px] h-[100px] border border-primary rounded-sm"
                          >
                            <Image
                              key={index}
                              fill
                              src={fileUrl}
                              alt="image_preview"
                              className="object-cover"
                              sizes="(max-width: 200px)"
                            ></Image>
                            <Button
                              type="button"
                              size="sm"
                              variant="link"
                              className="rounded-full absolute right-0 top-0"
                              onClick={() =>
                                setFiles((prevItems) =>
                                  prevItems.filter((_, i) => i !== index)
                                )
                              }
                            >
                              X
                            </Button>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
