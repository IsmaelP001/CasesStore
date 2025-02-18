"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { ChangeEvent } from "react";
import { useDesign } from "../hooks/useDesign-context";
import { useMediaQuery } from "react-responsive";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export default function TextCustomConfigurator() {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const { textState, setTextState } = useDesign();

  if (isMobile) {
    return (
      <Drawer  >
        <DrawerTrigger  className="flex-grow">
          <div className="rounded-xl bg-white border-2 border-gray-300 flex-grow h-8 flex items-center px-2 tracking-wider py-5">
            {textState.content}
          </div>
        </DrawerTrigger>
        <DrawerContent  >
          <DrawerHeader>
            <DrawerTitle>Texto Personalizado</DrawerTitle>
          </DrawerHeader>
          <div className="px-2">
            <Input
              type="text"
              className="rounded-xl"
              value={textState.content}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTextState({ ...textState, content: e.target.value })
              }
            />
          </div>
          <DrawerFooter>
            <DrawerClose>
              <Button className="w-full rounded-2xl">Guardar</Button>
            </DrawerClose>{" "}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <div className="space-y-1">
      <Label className="font-semibold text-base">Texto Personalizado</Label>
      <div className="px-2">
        <Input
          type="text"
          className="rounded-xl"
          value={textState.content}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTextState({ ...textState, content: e.target.value })
          }
        />
      </div>
    </div>
  );
}
