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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCollections,
  getPrintPatterns,
  getColors,
  getMaterials,
  getCompatibleProducts,
  getProductById,
} from "../../../../lib/data/products";
import { useEffect, useState } from "react";
import Image from "next/image";
import { deleteImage, updateProduct } from "./action";
import { Checkbox } from "../../../../components/ui/checkbox";
import { cn } from "../../../../lib/utils/utils";
import { Toast } from "../../../../components/ui/toast";
import { useToast } from "../../../../components/ui/use-toast";
import Link from "next/link";
import { RiErrorWarningFill } from "react-icons/ri";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

const EditProductPage = ({ searchParams }) => {
  const [files, setFiles] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [errors, setErrors] = useState(null);
  const { toast } = useToast();
  const queryClient = useQueryClient()
  const router =useRouter()
  const { data: collectionsData } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
  });
  const { data: printPatternData } = useQuery({
    queryKey: ["printpatterns"],
    queryFn: getPrintPatterns,
  });
  const { data: colorsData } = useQuery({
    queryKey: ["colors"],
    queryFn: getColors,
  });
  const { data: materialsData } = useQuery({
    queryKey: ["materials"],
    queryFn: getMaterials,
  });
  const { data: compatibleProducts } = useQuery({
    queryKey: ["compatibleproducts"],
    queryFn: getCompatibleProducts,
  });

  const { data: product } = useQuery({
    queryKey: ["productById", searchParams?.id],
    queryFn: getProductById(searchParams?.id),
  });

  const {
    id,
    name,
    price,
    stock,
    isConfigurable,
    printPattern,
    devices,
    productImages,
    collection,
    material,
    color,
    images,
    productDevices,
  } = product || {};


  useEffect(() => {
    if (!productDevices) return;
    const selectedProductsId = productDevices?.map((device) => device.deviceId);
    setSelectedProducts(selectedProductsId);
  }, [product, productDevices]);

  const { mutate: updateProductAction, isPending } = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: updateProduct,
    onSuccess: (data) => {
      if (data?._error) {
        //  setErrors(data._error)
        setErrors(Object.values(data._error).flat());
        console.log("dataErr", data._error, data);
        return;
      }
      router.push('/dashboard/products')
      setFiles([])
      queryClient.invalidateQueries({ queryKey: ['productById'] })
    },
    onError: (err) => {
      console.log("error", err);
      toast({
        title: "Nuevo producto",
        description: "Error al actualizar el producto",
        variant: "destructive",
      });
    },
  });

  const { mutate: deleteImageAction, isPending:isPendingDeleteImage } = useMutation({
    mutationKey: ["deleteImage"],
    mutationFn: deleteImage,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['productById'] })
      router.refresh()
      toast({
        title: "Imagen",
        description: "Imagen eliminada con exito",
        variant: "default",
      });
    },
    onError: (err) => {
      toast({
        title: "Imagen",
        description: "Error al eliminar imagen",
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
    // const newSelectedProducts = 
    //verificar que los id, que ya vienen da product, hacer un filter para mandar al action los ids, que no existan.
    updateProductAction({ productData, imagesData, selectedProducts });
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

  console.log('images',images)

  return (
    <div className="px-10 pt-10">
      <header className="flex justify-between items-start">
      <h2 className="text-3xl font-semibold">Actualizar producto</h2>
      <Button asChild>
        <Link href='/dashboard/products'>Regresar</Link>
      </Button>
      </header>
      <div className="mt-5 space-y-0.5">
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
      <form onSubmit={handleSubmit} className="mt-10  px-10  space-y-4">
        {/* ROW */}
        <div className="flex gap-5">
          <div className="flex-1 space-y-1">
            <Label className="text-base font-semibold ">Nombre</Label>
            <Input
              placeholder="Nombre del producto"
              name="name"
              defaultValue={name}
            ></Input>
          </div>

          <div className="space-y-1">
            <Label className="text-base font-semibold">Precio</Label>
            <Input
              placeholder="Precio"
              type="number"
              name="price"
              defaultValue={price}
            ></Input>
          </div>

          <div className="space-y-1">
            <Label className="text-base font-semibold">En almacen</Label>
            <Input
              type="number"
              placeholder="Cantidad"
              defaultValue={stock}
              name="stock"
            ></Input>
          </div>
        </div>

        {/* ROW */}
        <div className="flex gap-5 ">
          <div className="flex-1 space-y-1">
            <Label className=" text-base font-semibold">Patron</Label>
            <Select className="w-full" defaultValue={printPattern?.name}>
              <SelectTrigger>
                <SelectValue placeholder="Patron" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {printPatternData?.map((printPattern) => (
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
            <Select className="w-full" defaultValue={material?.name}>
              <SelectTrigger>
                <SelectValue placeholder="Material" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {materialsData?.map((material) => (
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
            <Select className="w-full" defaultValue={collection?.name || ""}>
              <SelectTrigger>
                <SelectValue placeholder="Colección" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {collectionsData?.map((coleccion) => (
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
            <Select className="w-full" defaultValue={color?.name || ""}>
              <SelectTrigger>
                <SelectValue placeholder="Color" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {colorsData?.map((color) => (
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
            <Select
              className="w-full"
              defaultValue={isConfigurable ? "Si" : "No"}
            >
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
          <Label className="text-base font-semibold">Imagenes actuales</Label>
          <div className=" flex-1 mt-1">
            <div className="border  rounded-xl border-primary border-xl p-1 min-h-[100px] flex gap-2 ">
              {images.length > 0 &&
                images?.map(({id,image}) => {
                  return (
                    <div
                      key={id}
                      className="relative w-[100px] h-[100px] border border-primary rounded-sm"
                    >
                      <Image
                        key={id}
                        fill
                        src={image}
                        alt="image_preview"
                        className="object-cover"
                        sizes="(max-width: 200px)"
                      ></Image>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="rounded-full absolute right-0 top-0"
                        onClick={()=>deleteImageAction(id)}
                      >
                        X
                      </Button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

       

        {/* ROW */}
        <div className=" gap-5 ">
          <input type="hidden" name="productId" value={id}></input>
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
            <span>Actualizar producto</span>
          )}{" "}
        </Button>
      </form>
    </div>
  );
};

export default EditProductPage;
