'use client'
import { Gift } from "@/server/user/domain/gift.model";
import React, { createContext, useState, useContext } from "react";

type RenderState = "list" | "create" | "update";

interface GlobalState {
  open: boolean;
  setOpen:React.Dispatch<React.SetStateAction<boolean>>
  editGiftData: Gift | null;
  currentGiftId: string | null;
  renderState:RenderState
  handleSetEditGift: (giftData: Gift | null) => void;
  handleOpenCloseModal: () => void;
  handleRenderState: (state: RenderState) => void;
  handleSetCurrentGiftId: (giftId: string | null) => void;

  handleReset: () => void;
}

export const GiftContext = createContext<GlobalState | undefined>(undefined);

export const useGiftContext = () => {
  const context = useContext(GiftContext);
  return context;
};

export const GiftProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [renderState, setRenderState] = useState<RenderState>("list");
  const [editGiftData, setEditGiftData] = useState<Gift | null>(null);
  const [currentGiftId,setCurrentGiftId]=useState<string | null>(null)
  const handleOpenCloseModal = () => setOpen(!open);
  const handleRenderState = (state: RenderState) => setRenderState(state);
  const handleSetEditGift = (giftData: Gift | null) => setEditGiftData(giftData);
  const handleReset = () => {
    setEditGiftData(null);
    setRenderState("list");
  };
  const handleSetCurrentGiftId=(giftId:string | null)=>{
    setCurrentGiftId(giftId)
  }

  return (
    <GiftContext.Provider
      value={{
        open,
        setOpen,
        currentGiftId,
        handleSetCurrentGiftId,
        renderState,
        editGiftData,
        handleSetEditGift,
        handleOpenCloseModal,
        handleRenderState,
        handleReset,
      }}
    >
      {children}
    </GiftContext.Provider>
  )
}
