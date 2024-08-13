import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/Product';
import { checkWindow } from '@/helpers/checkWindow';
import {
  deleteFavoriteItem,
  sendFavoriteItems,
} from '@/helpers/fetchFavorites';
import { toast } from 'react-toastify';
import { RootState } from '../store';

export interface FavoriteState {
  favoriteProducts: {
    product: Product;
    wishItemId: number | null;
  }[];
}

const favoriteStorage =
  checkWindow() && JSON.parse(localStorage.getItem('favorite') || '[]');

const initialState: FavoriteState = {
  favoriteProducts: favoriteStorage,
};

export const addFavoriteProductAsync = createAsyncThunk(
  'favorite/addFavoriteProductAsync',
  async (
    {
      product,
      accessToken,
    }: { product: FavoriteState['favoriteProducts'][0]; accessToken: string },
    { dispatch }
  ) => {
    const favoriteItem = await toast.promise(
      sendFavoriteItems(product.product.productId, accessToken),
      {
        pending: ' ',
        success: 'Додано до улюблених',
        error: 'Помилка додавання до улюблених',
      }
    );

    const newWishItemId = favoriteItem.wishItems.find(
      (item) => item.product.productId === product.product.productId
    )?.wishItemId;

    if (newWishItemId) {
      dispatch(
        addFavoriteProduct({
          product: product.product,
          wishItemId: newWishItemId,
        })
      );
    }

    return product;
  }
);

export const removeFavoriteProductAsync = createAsyncThunk(
  'favorite/removeFavoriteProductAsync',
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
    const state = getState() as RootState;

    const wishItemId = (
      state.favorite.favoriteProducts.find(
        (product) => product.product.productId === productId
      ) as FavoriteState['favoriteProducts'][0]
    ).wishItemId;

    if (wishItemId) {
      await toast.promise(deleteFavoriteItem(wishItemId, accessToken), {
        pending: ' ',
        success: 'Видалено з улюблених',
        error: 'Помилка видалення з улюблених',
      });
      dispatch(removeFavoriteProduct(productId));
    } else {
      toast.error('Помилка видалення з улюблених');
    }
  }
);

const favoriteSlice = createSlice({
  name: 'favoriteProducts',
  initialState,
  reducers: {
    setFavoriteProducts: (state, action: PayloadAction<FavoriteState['favoriteProducts']>) => {
      state.favoriteProducts = action.payload;

      if (checkWindow()) {
        localStorage.setItem(
          'favorite',
          JSON.stringify(state.favoriteProducts)
        );
      }
    },

    addFavoriteProduct: (
      state,
      action: PayloadAction<FavoriteState['favoriteProducts'][0]>
    ) => {
      state.favoriteProducts.push(action.payload);

      if (checkWindow()) {
        localStorage.setItem(
          'favorite',
          JSON.stringify(state.favoriteProducts)
        );
      }
    },

    removeFavoriteProduct: (state, action: PayloadAction<number>) => {
      state.favoriteProducts = state.favoriteProducts.filter(
        (product) => product.product.productId !== action.payload
      );

      if (checkWindow()) {
        localStorage.setItem(
          'favorite',
          JSON.stringify(state.favoriteProducts)
        );
      }
    },

    updateFavoriteItemId: (
      state,
      action: PayloadAction<{ productId: number; wishItemId: number }>
    ) => {
      const product = state.favoriteProducts.find(
        (item) => item.product.productId === action.payload.productId
      );

      if (product) {
        product.wishItemId = action.payload.wishItemId;
      }

      if (checkWindow()) {
        localStorage.setItem(
          'favorite',
          JSON.stringify(state.favoriteProducts)
        );
      }
    },
  },
});

export default favoriteSlice.reducer;
export const {
  setFavoriteProducts,
  addFavoriteProduct,
  removeFavoriteProduct,
  updateFavoriteItemId,
} = favoriteSlice.actions;
