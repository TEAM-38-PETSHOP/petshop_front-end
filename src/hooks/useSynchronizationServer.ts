'use client';

import { saveServerCart } from '@/helpers/saveServerCart';
import { CustomSession } from '@/types/CustomSession';
import { useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { useEffect } from 'react';
import { saveServerFavorites } from '@/helpers/saveServerFavorites';

export default function useSynchronizationServer() {
  const { data: session, status } = useSession();
  const customSession = session as CustomSession;
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.cart.cartProducts);
  const favoriteProducts = useAppSelector(
    (state) => state.favorite.favoriteProducts
  );

  useEffect(() => {
    if (status === 'authenticated' && customSession?.accessToken) {
      saveServerCart(customSession.accessToken, cartProducts, dispatch);
      saveServerFavorites(
        customSession.accessToken,
        favoriteProducts,
        dispatch
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
}
