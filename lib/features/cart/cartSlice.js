import { createSlice } from "@reduxjs/toolkit";

const defaultState={
    totalPrice:0,
    discount:0,
    productIds:[],
    
}

const cartSlice=createSlice({
    name:'cart',
    initialState:defaultState,
    reducers:{
        updateTotalPrice:(state,action)=>{
            console.log('updated price')
        }
    }
})

export const {updateTotalPrice}=cartSlice.actions

export default cartSlice.reducer