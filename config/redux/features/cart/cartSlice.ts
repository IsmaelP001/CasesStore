"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LastItemAdded{
  name:string,
  image:string,
  deviceName:string;
  price:string
}

export interface CartItem {
  productId: string;
  deviceId: string;
  quantity: number;
  colorId?: string | null;
  configurationId?: string | null;
  coverImage: string;
  name: string;
  device: {
    id: string;
    name: string;
  };
  price: number;
  isAddItemFirstTime?:boolean

}

interface CartState {
  lastItemAdded: CartItem | null
}


const initialState: CartState = {
  lastItemAdded:null
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    setLastItemAdded: (state, { payload }: PayloadAction<CartItem>) => {
      state.lastItemAdded=payload
    },
  },
});

export const { setLastItemAdded} = cartSlice.actions;
export default cartSlice.reducer;
