"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SaveButton } from "./SaveButton";
import FontColorPicker from "./FontColorPicker";
import { useMediaQuery } from "react-responsive";
import TextCustomConfigurator from "./TextCustomConfigurator";
import {TextEditContainer, TextOrientationMobileConfiguration} from './TextEditContainer';
import StickersPicker from "./StickersPicker";
import { Label } from "@/components/ui/label";
import UploadImagesPicker from "./UploadImagesPicker";
import FontTypePicker from "./FontTypePicker";
import {
  ALargeSmall,
  Bot,
  GalleryHorizontalEnd,
  Images,
} from "lucide-react";
import { TexturesPicker } from "./TexturesPicker";
import { useDesignV2 } from "../hooks/useDesign-contextV2";
import { motion, AnimatePresence } from "framer-motion";
import ImageEditContainer from "./ImageEditContainert";

const tabContentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } }
};

const editorVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.4, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    transition: { 
      duration: 0.25, 
      ease: "easeIn" 
    } 
  }
};

const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.1,
      when: "beforeChildren" 
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.1,
      when: "afterChildren" 
    }
  }
};

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
    <AnimatePresence mode="wait">
      <TabsContent className="h-[100px]" value="photo">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={tabContentVariants}
        >
          <UploadImagesPicker />
        </motion.div>
      </TabsContent>
      <TabsContent className="h-[100px]" value="stickers">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={tabContentVariants}
        >
          <StickersPicker />
        </motion.div>
      </TabsContent>
    </AnimatePresence>
  </Tabs>
);

const ConfigurationPanelMobile = () => {
  // Panel móvil siempre muestra las pestañas normales,
  // independientemente de si hay un elemento seleccionado
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-[100svw] h-[150px] px-1 z-50"
    >
      <Tabs className="h-full grid grid-rows-[1fr_auto]" defaultValue="images">
        <div className="px-2 border-t border-gray-300 pt-0">
          <AnimatePresence mode="wait">
            <TabsContent className="space-y-2" value="text">
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={tabContentVariants}
              >
                <div className="h-full flex gap-1">
                  <TextCustomConfigurator />
                  <TextOrientationMobileConfiguration />
                  <FontTypePicker />
                </div>
                <FontColorPicker />
              </motion.div>
            </TabsContent>
            <TabsContent className="max-h-[90px] overflow-hidden" value="images">
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={tabContentVariants}
              >
                <ImagesTabs />
              </motion.div>
            </TabsContent>
            <TabsContent className="max-h-[90px] overflow-hidden" value="textures">
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={tabContentVariants}
              >
                <TexturesPicker />
              </motion.div>
            </TabsContent>
            <TabsContent className="max-h-[90px] overflow-hidden" value="Ia">
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={tabContentVariants}
              >
                <div className="min-h-[80px] grid place-content-center">
                  <p className="font-semibold">Comming soon!!!</p>
                </div>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </div>
        <TabsList className="flex w-full py-0 overflow-x-scroll bg-transparent border border-t-gray-400 rounded-none">
          {TABS_LIST.map(({ value, label, Icon }) => (
            <TabsTrigger
              key={value}
              className="flex-grow space-x-1 data-[state=active]:bg-accent tracking-wider"
              value={value}
            >
              <Icon size={15} />
              <span className="text-xs font-semibold"> {label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </motion.div>
  );
};

export const ConfigurationPanelV2 = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const { selectedElement } = useDesignV2();

  const selectedElementContent = (
    <div className="h-svh grid grid-rows-[1fr_auto] pb-5 overflow-hidden pl-2 border-l border-gray-300">
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedElement?.type || "none"}
            className="h-full overflow-y-auto px-2 py-3"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={editorVariants}
            layoutId={`editor-${selectedElement?.type}`}
          >
            {selectedElement?.type === 'image' || selectedElement?.type === 'texture' ? (
              <ImageEditContainer />
            ) : (
              <TextEditContainer />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="w-[92%] m-auto">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <SaveButton />
        </motion.div>
      </div>
    </div>
  );

  const normalDesktopContent = (
    <motion.div 
      initial="initial"
      animate="animate"
      exit="exit"
      variants={containerVariants}
      className="h-svh grid grid-rows-[1fr_auto] pb-5 overflow-hidden pl-2 border-l border-gray-300"
    >
      <Tabs
        className="grid grid-cols-[1fr_auto] min-h-[400px]"
        defaultValue="images"
      >
        <div className="relative px-2 p-3 overflow-y-auto">
          <AnimatePresence mode="wait">
            <TabsContent value="text">
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={tabContentVariants}
                className="space-y-5 overflow-hidden"
              >
                <TextCustomConfigurator />
                <Label className="font-semibold text-base">Color del Texto</Label>
                <FontColorPicker />
                <FontTypePicker />
              </motion.div>
            </TabsContent>
            <TabsContent value="images">
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={tabContentVariants}
                className="py-2 space-y-3"
              >
                <div>
                  <Label className="text-base font-semibold">Imágenes</Label>
                  <p className="text-sm font-light text-center">
                    Personaliza tu imagen: anímala, elimina el fondo o súbela tal cual.
                  </p>
                </div>
                <UploadImagesPicker />
                <StickersPicker />
              </motion.div>
            </TabsContent>
            <TabsContent value="textures">
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={tabContentVariants}
              >
                <TexturesPicker />
              </motion.div>
            </TabsContent>
            <TabsContent value="Ia">
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={tabContentVariants}
                className="py-2 space-y-3 min-h-[80svh] grid place-content-center"
              >
                <p className="font-semibold">Coming soon!!!</p>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </div>

        <TabsList className="grid grid-rows-[repeat(auto-fit,minmax(0,1fr))] border-l border-gray-300 bg-transparent px-0 py-0 rounded-none w-full h-full">
          {TABS_LIST.map(({ value, label, Icon }) => (
            <TabsTrigger
              key={value}
              className="w-full h-full flex flex-col justify-center items-center gap-1 rounded-none data-[state=active]:bg-accent data-[state=active]:text-white"
              value={value}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center"
              >
                <Icon size={20} />
                <p className="text-xs font-medium">{label}</p>
              </motion.div>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="w-[92%] m-auto">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <SaveButton />
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      {isMobile ? (
        <ConfigurationPanelMobile key="mobile" />
      ) : selectedElement ? (
        <motion.div
          key="desktop-editor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          {selectedElementContent}
        </motion.div>
      ) : (
        <motion.div
          key="desktop-normal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          {normalDesktopContent}
        </motion.div>
      )}
    </AnimatePresence>
  );
};