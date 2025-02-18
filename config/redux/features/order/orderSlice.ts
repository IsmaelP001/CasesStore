import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Errors {
    paymentMethod?: string[];
    deliveryType?: string[];
}

interface DefaultState {
    paymentMethod: {
        label: string;
        value: string;
    } | null;
    isCartOpen: boolean;
    scheduledDate: {
        deliveryType: string;
        date: string | null;
    };
    errors: Errors | null;
}

const defaultState: DefaultState = {
    paymentMethod: null,
    isCartOpen: false,
    scheduledDate: { deliveryType: 'standard', date: null },
    errors: null
};

const orderSlice = createSlice({
    name: 'order',
    initialState: defaultState,
    reducers: {
        setPaymentMethod: (state, { payload }: PayloadAction<typeof defaultState.paymentMethod>) => {
            state.paymentMethod = payload;
        },
        setIsCartOpen: (state, { payload }: PayloadAction<{ isCartOpen: boolean }>) => {
            state.isCartOpen = payload.isCartOpen;
        },
        setScheduledTime: (state, { payload }: PayloadAction<typeof defaultState.scheduledDate>) => {
            console.log('payload schedule', payload);
            state.scheduledDate = payload;
        },
        setErrors: (state, { payload }: PayloadAction<Errors>) => {
            state.errors = payload; 
        },
    }
});

export const { setPaymentMethod, setIsCartOpen, setScheduledTime, setErrors } = orderSlice.actions;

export default orderSlice.reducer;
