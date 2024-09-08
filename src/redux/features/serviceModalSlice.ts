import { ServiceModalName } from "@/types";
import { ServiceModalState } from "@/types/redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ServiceModalState = {};

export const serviceModalSlice = createSlice({
  name: "serviceModalSlice",
  initialState,
  reducers: {
    addServiceModal: (
      state,
      {
        payload,
      }: PayloadAction<{
        type: ServiceModalName;
        payload?: { [key: string]: any };
      }>
    ) => {
      state[payload.type] = payload.payload || {};
      console.log('SLICE IS WORKING');
      
    },
    removeServiceModal: (
      state,
      { payload }: PayloadAction<ServiceModalName>
    ) => {
      delete state[payload];
    },
    removeAllServiceModals: () => ({}),
  },
});

export const { addServiceModal, removeServiceModal, removeAllServiceModals } =
  serviceModalSlice.actions;

export default serviceModalSlice.reducer;
