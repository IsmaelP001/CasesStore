import React from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Textarea } from "../../../components/ui/textarea";

const page = () => {
  return (
    <div className="px-5 pt-10">
      <h2 className="text-3xl font-semibold">Nuevo producto</h2>
      <form className="mt-10">
        {/* CATEGORIES */}

        {/* ROW */}
        <div className="flex gap-5">
          <div>
            <Label>Nombre</Label>
            <Input placeholder="Nombre del producto" name="name"></Input>
          </div>

          <div>
            <Label className="ml mb-2 text-base font-semibold">Categoria</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categorias</SelectLabel>

                  <SelectItem value="Iphone">Iphone</SelectItem>
                  <SelectItem value="Ipad">Ipad</SelectItem>
                  <SelectItem value="Mac">Mac</SelectItem>
                  <SelectItem value="Airpods">Airpods</SelectItem>
                  <SelectItem value="AppleTv">AppleTv</SelectItem>
                  <SelectItem value="Watch">Watch</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* ROW */}
          <div>
            <Label>Version</Label>
            <Input placeholder="Vercion del producto" name="version"></Input>
          </div>

          <div>
            <Label>Version</Label>
            <Input placeholder="Vercion del producto" name="version"></Input>
          </div>

          <div>
            <Label>Precio</Label>
            <Input placeholder="ej. 15,000" name="price"></Input>
          </div>
        </div>

        {/* ROW */}
        <div>
          <div>
            <Label>Descripcion</Label>
            <Textarea placeholder="Descripcion del producto" />
          </div>
        </div>
        
        {/* ESPECIFICATION SECTION */}
        <div className="space-y-5">
        <h2 className="text-xl font-semibold py-10">
          Especifaciones del producto
        </h2>

        {/*  ROW */}
        <div className="flex gap-5">
          <div>
            <Label className="ml  font-semibold">Almacenamiento</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ram" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="32">32</SelectItem>
                  <SelectItem value="64">64</SelectItem>
                  <SelectItem value="128">128</SelectItem>
                  <SelectItem value="258">258</SelectItem>
                  <SelectItem value="512">512</SelectItem>
                  <SelectItem value="1000">1T</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="ml  font-semibold">Ram</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ram" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="512">512mb</SelectItem>
                  <SelectItem value="1000">1gb</SelectItem>
                  <SelectItem value="2000">2bg</SelectItem>
                  <SelectItem value="3000">3gb</SelectItem>
                  <SelectItem value="4000">4gb</SelectItem>
                  <SelectItem value="5000">5gb</SelectItem>
                  <SelectItem value="6000">6gb</SelectItem>
                  <SelectItem value="7000">7gb</SelectItem>
                  <SelectItem value="8000">8gb</SelectItem>
                  <SelectItem value="9000">9gb</SelectItem>
                  <SelectItem value="10000">10gb</SelectItem>
                  <SelectItem value="11000">11gb</SelectItem>
                  <SelectItem value="12000">12gb</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          

          
          <div>
            <Label>Tamaño de Pantalla</Label>
            <Input placeholder="ej. 250x x 550" name="screenSize"></Input>
          </div>

          <div>
            <Label>Resolucion de pantalla</Label>
            <Input placeholder="ej. 2250p x 4220p" name="screenResolution"></Input>
          </div>

          <div>
            <Label>Resolucion de pantalla</Label>
            <Input placeholder="ej.2250p x 4220p" name="screenResolution"></Input>
          </div>

          <div>
            <Label>Camara trasera</Label>
            <Input placeholder="ej.50px" name="rearCamera"></Input>
          </div>

         


          
        </div>

        {/* ROW */}
        <div className="flex gap-5">

        <div>
            <Label>Camara frontal</Label>
            <Input placeholder="ej.40px" name="frontCamera"></Input>
          </div>

        <div>
            <Label>Capacidad de bateria</Label>
            <Input placeholder="ej.3005mp" name="frontCamera"></Input>
          </div>

          <div>
            <Label>Capacidad de bateria</Label>
            <Input placeholder="ej.3005mp" name="batteryCapacity"></Input>
          </div>
          

          <div>
            <Label>Sistema operativo</Label>
            <Input placeholder="ej.3005mp" name="operatingSystem"></Input>
          </div>

          <div>
            <Label>Color</Label>
            <Input placeholder="ej.Negro" name="colorNave"></Input>
          </div>

          <div>
            <Label>Color en RGB</Label>
            <Input placeholder="ej.#hh55f" name="colorValue"></Input>
          </div>
        </div>
        </div>
      </form>
    </div>
  );
};

export default page;
