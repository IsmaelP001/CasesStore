import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../lib/features/cart/cartSlice'

export const store=configureStore({
    reducer:{
        cartState:cartReducer
    }
})