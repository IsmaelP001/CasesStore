"use client";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCollections,
  getPrintPatterns,
  getColors,
  getMaterials,
  getCompatibleProducts,
} from "../../../../lib/data/products";
import { useState } from "react";
import Image from "next/image";
import { createProduct } from "./action";
import { Checkbox } from "../../../../components/ui/checkbox";
import { cn } from "../../../../lib/utils/utils";
import { Toast } from "../../../../components/ui/toast";
import { useToast } from "../../../../components/ui/use-toast";
import Link from "next/link";
import { RiErrorWarningFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

const NewProductPage = () => {
  const [files, setFiles] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [errors, setErrors] = useState(null);
  const router = useRouter()
  const { toast } = useToast();
  const { data: collections } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
  });
  const { data: printPattern } = useQuery({
    queryKey: ["printpatterns"],
    queryFn: getPrintPatterns,
  });
  const { data: colors } = useQuery({
    queryKey: ["colors"],
    queryFn: getColors,
  });
  const { data: materials } = useQuery({
    queryKey: ["materials"],
    queryFn: getMaterials,
  });
  const { data: compatibleProducts } = useQuery({
    queryKey: ["compatibleproducts"],
    queryFn: getCompatibleProducts,
  });

  const { mutate: createProductAction, isPending } = useMutation({
    mutationKey: ["crete_product"],
    mutationFn: createProduct,
    onSuccess: (data) => {
      if (data?._error) {
        //  setErrors(data._error)
        setErrors(Object.values(data._error).flat());
        console.log('dataErr',data._error,data)
        return;
      }
      router.push('/dashboard/products')
    },
    onError: (err) => {
      console.log('error',err)
      toast({
        title: "Nuevo producto",
        description: "Error al crear el producto",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const imagesData = new FormData();
    files.forEach((file, index) => {
      imagesData.append("files", file);
    });

    const formData = new FormData(e.target);
    const productData = Object.fromEntries(formData);

    createProductAction({ productData, imagesData, selectedProducts });
  };

  const handleCheckboxChange = (e) => {
    const newId = parseInt(e.target.value);
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
    <div className="px-10 pt-10">
      <h2 className="text-3xl font-semibold">Nuevo producto</h2>
      <div className='mt-5 space-y-0.5' >
        {errors &&
          errors?.map((error, index) => (
            <p key={index} className="text-sm font-normal text-red-600 flex gap-1">
              <RiErrorWarningFill className="text-xl text-red-400"/> <span>{error}</span>
            </p>
          ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-10  px-10  space-y-4">
        {/* ROW */}
        <div className="flex gap-5">
          <div className="flex-1 space-y-1">
            <Label className="text-base font-semibold ">Nombre</Label>
            <Input placeholder="Nombre del producto" name="name"></Input>
          </div>

          <div className="space-y-1">
            <Label className="text-base font-semibold">Precio</Label>
            <Input placeholder="Precio" type="number" name="price"></Input>
          </div>

          <div className="space-y-1">
            <Label className="text-base font-semibold">En almacen</Label>
            <Input
              type="number"
              placeholder="Cantidad"
              defaultValue={1}
              name="stock"
            ></Input>
          </div>
        </div>

        {/* ROW */}
        <div className="flex gap-5 ">
          <div className="flex-1 space-y-1">
            <Label className=" text-base font-semibold">Patron</Label>
            <Select className="w-full">
              <SelectTrigger>
                <SelectValue placeholder="Patron" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {printPattern?.map((printPattern) => (
                    <SelectItem
                      key={printPattern?.id}
                      value={printPattern?.name}
                    >
                      {printPattern?.name}
                      <input
                        type="hidden"
                        name="printPatternId"
                        value={printPattern?.id}
                      ></input>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 space-y-1">
            <Label className="ml text-base font-semibold">Material</Label>
            <Select className="w-full">
              <SelectTrigger>
                <SelectValue placeholder="Material" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {materials?.map((material) => (
                    <SelectItem key={material?.id} value={material?.name}>
                      {material?.name}
                      <input
                        type="hidden"
                        name="materialId"
                        value={material?.id}
                      ></input>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 space-y-1">
            <Label className="ml text-base font-semibold">Colección</Label>
            <Select className="w-full">
              <SelectTrigger>
                <SelectValue placeholder="Colección" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {collections?.map((coleccion) => (
                    <SelectItem key={coleccion?.id} value={coleccion?.name}>
                      {coleccion?.name}
                      <input
                        type="hidden"
                        name="collectionId"
                        value={coleccion?.id}
                      ></input>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ROW */}
        <div className="flex gap-4">
          <div className="flex-1 space-y-1">
            <Label className="ml text-base font-semibold">Color</Label>
            <Select className="w-full">
              <SelectTrigger>
                <SelectValue placeholder="Color" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {colors?.map((color) => (
                    <SelectItem key={color?.id} value={color?.name}>
                      {color?.name}
                      <input
                        type="hidden"
                        name="colorId"
                        value={color?.id}
                      ></input>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 space-y-1">
            <Label className="text-base font-semibold">Es configurable</Label>
            <Select className="w-full">
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={"Si"}>
                    Si
                    <input
                      type="hidden"
                      name="isConfigurable"
                      value={true}
                    ></input>
                  </SelectItem>
                  <SelectItem value={"No"}>
                    No
                    <input
                      type="hidden"
                      name="isConfigurable"
                      value={false}
                    ></input>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ROW */}

        <div className="">
          <Label className="text-base font-semibold ">Dispositivos</Label>
          <div className="flex gap-5 flex-wrap flex-1 mt-1">
            {compatibleProducts?.map(({ id, name }) => (
              <Label
                size="sm"
                htmlFor={name}
                key={id}
                value={name}
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

        {/* ROW */}
        <div className=" gap-5 ">
          <Label className="text-base font-semibold">Subir imagenes</Label>
          <div className=" flex-1 mt-1">
            <Input
              type="file"
              onChange={(e) =>
                setFiles([...files, ...Array.from(e.target.files)])
              }
            ></Input>
            <div className="border  rounded-xl border-primary border-xl p-5 min-h-[150px] flex gap-2 ">
              {files.length > 0 &&
                files?.map((file, index) => {
                  const fileUrl = URL.createObjectURL(file);
                  return (
                    <div
                      key={index}
                      className="relative w-[150px] h-[150px] border border-primary rounded-sm"
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

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <span>Creando producto</span>
          ) : (
            <span>Crear producto</span>
          )}{" "}
        </Button>
      </form>
    </div>
  );
};

export default NewProductPage;
