"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SaveButton } from "./SaveButton";
import FontColorPicker from "./FontColorPicker";
import { useMediaQuery } from "react-responsive";
import TextCustomConfigurator from "./TextCustomConfigurator";
import TextOrientationConfiguration from "./TextOrientationConfiguration";
import FontsConfigurator from "./FontsConfigurator";
import StickersPicker from "./StickersPicker";
import { Label } from "@/components/ui/label";
import UploadImagesPicker from "./UploadImagesPicker";
import { useDesign } from "../hooks/useDesign-context";

const ImagesTabs = () => {
  return (
    <Tabs defaultValue="photo">
      <div className="flex justify-end ">
        <TabsList className="rounded-2xl ">
          <TabsTrigger
            className="rounded-2xl w-[80px] text-xs data-[state=active]:bg-white  tracking-wider"
            value="photo"
          >
            Photo
          </TabsTrigger>
          <TabsTrigger
            className="rounded-2xl w-[80px] text-xs data-[state=active]:bg-white  tracking-wider"
            value="stickers"
          >
            Stickers
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent className=" h-[100px]" value="photo">
        <div className="w-full  overflow-x-hidden ">
          <UploadImagesPicker />
        </div>
      </TabsContent>
      <TabsContent className=" h-[100px]" value="photo">
        <div className="w-full  overflow-x-hidden ">
          <UploadImagesPicker />
        </div>
      </TabsContent>
      <TabsContent className=" h-[100px]" value="stickers">
        <div className="w-full  overflow-x-hidden ">
          <StickersPicker />
        </div>
      </TabsContent>
    </Tabs>
  );
};

const ConfigurationPanelMobile = () => {
  return (
    <div className="fixed overflow-x-scroll bottom-0 left-0 right-0 pb-1 px-1 z-50 bg-gray-200/80">
      <Tabs className="" defaultValue="text">
        <div className="px-2 pb-1  border-t border-gray-300 pt-0 overflow-x-scroll">
          <TabsContent className=" h-[100px]" value="text">
            <div className="h-full">
              <div className="flex gap-1 w-full">
                <TextCustomConfigurator />
                <TextOrientationConfiguration />
                <FontsConfigurator />
              </div>
              <FontColorPicker />
            </div>{" "}
          </TabsContent>

          <TabsContent className="h-[100px] overflow-hidden" value="images">
            <ImagesTabs />
          </TabsContent>
        </div>
        <TabsList className="flex w-full rounded-2xl">
          <TabsTrigger
            className="flex-grow rounded-2xl data-[state=active]:bg-accent  tracking-wider"
            value="text"
          >
            Texto
          </TabsTrigger>
          <TabsTrigger
            className="flex-grow rounded-2xl data-[state=active]:bg-accent  tracking-wider"
            value="images"
          >
            Imagenes
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export const ConfigurationPanel = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });

  if (isMobile) {
    return <ConfigurationPanelMobile />;
  }

  return (
    <div className="w-[350px] space-y-3 shadow-gray-300 shadow-[0_0_15px_5px_rgba(0,0,0,0.3)] px-2 pt-4 pb-2 rounded-2xl">
      <Tabs
        className="max-h-[550px] min-h-[400px]  overflow-y-scroll"
        defaultValue="text"
      >
        <TabsList className="flex w-full rounded-2xl">
          <TabsTrigger
            className="flex-grow rounded-2xl data-[state=active]:bg-accent  tracking-wider"
            value="text"
          >
            Texto
          </TabsTrigger>
          <TabsTrigger
            className="flex-grow rounded-2xl data-[state=active]:bg-accent  tracking-wider"
            value="images"
          >
            Imagenes
          </TabsTrigger>
        </TabsList>

        <div className="px-2">
          <TabsContent value="text">
            <div className="space-y-5  overflow-hidden">
              <TextCustomConfigurator />

              <TextOrientationConfiguration />

              <div>
                <Label className="font-semibold text-base">
                  Color del Texto
                </Label>
                <FontColorPicker />
              </div>

              <FontsConfigurator />
            </div>{" "}
          </TabsContent>

          <TabsContent value="images">
            <div className="py-2 space-y-3">
              <div className="">
                <Label className="text-base font-semibold">Imagenes</Label>
                <UploadImagesPicker />
                <p className="text-center text-xs font-medium mt-1.5">
                  Tus imagenes se mostraran aqui!.
                </p>
              </div>
              <StickersPicker />
            </div>
          </TabsContent>
        </div>
      </Tabs>

      <SaveButton />
    </div>
  );
};
