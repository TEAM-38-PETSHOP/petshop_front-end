import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/Product';
import { checkWindow } from '@/helpers/checkWindow';

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

const favoriteSlice = createSlice({
  name: 'favoriteProducts',
  initialState,
  reducers: {
    setFavoriteProducts: (state, action) => {
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
