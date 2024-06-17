"use client";
import { QueryClient, useQueries, useQuery } from "@tanstack/react-query";
import {
  getCollections,
  getColors,
  getPrintPatterns,
  getMaterials,
  getCompatibleProducts,
} from "../../../../lib/data/products";
import { Label } from "../../../../components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../../../components/ui/radio-group";
import { Checkbox } from "../../../../components/ui/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const FilterProducts = () => {
  const router = useRouter();
  const pathname=usePathname()
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());


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

  const handleDeviceParams=(value)=>{
    const params = new URLSearchParams(searchParams.toString());

    if (pathname.split('/')[2] === value.toLowerCase()) {
      router.push('/cases');
      console.log('split',pathname)

    } else {
      router.push('/cases'+"/" + value);
    }

  }


  const handleAddParams3 = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    console.log('values params',params.get(key),value)

    

      if(params.get(key)===value) {
        params.delete(key);
        
      } else {
      params.set(key,value);
    }

    router.push(pathname + "?" + params.toString());
  };

  const handleAddParams2 = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.getAll(key);

    if (currentValues.includes(value)) {
      params.delete(key);
    } else {
      params.append(key, value);
    }

    router.push(pathname + params.toString());
  };


  const handleAddParams = (key, value) => {
    const currentValues = params.get(key)?.split('%') ?? [];


    if (currentValues?.includes(value)) {
      const newParams = currentValues.filter(param=>param !== value).join('%')
      if(newParams === ''){
        params.delete(key)
        console.log('paramss',params)
      }else{
        params.set(key, newParams);
      }
    } else {
      currentValues.push(value)
      const newParams = currentValues.join('%')
      params.set(key, newParams);
    }

    router.push(pathname + '?' + params.toString());
  };



  //pathname.endsWith('cases') && 
  return (
    <div className="space-y-5">
      

      <div>
      <h3 className="font-semibold">Dispositivo</h3>

      <div className="space-y-2 mt-2">
        {compatibleProducts?.map((product) => {
          return (
            <div key={`product-${product.id}`} className="flex items-center gap-1">
              <Checkbox
                id={`product-${product.id}`}
                value={product.name}
                name="product"
                checked={product.name.toLocaleLowerCase() === pathname?.split('/')[2]}
                onCheckedChange={(e) => {
                  handleDeviceParams(product.name);
                }}
              />
              <Label htmlFor={`product-${product.id}`}>
                {product.name}
              </Label>
            </div>
          );
        })}
      </div>
    </div>

      
      <div className="space-y-2">
        <h3 className="font-semibold">Colecciones recientes</h3>
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">Mas populares</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Mas vendidos</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-tree"  id="option-tree" />
            <Label htmlFor="option-two">Nuevas colecciones</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="font-semibold">Colecciones</h3>

        <div className="space-y-2 mt-2">
          {collections?.map((collection) => {
           
            return (
              <div key={collection.id} className="flex items-center gap-1">
                <Checkbox
                  id={`collection-${collection.id}`}
                  value={collection.name}
                  name="collections"
                  checked={params.get('collection')?params.get('collection')?.split('%').includes(collection.name):false}
                  onCheckedChange={(e) => {
                    handleAddParams("collection", collection.name);
                  }}
                />
                <Label htmlFor={`collection-${collection.id}`}>
                  {collection.name}
                </Label>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="font-semibold">Diseño</h3>
        <div className="space-y-2 mt-2">
          {printPattern?.map((pattern) => (
            <div key={pattern.id} className="flex items-center gap-1">
              <Checkbox
                id={pattern.name}
                checked={params.get('pattern')?params.get('pattern')?.split('%').includes(pattern.name):false}
                  onCheckedChange={(e) => {
                    handleAddParams("pattern", pattern.name);
                  }}
              />
              <Label htmlFor={pattern.name}>{pattern.name}</Label>
            </div>
          ))}
        </div>
      </div>


      <div>
        <h3 className="font-semibold">Material</h3>
        <div className="space-y-2 mt-2">
          {materials?.map((material) => (
            <div key={`materia-${material.id}`} className="flex items-center gap-1">
              <Checkbox
                id={material.name}
                checked={params.get('material')?params.get('material')?.split('%').includes(material.name):false}
                onCheckedChange={(e) => {
                  handleAddParams("material", material.name);
                }}
              />
              <Label htmlFor={material.name}>{material.name}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold">Colores</h3>
        <div className="space-y-2 mt-2">
          {colors?.map((color) => (
            <div key={`color-${color.id}`} className="flex items-center gap-1">
              <Checkbox
                id={color.name}
                checked={params.get('color')?params.get('color')?.split('%').includes(color.name):false}
                onCheckedChange={(e) => {
                  handleAddParams("color", color.name);
                }}
              />
              <Label htmlFor={color.name}>{color.name}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;
