"use client";

import NextImage from "next/image";
import { Rnd } from "react-rnd";
import { RadioGroup } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from "../../../../../validators/option-validator";

import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { cn, formatPrice } from "../../../../../lib/utils/utils";
import { ScrollArea } from "../../../../../components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu";
import { useUploadThing } from "../../../../../lib/uploadthings";
import { SaveConfigArgs, saveConfig as _saveConfig } from "./action";
import { Button } from "../../../../../components/ui/button";
import HandleComponent from "../../../_components/HandleComponent";
import { AspectRatio } from "../../../../../components/ui/aspect-ratio";
import { Label } from "../../../../../components/ui/label";
import { Alfa_Slab_One } from "next/font/google";
import { Input } from "../../../../../components/ui/input";
import { fabric } from "fabric";

const AlbaSlabOne = Alfa_Slab_One({
  subsets: ["latin"],
  weight: ["400"],
});

const FONT_POSITIONS = [
  { icon: "inferior", value: "BOTTON", x: 297, y: 400, height: 70, width: 150 },
  { icon: "medio", value: "MIDDLE", x: 297, y: 250, height: 70, width: 150 },
  {
    icon: "vertical",
    value: "VERTICAL",
    x: 340,
    y: 200,
    height: 300,
    width: 153,
  },
];

const calculateFontSize = (height, width, length) => {
  // Calcula el tamaño de la fuente basada en las dimensiones del contenedor
  const newFontSize = Math.round((height + width) / (length + 1));
  return newFontSize; // Ajusta este valor según sea necesario
};

interface DesignConfiguratorProps {
  configId: string;
  imageUrl: string;
  imageDimensions: { width: number; height: number };
}

