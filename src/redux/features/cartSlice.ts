import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/Product';
import { checkWindow } from '@/helpers/checkWindow';
import {
  deleteCartItem,
  sendCartItems,
  updateCartItem,
} from '@/helpers/fetchCart';
import { toast } from 'react-toastify';

export interface CartState {
  cartProducts: {
    product: Product;
    quantity: number;
    cartItemId: number | null;
  }[];
  loading: boolean;
}

const cartStorage =
  checkWindow() && JSON.parse(localStorage.getItem('cart') || '[]');

const initialState: CartState = {
  cartProducts: cartStorage,
  loading: false,
};

export const addCartProductAsync = createAsyncThunk(
  'cart/addCartProductAsync',
  async (
    {
      product,
      accessToken,
    }: { product: CartState['cartProducts'][0]; accessToken: string },
    { dispatch }
  ) => {
    const cartItems = await toast.promise(
      sendCartItems(
        [{ productId: product.product.productId, quantity: product.quantity }],
        accessToken
      ),
      {
        pending: ' ',
        success: 'Додано до кошика',
        error: 'Помилка додавання до кошика',
      }
    );

    const newCartItemId = cartItems.cartItems.find(
      (item) => item.productDto.productId === product.product.productId
    )?.cartItemId;

    if (newCartItemId) {
      dispatch(
        addCartProduct({
          product: product.product,
          cartItemId: newCartItemId,
          quantity: product.quantity,
        })
      );
    }

    return product;
  }
);

export const updateCartQuantityAsync = createAsyncThunk(
  'cart/updateCartQuantityAsync',
  async (
    {
      productId,
      quantity,
      accessToken,
    }: {
      productId: number;
      quantity: number;
      accessToken: string;
    },
    { getState, dispatch }
  ) => {
    const state = getState() as { cart: CartState };

    const cartItem = state.cart.cartProducts.find(
      (product) => product.product.productId === productId
    );

    if (cartItem && cartItem.cartItemId !== null) {
      await toast.promise(
        updateCartItem(
          cartItem.cartItemId,
          cartItem.product.productId,
          quantity,
          accessToken
        ),
        {
          pending: 'Оновлюємо кількість...',
          success: 'Кількість товару змінено',
          error: 'Помилка зміни кількості товару',
        }
      );

      dispatch(
        updateCartQuantity({
          productId: productId,
          quantity: quantity,
        })
      );

      return 'success';
    } else {
      toast.error('Помилка зміни кількості товару');
    }
  }
);

export const removeCartProductAsync = createAsyncThunk(
  'cart/removeCartProductAsync',
  async (
    {
      productId,
      accessToken,
    }: {
      productId: number;
      accessToken: string;
    },
    { getState, dispatch }
  ) => {
    const state = getState() as { cart: CartState };

    const cartItemId = state.cart.cartProducts.find(
      (product) => product.product.productId === productId
    )?.cartItemId;

    if (cartItemId) {
      await toast.promise(deleteCartItem(cartItemId, accessToken), {
        pending: ' ',
        success: 'Видалено з кошика',
        error: 'Помилка видалення з кошика',
      });
      dispatch(removeCartProduct(productId));
    } else {
      toast.error('Помилка видалення з кошика');
    }
  }
);

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
export const {
  setCartProducts,
  addCartProduct,
  removeCartProduct,
  updateCartQuantity,
  updateCartItemId,
} = cartSlice.actions;
