import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './features/cart/cartSlice'
import orderReducer from './features/order/orderSlice'

export const store=configureStore({
    reducer:{
        cartState:cartReducer,
        orderState:orderReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;