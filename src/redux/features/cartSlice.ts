import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/Product';
import { checkWindow } from '@/helpers/checkWindow';

export interface CartState {
  cartProducts: {
    product: Product;
    quantity: number;
    cartItemId: number | null;
  }[];
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

      if (checkWindow()) {
        localStorage.setItem('cart', JSON.stringify(state.cartProducts));
      }
    },

    addCartProduct: (
      state,
      action: PayloadAction<CartState['cartProducts'][0]>
    ) => {
      state.cartProducts.push(action.payload);

      if (checkWindow()) {
        localStorage.setItem('cart', JSON.stringify(state.cartProducts));
      }
    },

    removeCartProduct: (state, action: PayloadAction<number>) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product.product.productId !== action.payload
      );

      if (checkWindow()) {
        localStorage.setItem('cart', JSON.stringify(state.cartProducts));
      }
    },

    updateCartQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const product = state.cartProducts.find(
        (item) => item.product.productId === action.payload.productId
      );

      if (product) {
        product.quantity = action.payload.quantity;
      }

      if (checkWindow()) {
        localStorage.setItem('cart', JSON.stringify(state.cartProducts));
      }
    },

    updateCartItemId: (
      state,
      action: PayloadAction<{ productId: number; cartItemId: number }>
    ) => {
      const product = state.cartProducts.find(
        (item) => item.product.productId === action.payload.productId
      );

      if (product) {
        product.cartItemId = action.payload.cartItemId;
      }

      if (checkWindow()) {
        localStorage.setItem('cart', JSON.stringify(state.cartProducts));
      }
    },
  },
});

export default cartSlice.reducer;
export const { setCartProducts, addCartProduct, removeCartProduct, updateCartQuantity, updateCartItemId } = cartSlice.actions;
