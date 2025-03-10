"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SaveButton } from "./SaveButton";
import FontColorPicker from "./FontColorPicker";
import { useMediaQuery } from "react-responsive";
import TextCustomConfigurator from "./TextCustomConfigurator";
import TextOrientationConfiguration from "./TextOrientationConfiguration";
import StickersPicker from "./StickersPicker";
import { Label } from "@/components/ui/label";
import UploadImagesPicker from "./UploadImagesPicker";
import FontTypePicker from "./FontTypePicker";
import { Images, LetterText, Signature, Type } from "lucide-react";

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
    <div className="w-full overflow-x-scroll  pb-1 px-1 z-50 bg-gray-200/80">
      <Tabs className="h-[150px]" defaultValue="text">
        <div className="px-2 pb-1  border-t border-gray-300 pt-0 overflow-x-scroll">
          <TabsContent className=" h-[100px]" value="text">
            <div className="h-full">
              <div className="flex gap-1 w-full">
                <TextCustomConfigurator />
                <TextOrientationConfiguration />
                <FontTypePicker />
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
    <div
      className=" w-[350px] 
                   max-h-[80dvh]
                   h-full
    space-y-3 grid grid-rows-[1fr_auto] shadow-gray-300 shadow-[0_0_15px_5px_rgba(0,0,0,0.3)] px-3 pt-4 pb-2 rounded-2xl overflow-hidden"
    >
      <Tabs className=" min-h-[400px]  overflow-y-scroll" defaultValue="text">
        <TabsList className="flex w-full h-fit py-0 px-0 rounded-2xl">
          <TabsTrigger
            className="flex-grow py-2 flex items-center gap-1 rounded-2xl data-[state=active]:bg-accent  tracking-wider"
            value="text"
          >
            <LetterText size={15} className="text-gray-700" />
            <p>Texto</p>
          </TabsTrigger>
          <TabsTrigger
            className="flex-grow flex py-2 items-center gap-1 rounded-2xl data-[state=active]:bg-accent  tracking-wider"
            value="images"
          >
            <Images size={15}className="text-gray-700" />
            <p>Imagenes</p>
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

              <FontTypePicker />
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
