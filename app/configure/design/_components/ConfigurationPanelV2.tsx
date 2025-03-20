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
import {
  ALargeSmall,
  Bot,
  GalleryHorizontalEnd,
  Icon,
  Images,
  LetterText,
} from "lucide-react";
import FontStylePicker from "./FontStylePicker";

const TABS_LIST = [
  {
    value: "text",
    label: "Texto",
    Icon: ALargeSmall,
  },
  {
    value: "images",
    label: "Imagenes",
    Icon: Images,
  },
  {
    value: "textures",
    label: "Texturas",
    Icon: GalleryHorizontalEnd,
  },
  {
    value: "Ia",
    label: "IA",
    Icon: Bot,
  },
];

const ImagesTabs = () => (
  <Tabs defaultValue="photo">
    <div className="flex justify-end">
      <TabsList className="rounded-3xl text-xs p-0 h-[30px]">
        {["photo", "stickers"].map((tab) => (
          <TabsTrigger
            key={tab}
            className="rounded-3xl w-[80px] text-xs data-[state=active]:bg-white tracking-wider"
            value={tab}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
    <TabsContent className="h-[100px]" value="photo">
      <UploadImagesPicker />
    </TabsContent>
    <TabsContent className="h-[100px]" value="stickers">
      <StickersPicker />
    </TabsContent>
  </Tabs>
);

const ConfigurationPanelMobile = () => (
  <div className="w-full  px-1 z-50 ">
    <Tabs className="h-full grid grid-rows-[1fr_auto]" defaultValue="images">
      <div className="px-2  border-t border-gray-300 pt-0 ">
        <TabsContent className="space-y-2" value="text">
          <div className="h-full flex gap-1">
            <TextCustomConfigurator />
            <TextOrientationConfiguration />
            <FontTypePicker />
          </div>
          <FontColorPicker />
        </TabsContent>
        <TabsContent className="max-h-[90px] overflow-hidden" value="images">
          <ImagesTabs />
        </TabsContent>
        <TabsContent className="max-h-[90px] overflow-hidden" value="textures">
          <div className="min-h-[80px] grid place-content-center">
            <p className="font-semibold">Comming soon!!!</p>
          </div>
        </TabsContent>
        <TabsContent className="max-h-[90px] overflow-hidden" value="Ia">
          <div className="min-h-[80px] grid place-content-center">
            <p className="font-semibold">Comming soon!!!</p>
          </div>
        </TabsContent>
      </div>
      <TabsList className="flex w-full py-0 overflow-x-scroll bg-transparent border border-t-gray-400 rounded-none">
        {TABS_LIST.map(({ value, label, Icon }) => (
          <TabsTrigger
            key={value}
            className="flex-grow space-x-1  data-[state=active]:bg-accent tracking-wider"
            value={value}
          >
            <Icon size={15} />
            <span className="text-xs font-semibold"> {label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  </div>
);

export const ConfigurationPanelV2 = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });

  if (isMobile) return <ConfigurationPanelMobile />;

  return (
    <div className="h-svh  grid grid-rows-[1fr_auto] pb-5 overflow-hidden pl-2 border-l border-gray-300">
      <Tabs
        className="grid grid-cols-[1fr_auto] min-h-[400px]"
        defaultValue="images"
      >
        <div className="px-2 p-3  overflow-y-scroll">
          <TabsContent value="text">
            <div className="space-y-5 overflow-hidden">
              <TextCustomConfigurator />
              <TextOrientationConfiguration />
              <Label className="font-semibold text-base">Color del Texto</Label>
              <FontColorPicker />
              <FontTypePicker />
            </div>
          </TabsContent>
          <TabsContent value="images">
            <div className="py-2 space-y-3">
              <div>
                <Label className="text-base font-semibold">Imagenes</Label>
                <p className="text-sm font-light text-center">
                  Personaliza tu imagen: anímala, elimina el fondo o súbela tal
                  cual.
                </p>
              </div>
              <UploadImagesPicker />
            
              <StickersPicker />
            </div>
          </TabsContent>
          <TabsContent value="textures">
            <div className="py-2 space-y-3 min-h-[80svh] grid place-content-center">
              <p className="font-semibold">Comming soon!!!</p>
            </div>
          </TabsContent>
          <TabsContent value="Ia">
            <div className="py-2 space-y-3 min-h-[80svh] grid place-content-center">
              <p className="font-semibold">Comming soon!!!</p>
            </div>
          </TabsContent>
        </div>
        <TabsList className="grid grid-rows-[repeat(auto-fit,minmax(0,1fr))] border-l border-gray-300 bg-transparent px-0 py-0 rounded-none w-full h-full">
          {TABS_LIST.map(({ value, label, Icon }) => (
            <TabsTrigger
              key={value}
              className="w-full h-full flex flex-col justify-center items-center gap-1 rounded-none data-[state=active]:bg-accent data-[state=active]:text-white"
              value={value}
            >
              <Icon size={20} />
              <p className="text-xs font-medium">{label}</p>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="w-[92%] m-auto">
        <SaveButton />
      </div>
    </div>
  );
};
