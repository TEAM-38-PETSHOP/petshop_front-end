import { createSlice } from '@reduxjs/toolkit';

export interface totalPriceState {
  totalPrice: number;
}

const initialState: totalPriceState = {
  totalPrice: 0,
};

const totalPriceSlice = createSlice({
  name: 'totalPrice',
  initialState,
  reducers: {
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
  },
});

export default totalPriceSlice.reducer;
export const { setTotalPrice } = totalPriceSlice.actions;
