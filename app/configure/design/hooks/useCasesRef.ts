"use client";

import { useEffect, useMemo, useRef } from "react";
import { TextState, useDesign } from "./useDesign-context";
interface UseCasesRefProps{
  setTextState: React.Dispatch<React.SetStateAction<TextState>>;
  setSelectedElement: React.Dispatch<React.SetStateAction<string>>;
  
}

export default function useCasesRef(props:UseCasesRefProps) {
  const {setTextState,setSelectedElement}=props || {}
  const phoneCaseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const caseDimensions = useMemo(() => {
    if (!phoneCaseRef.current || !containerRef.current) return;
    const {
      left: caseLeft,
      top: caseTop,
      width,
      height,
    } = phoneCaseRef.current.getBoundingClientRect();

    const { left: containerLeft, top: containerTop } =
      containerRef.current!.getBoundingClientRect();

    const leftOffset = caseLeft - containerLeft;
    const topOffset = caseTop - containerTop;
    return {
      leftOffset,
      topOffset,
      width,
      height,
    };
  }, [phoneCaseRef.current, containerRef.current]);

  useEffect(() => {
    if (caseDimensions) {
      const { width, height, leftOffset, topOffset } =
      caseDimensions;
      //set default text position to center
     if(setTextState){
      setTextState((prev) => ({
        ...prev,
        position: {
          x: leftOffset + (width - prev.size.width) / 2,
          y: topOffset + (height - prev.size.height) / 2,
        },
      }));
     }
    }
  }, [caseDimensions]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        phoneCaseRef.current &&
        !phoneCaseRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".resizable-element") && 
        !(event.target as HTMLElement).closest(".handle-component")
      ) {
        setSelectedElement('');
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return {
    phoneCaseRef,
    containerRef,
    textContainerRef,
    caseDimensions
  }
}
