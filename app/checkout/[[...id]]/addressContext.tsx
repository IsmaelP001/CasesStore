'use client';

import { SelectAddress } from '@/config/database/schemes';
import { trpc } from '@/lib/trpc/client';
import React, { createContext, useContext, useState } from 'react';

type RenderState = 'list' | 'create' | 'update';

interface AddressContextType {
  currentAddressId: string | null;
  editAddressData: SelectAddress | null;
  open: boolean;
  renderState: RenderState;
  setOpen: (open: boolean) => void;
  handleSetEditAddress: (address: any) => void;
  handleRenderState: (state: RenderState) => void;
  handleReset: () => void;
  handleSetCurrentAddressId: (addressId:string | null) => void;
  handleOpenCloseModal: () => void;
  utils: ReturnType<typeof trpc.useUtils> | any; 
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentAddressId, setCurrentAddressId] = useState<string | null>(null);
  const [editAddressData, setEditAddressData] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const [renderState, setRenderState] = useState<RenderState>('list');
  const utils = trpc.useUtils()

  const handleSetEditAddress = (address: any) => {
    setEditAddressData(address);
    setCurrentAddressId(address?.id || null);
  };

  const handleRenderState = (state: RenderState) => {
    setRenderState(state);
  };

  const handleReset = () => {
    setEditAddressData(null);
    setCurrentAddressId(null);
    setRenderState('list');
  };

  const handleOpenCloseModal = () => {
    setOpen((prev) => !prev);
    if (!open) handleReset(); // Reset on modal close
  };

  const handleSetCurrentAddressId=(addressId:string | null)=>{
    setCurrentAddressId(addressId)
  }

  return (
    <AddressContext.Provider
      value={{
        currentAddressId,
        editAddressData,
        handleSetCurrentAddressId,
        open,
        renderState,
        setOpen,
        handleSetEditAddress,
        handleRenderState,
        handleReset,
        handleOpenCloseModal,
        utils
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddressContext = () => {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error('useAddressContext must be used within an AddressProvider');
  }
  return context;
};
