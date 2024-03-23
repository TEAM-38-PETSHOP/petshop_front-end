import { createSlice } from '@reduxjs/toolkit';
import { Product } from '@/types/Product';

export interface FavoriteState {
  favoriteProducts: Product[];
}

const favoriteStorage =
  typeof window !== 'undefined' &&
  JSON.parse(localStorage.getItem('favorite') || '[]');

const initialState: FavoriteState = {
  favoriteProducts: favoriteStorage,
};

const favoriteSlice = createSlice({
  name: 'favoriteProducts',
  initialState,
  reducers: {
    setFavoriteProducts: (state, action) => {
      state.favoriteProducts = action.payload;
    },
  },
});

export default favoriteSlice.reducer;
export const { setFavoriteProducts } = favoriteSlice.actions;
