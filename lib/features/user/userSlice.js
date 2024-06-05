import { createSlice } from "@reduxjs/toolkit";

const defaultState={
    userId:0,
    token:0,
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