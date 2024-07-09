import { createSlice } from '@reduxjs/toolkit';
import { Product } from '@/types/Product';
import { checkWindow } from '@/helpers/checkWindow';

export interface CartState {
  cartProducts: Product[];
}

const cartStorage =
  checkWindow() && JSON.parse(localStorage.getItem('cart') || '[]');

const initialState: CartState = {
  cartProducts: cartStorage,
};

const cartSlice = createSlice({
  name: 'cartProducts',
  initialState,
  reducers: {
    setCartProducts: (state, action) => {
      state.cartProducts = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const { setCartProducts } = cartSlice.actions;
