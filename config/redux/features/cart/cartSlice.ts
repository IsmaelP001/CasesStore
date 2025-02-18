"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  items: CartItem[];
  total: number;
}

const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window !== 'undefined')  {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      return JSON.parse(storedCartItems);
    }
  }
  
  return [];
};

const initialState: CartState = {
  items: loadCartFromLocalStorage(),
  total: 0,
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
};

const removeIfQuantityZero = (items: CartItem[]): CartItem[] => {
  return items.filter((item) => item.quantity > 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, { payload }: PayloadAction<CartItem>) => {
      const isItemExist = state.items.find(
        (item) => item.productId === payload.productId
      );
      if (isItemExist) {
        isItemExist.quantity += payload.quantity;
      } else {
        state.items.push(payload);
      }
      state.total = calculateTotal(state.items);
      if (typeof window !== 'undefined') {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    updateItemQuantity: (
      state,
      { payload }: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { quantity, productId } = payload;
      const itemInCart = state.items.find(
        (item) => item.productId === productId
      );
      if (!itemInCart) return;
      itemInCart.quantity = quantity;
      state.total = calculateTotal(state.items);
      state.items = removeIfQuantityZero(state.items);
      if (typeof window !== 'undefined') {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      } },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      if (typeof window !== 'undefined') {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
  },
});

export const { addItem, updateItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
