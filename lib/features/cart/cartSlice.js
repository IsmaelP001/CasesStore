import { createSlice } from "@reduxjs/toolkit";

const defaultState={
    totalPrice:0,
    totalDiscounts:0,
    productIds:[],
    taxes:80,
    itebis:80,
    paymentMethod:'',
    isCartOpen:false,
    scheduledTime:{deliveryType:'STANDARD',deliveryDay:null,deliveryHour:null}
    
}

const cartSlice=createSlice({
    name:'cart',
    initialState:defaultState,
    reducers:{
        setTotalPrice:(state,{payload})=>{
            state.totalPrice=payload?.totalPrice || 0
        },
        setTotalDiscount:(state,{payload})=>{
            state.totalDiscounts=payload?.totalDiscounts || 0
        },
        setPaymentMethod:(state,{payload})=>{
            state.paymentMethod=payload?.paymentMethod || ''
        },
        setIsCartOpen:(state,{payload})=>{
            state.isCartOpen=payload?.isCartOpen
            console.log('isCartOpen',payload)

        },
        setScheduledTime:(state,{payload})=>{
            state.scheduledTime=payload
        },
    }
})

export const {setTotalPrice,setPaymentMethod,setTotalDiscount,setIsCartOpen,setScheduledTime}=cartSlice.actions

export default cartSlice.reducer