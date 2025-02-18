"use client";
import { Label } from "@/components/ui/label";
import React, { ChangeEvent } from "react";
import { useDesign } from "../hooks/useDesign-context";
import { cn } from "@/lib/utils/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";

export default function TextOrientationConfiguration() {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const { textState, setTextState } = useDesign();

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger>
          <div
            className={cn(
              " size-10 grid place-content-center border-2 border-blue-500 rounded-xl",
              textState.direction === "vertical" && "[writing-mode:vertical-lr]"
            )}
          >
            TT
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Orientación</DrawerTitle>
          </DrawerHeader>
          <div className="flex gap-4 mt-1 px-4">
            <button
              className={cn(
                "px-4 py-2 rounded-xl font-semibold border-2 border-gray-300",
                textState.direction === "horizontal" &&
                  "border-blue-500 bg-blue-50"
              )}
              onClick={() =>
                setTextState({
                  ...textState,
                  direction: "horizontal",
                  size: { ...textState.size, width: 200, height: 200 },
                })
              }
            >
              TT
            </button>

            <button
              className={cn(
                "px-3 py-3 rounded-xl font-semibold border-2 border-gray-300 rotate-90",
                textState.direction === "vertical" &&
                  "border-blue-500 bg-blue-50 "
              )}
              onClick={() =>
                setTextState({
                  ...textState,
                  direction: "vertical",
                  size: { ...textState.size, height: textState.size.width },
                })
              }
            >
              TT
            </button>
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
    <div>
      {/* <Label className="font-semibold text-base">Orientación</Label>
      <div className="flex gap-4 mt-1">
        <button
          className={cn(
            "px-4 py-2 rounded-xl font-semibold border-2 border-gray-300",
            textState.direction === "horizontal" && "border-blue-500 bg-blue-50"
          )}
          onClick={() =>
            setTextState({
              ...textState,
              direction: "horizontal",
              size: { ...textState.size, width: 200, height: 200 },
            })
          }
        >
          TT
        </button>

        <button
          className={cn(
            "px-3 py-3 rounded-xl font-semibold border-2 border-gray-300 rotate-90",
            textState.direction === "vertical" && "border-blue-500 bg-blue-50 "
          )}
          onClick={() =>
            setTextState({
              ...textState,
              direction: "vertical",
              size: { ...textState.size, height: textState.size.width },
            })
          }
        >
          TT
        </button>
      </div> */}
    </div>
  );
}
