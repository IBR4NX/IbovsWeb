import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: boolean
}

const initialState: CounterState = {
  value: false,
}
export const mobileMenu=createSlice({
    name: "mobileMenu",
    initialState,
    reducers: {
        menu:(state,action:PayloadAction<boolean>)=>{
            // console.log("calling the reducer for active plus",action);
            state.value=action.payload;
            if (action.payload) {
                document.documentElement.classList.add("scrollbar-hidden");
            }else{
                document.documentElement.classList.remove("scrollbar-hidden");
            }
        }
    }
})
export const {menu}=mobileMenu.actions
export default mobileMenu.reducer