const DesignConfigurator = ({
  configId,
  imageUrl,
  imageDimensions,
}: DesignConfiguratorProps) => {
  const router = useRouter();
  const canvasRef = useRef();

  const [drawElements, setDreawElements] = useState([
    "https://ethic.es/wp-content/uploads/2023/03/imagen.jpg",
    "https://cc-prod.scene7.com/is/image/CCProdAuthor/FF-SEO-text-to-image-marquee-mobile-2x?$pjpeg$&jpegSize=100&wid=600",
  ]);
  const [drawElements2, setDreawElements2] = useState(["texto prueba"]);
  const [currentFont, setCurrentFont] = useState({
    font: "AlbaSlabOne",
    clases: "tracking-widest",
  });
  const [customText, setCustomText] = useState("");
  const [customTextPosition, setCustomTextPosition] = useState({
    width: 50,
    height: 50,
  });
  const [fontSizeCustom, setFontSize] = useState(50);
  const [fontPosition, setFontPosition] = useState(FONT_POSITIONS[0]);
  const customTextContainerRef = useRef(null);

  const { mutate: saveConfig, isPending } = useMutation({
    mutationKey: ["save-config"],
    mutationFn: async (args: SaveConfigArgs) => {
      await Promise.all([saveConfigurationFabric(), _saveConfig(args)]);
    },
    onError: () => {
      console.log("error", {
        title: "Something went wrong",
        description: "There was an error on our end. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.push(`/case/configure/preview?id=${configId}`);
    },
  });

  //calcultate font size

  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIALS.options)[number];
    finish: (typeof FINISHES.options)[number];
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });

  const [renderedDimension, setRenderedDimension] = useState({
    width: imageDimensions.width / 4,
    height: imageDimensions.height / 4,
  });

  //part of image overlaping with the phone
  const [renderedPosition, setRenderedPosition] = useState({
    x: 150,
    y: 205,
  });

  const phoneCaseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); //gray area container

  const { startUpload } = useUploadThing("imageUploader");

  async function saveConfigurationFabric() {
    const {
        left: caseLeft,
        top: caseTop,
        width,
        height,
    } = phoneCaseRef.current!.getBoundingClientRect();

    const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect();

    const leftOffset = caseLeft - containerLeft;
    const topOffset = caseTop - containerTop;

    const actualX = renderedPosition.x - leftOffset;
    const actualY = renderedPosition.y - topOffset;

    // Crear un canvas de Fabric.js
    const canvas = new fabric.Canvas(null, {
        width: width,
        height: height,
    });

    // Posiciones ajustadas del texto
    const fontX = fontPosition.x - leftOffset;
    const fontY = fontPosition.y - topOffset;

    // Cargar la imagen y añadirla al canvas
    fabric.Image.fromURL(imageUrl, (img) => {
        img.scaleToWidth(width);
        img.scaleToHeight(height);

        // Crear el texto
        var text = new fabric.Text(customText, {
            left: fontX,
            top: fontY,
            fontSize: fontSizeCustom,
            fontFamily: "Arial",
            fill: "red",
        });

        // Crear un grupo con la imagen y el texto
        var group = new fabric.Group([img, text], {
            left: actualX,
            top: actualY,
        });

        // Añadir el grupo al canvas
        canvas.add(group);

      
    });
    
      // Convertir el canvas a base64
      const base64 = canvas.toDataURL();
      const base64Data = base64.split(",")[1];

      // Convertir base64 a Blob
      const blob = base64ToBlob(base64Data, "image/png");
      const file = new File([blob], "filename.png", { type: "image/png" });

      // Subir la imagen al servidor
      startUpload([file], { configId })
          .then(() => {
              console.log("Imagen subida exitosamente");
          })
          .catch((error) => {
              console.error("Error al subir la imagen", error);
          });
}



  async function saveConfiguration() {
    try {
      const {
        left: caseLeft,
        top: caseTop,
        width,
        height,
      } = phoneCaseRef.current!.getBoundingClientRect();

      const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect();

      const leftOffset = caseLeft - containerLeft;
      const topOffset = caseTop - containerTop;

      const actualX = renderedPosition.x - leftOffset;
      const actualY = renderedPosition.y - topOffset;

      //text info
      // const fontPosition = {x:30, y:40}
      // const fontSizeCustom = 20;
      // let customText = "Something to say!"

      //create canvas
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      const userImage = new Image();
      userImage.crossOrigin = "anonymous";
      userImage.src = imageUrl;
      await new Promise((resolve) => (userImage.onload = resolve));

      //add image
      ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        renderedDimension.width,
        renderedDimension.height
      );

      // add text
      ctx.font = `${fontSizeCustom}px Arial`;
      // ctx.textBaseline = "top";
      ctx.fillStyle = "red"; //
      const fontX = fontPosition.x - leftOffset;
      const fontY = fontPosition.y - leftOffset;
      console.log("text position", fontPosition.x, fontPosition.y);
      console.log("container position", containerLeft, containerTop);
      console.log("case position", caseLeft, caseTop);
      console.log("case-container position", actualX, actualX);
      console.log("offset position", leftOffset, topOffset);

      console.log("actual X and Y position", fontX, fontX);

      ctx.fillText(customText, fontX, fontY);

      const base64 = canvas.toDataURL();
      const base64Data = base64.split(",")[1];

      //function convert base64 to blob
      const blob = base64ToBlob(base64Data, "image/png");
      const file = new File([blob], "filename.png", { type: "image/png" });

      //upload image to server UPLOADTHINGS
      await startUpload([file], { configId });
    } catch (err) {
      console.log("error al subir imagen");
    }
  }

  function base64ToBlob(base64: string, mimeType: string) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }

  useEffect(() => {
    if (customText.length <= 2) return; //previene incremento drastico de tamaño de letra cuando es inferior a 2 caracteres
    const newFontSize = calculateFontSize(
      fontPosition.height,
      fontPosition.width,
      customText.length
    );
    setFontSize(newFontSize);
    console.log("font position", fontPosition, fontSizeCustom);
  }, [fontPosition, customText]);

  return (
    <div className="relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20">
      <div
        ref={containerRef}
        className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
          <AspectRatio
            ref={phoneCaseRef}
            ratio={896 / 1831}
            className="pointer-events-none relative z-50 aspect-[896/1831] w-full"
          >
            <NextImage
              fill
              alt="phone image"
              src="/phone-template.png"
              className="pointer-events-none z-50 select-none"
            />
          </AspectRatio>
          <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
          <div
            className={cn(
              "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]",
              `bg-${options.color.tw}`
            )}
          />
        </div>

        {/* height: imageDimensions.height / 4, */}
        <Rnd
          default={{
            x: 125,
            y: 50,
            height: 500,
            width: 500,
          }}
          onResizeStop={(_, __, ref, ___, { x, y }) => {
            setRenderedDimension({
              height: parseInt(ref.style.height.slice(0, -2)),
              width: parseInt(ref.style.width.slice(0, -2)),
            });

            setRenderedPosition({ x, y });
          }}
          onDragStop={(_, data) => {
            const { x, y } = data;
            setRenderedPosition({ x, y });
          }}
          className="absolute z-20 border-[3px] border-primary"
          lockAspectRatio
          resizeHandleComponent={{
            bottomRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            topRight: <HandleComponent />,
            topLeft: <HandleComponent />,
          }}
        >
          <div className="relative w-full h-full">
            <NextImage
              src={imageUrl}
              fill
              alt="your image"
              className="pointer-events-none"
            />
          </div>
        </Rnd>

        {customText.length > 0 &&
          drawElements2?.map((item) => (
            <Rnd
              size={{ width: fontPosition.width, height: fontPosition.height }}
              position={{ x: fontPosition.x, y: fontPosition.y }}
              onResizeStop={(_, __, ref, ___, { x, y }) => {
                setFontPosition((prev) => {
                  return {
                    ...prev,
                    height: parseInt(ref.style.height.slice(0, -2)),
                    width: parseInt(ref.style.width.slice(0, -2)),
                    x,
                    y,
                  };
                });
              }}
              onDragStop={(_, data) => {
                console.log("dragData", data.x, data.y);
                setFontPosition((prev) => {
                  return {
                    ...prev,
                    x: data.x,
                    y: data.y,
                  };
                });
              }}
              className="absolute z-20 border-[1px] rounded-xl border-primary"
              lockAspectRatio
              resizeHandleComponent={{
                bottomRight: <HandleComponent />,
                bottomLeft: <HandleComponent />,
                topRight: <HandleComponent />,
                topLeft: <HandleComponent />,
              }}
            >
              <div
                className={` ${AlbaSlabOne.className} relative m-0 w-full h-full `}
                style={{
                  minWidth: `${fontPosition.width}`,
                  minHeight: `${fontPosition.height}`,
                }}
                ref={customTextContainerRef}
              >
                <h2
                  className="absolute grid place-content-center min-w-full min-h-full m-0  box-border text-nowrap  object-contain overflow-hidden  text-white font-black  tracking-widest"
                  style={{
                    fontSize: `${fontSizeCustom}px`,
                    writingMode: `${
                      fontPosition.value === "VERTICAL"
                        ? "vertical-lr"
                        : "horizontal-tb"
                    }`,
                    textShadow: "6px 6px 2px rgba(2,2,2,2)",
                  }}
                >
                  {customText}
                </h2>
              </div>
            </Rnd>
          ))}
      </div>

      <div className="h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white">
        <ScrollArea className="relative flex-1 overflow-auto">
          <div
            aria-hidden="true"
            className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
          />

          <div className="px-8 pb-12 pt-8">
            <h2 className="tracking-tight font-bold text-3xl">
              Customize your case
            </h2>

            <div className="w-full h-px bg-zinc-200 my-6" />

            <div className="relative mt-4 h-full flex flex-col justify-between">
              <div>
                <Label>Texto personalizado</Label>

                <Input
                  className="border-2 my-2"
                  placeholder="ej: tu texto "
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                ></Input>
              </div>

              <div>
                <Label>Posicion del texto</Label>
                <div className="flex gap-3 my-3">
                  {FONT_POSITIONS.map((position, index) => (
                    <div className="">
                      <input
                        key={index}
                        value={index}
                        type="radio"
                        name="selectColors"
                        onChange={() => {
                          setFontPosition(position);
                          console.log("fontPos", fontPosition);
                        }}
                      ></input>
                      <span>{position.icon}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <RadioGroup
                  value={options.color}
                  onChange={(val) => {
                    setOptions((prev) => ({
                      ...prev,
                      color: val,
                    }));
                  }}
                >
                  <Label>Color: {options.color.label}</Label>
                  <div className="mt-3 flex items-center space-x-3">
                    {COLORS.map((color) => (
                      <RadioGroup.Option
                        key={color.label}
                        value={color}
                        className={({ active, checked }) =>
                          cn(
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent",
                            {
                              [`border-${color.tw}`]: active || checked,
                            }
                          )
                        }
                      >
                        <span
                          className={cn(
                            `bg-${color.tw}`,
                            "h-8 w-8 rounded-full border border-black border-opacity-10"
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>

                <div className="relative flex flex-col gap-3 w-full">
                  <Label>Model</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {options.model.label}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {MODELS.options.map((model) => (
                        <DropdownMenuItem
                          key={model.label}
                          className={cn(
                            "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100",
                            {
                              "bg-zinc-100":
                                model.label === options.model.label,
                            }
                          )}
                          onClick={() => {
                            setOptions((prev) => ({ ...prev, model }));
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              model.label === options.model.label
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {model.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {[MATERIALS, FINISHES].map(
                  ({ name, options: selectableOptions }) => (
                    <RadioGroup
                      key={name}
                      value={options[name]}
                      onChange={(val) => {
                        setOptions((prev) => ({
                          ...prev,
                          [name]: val,
                        }));
                      }}
                    >
                      <Label>
                        {name.slice(0, 1).toUpperCase() + name.slice(1)}
                      </Label>
                      <div className="mt-3 space-y-4">
                        {selectableOptions.map((option) => (
                          <RadioGroup.Option
                            key={option.value}
                            value={option}
                            className={({ active, checked }) =>
                              cn(
                                "relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between",
                                {
                                  "border-primary": active || checked,
                                }
                              )
                            }
                          >
                            <span className="flex items-center">
                              <span className="flex flex-col text-sm">
                                <RadioGroup.Label
                                  className="font-medium text-gray-900"
                                  as="span"
                                >
                                  {option.label}
                                </RadioGroup.Label>

                                {option.description ? (
                                  <RadioGroup.Description
                                    as="span"
                                    className="text-gray-500"
                                  >
                                    <span className="block sm:inline">
                                      {option.description}
                                    </span>
                                  </RadioGroup.Description>
                                ) : null}
                              </span>
                            </span>

                            <RadioGroup.Description
                              as="span"
                              className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                            >
                              <span className="font-medium text-gray-900">
                                {formatPrice(option.price / 100)}
                              </span>
                            </RadioGroup.Description>
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  )
                )}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="w-full px-8 h-16 bg-white">
          <div className="h-px w-full bg-zinc-200" />
          <div className="w-full h-full flex justify-end items-center">
            <div className="w-full flex gap-6 items-center">
              <p className="font-medium whitespace-nowrap">
                {formatPrice(
                  (14.0 + options.finish.price + options.material.price) / 100
                )}
              </p>
              <Button
                isLoading={isPending}
                disabled={isPending}
                loadingText="Saving"
                onClick={() =>
                  saveConfig({
                    configId,
                    color: options.color.value,
                    finish: options.finish.value,
                    material: options.material.value,
                    model: options.model.value,
                  })
                }
                size="sm"
                className="w-full btn btn-primary0"
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-1.5 inline" />
              </Button>
              <Button>Agregar texto</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignConfigurator;
