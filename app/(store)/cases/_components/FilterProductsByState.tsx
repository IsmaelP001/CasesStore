"use client";
import { QueryClient, useQueries, useQuery } from "@tanstack/react-query";
import { Label } from "../../../../components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../../../components/ui/radio-group";

const FilterProducts = () => {
  return (
    <div className="space-y-5">
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
            <RadioGroupItem value="option-tree" id="option-tree" />
            <Label htmlFor="option-two">Nuevas colecciones</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterProducts;
