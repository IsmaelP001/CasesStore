"use client";

import { createCoupon } from "../actions";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import SelectProductsCoupon from "../components/SelectProductsCoupon";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../../../components/ui/radio-group";
import moment from "moment";
import "moment/locale/es";
import { useToast } from "../../../../components/ui/use-toast";
import { RiErrorWarningFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

const CreateCouponPage = () => {
  const [allProducts, setAllProducts] = useState(true);
  const [allProductIds, setAllProductIds] = useState([]);
 const [errors,setErrors]=useState(null)
 const router = useRouter()
  moment.locale("es");
  const {toast}=useToast()

  const createCouponWithProductIds = createCoupon.bind(null, allProductIds);

  const handleSetAllProducts = (state) => {
    setAllProductIds(state);
  };

  //              min={today.toJSON().split(":").slice(0, -1).join(":")}

  const { mutate } = useMutation({
    mutationKey: ["createCoupon"],
    mutationFn: createCouponWithProductIds,
    onSuccess: (data) => {
        if (data?._error) {
            //  setErrors(data._error)
            setErrors(Object.values(data._error).flat());
            console.log('dataErr',data._error,data)
            return;
        }
        if(errors !== null) setErrors(null)
          router.push('/dashboard/coupons')
    },
    onError: (err) => {
        toast({
            title: "Nuevo producto",
            description: "Error al crear el producto",
            variant: "destructive",
          });
        }, 
  });


  return (
    <div className="py-10 px-10">
      <h2 className="text-3xl font-bold">Crear coupon</h2>
      <div className=' mt-5 mb-5 space-y-0.5' >
        {errors &&
          errors?.map((error, index) => (
            <p key={index} className="text-sm font-normal text-red-600 flex gap-1">
              <RiErrorWarningFill className="text-xl text-red-400"/> <span>{error}</span>
            </p>
          ))}
      </div>
      <form action={mutate} className="space-y-10">
        <div className="flex gap-8">
          <div className="flex-1">
            <Label htmlFor="code" className="label font-semibold">
              Code
            </Label>
            <Input type="text" name="code" className="w-full"></Input>
          </div>

          {/* EXPIRES AT */}
          <div className="flex-1">
            <Label htmlFor="code" className="label font-semibold">
              Fecha de expiracion
            </Label>
            <Input
              type="datetime-local"
              className="input"
              name="expiresAt"
              min={moment().format('YYYY-MM-DDTHH:mm')}
            ></Input>
          </div>
        </div>

        {/* ROW */}
        <div className="flex gap-8">
          <div className="">
            <p className="font-semibold mb-2">Tipo de descuento</p>
            <RadioGroup
              defaultValue="FIXED"
              name="discountType"
              className="w-full"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="FIXED" id="FIXED" />
                <Label htmlFor="FIXED">Fijo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="PORCENTAGE" id="PORCENTAGE" />
                <Label htmlFor="PORCENTAGE">Porcentaje</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex-1">
            <Label
              htmlFor="discountAmount"
              className="label mt-0 font-semibold"
            >
              Cantidad de descuento
            </Label>
            <Input
              type="number"
              name="discountAmount"
              className="input w-full"
            ></Input>
          </div>
        </div>
      
    
        {/* ROW */}
        <div className='flex gap-10 items-start'>
          <div className=''>
            <Label htmlFor="code" className="label font-semibold">
              Productos permitidos
            </Label>
            <RadioGroup
              defaultValue={true}
              name="allProducts"
              className="w-full mt-1"
              onValueChange={(value) =>{
                setAllProducts(value)
                setAllProductIds([])
              }}
            >
              <div className="flex items-center gap-2 ">
                <RadioGroupItem value={true} id="allProducts" />
                <Label htmlFor="allProducts">Todos los productos</Label>
              </div>
              <div className="flex items-center gap-2 ">
                <RadioGroupItem value={false} id="porcentaje" />
                <Label htmlFor="porcentaje">Seleccionar productos</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex-1">
            <Label htmlFor="limit" className=" font-semibold">
              Limit
            </Label>
            <Input type="number" className="w-full" name="limit"></Input>
            <p className="text-xs mt-2 font-semibold">
              Dejar vacio para usos infinitos
            </p>
          </div>
        </div>
        {allProducts !== true && (
          <SelectProductsCoupon
            allProductIds={allProductIds}
            handleSetAllProducts={handleSetAllProducts}
          />
        )}

        <Button type="submit" className="btn btn-primary">
          Crear cupon
        </Button>
      </form>
    </div>
  );
};

export default CreateCouponPage;
