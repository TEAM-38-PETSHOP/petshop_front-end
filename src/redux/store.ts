import { configureStore } from "@reduxjs/toolkit";
import favoriteSlice from "./features/favoriteSlice";
import cartSlice from "./features/cartSlice";
import totalPriceSlice from "./features/totalPriceSlice";
import serviceModalSlice from "./features/serviceModalSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartSlice,
      favorite: favoriteSlice,
      totalPrice: totalPriceSlice,
      serviceModal: serviceModalSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
