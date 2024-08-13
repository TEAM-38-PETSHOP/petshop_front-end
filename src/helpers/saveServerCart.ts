import { getCartItems, sendCartItems } from './fetchCart';
import { checkWindow } from './checkWindow';
import { CartState, setCartProducts } from '@/redux/features/cartSlice';
import { AppDispatch } from '@/redux/store';

export const saveServerCart = async (
  accessToken: string,
  cartProducts: CartState['cartProducts'],
  dispatch: AppDispatch
) => {
  const cartForRequest = cartProducts.map((item) => ({
    productId: item.product.productId,
    quantity: item.quantity,
  }));
  await sendCartItems(cartForRequest, accessToken);
  const serverCartItems = await getCartItems(accessToken);

  const newCart = serverCartItems.cartItems.map((item) => {
    return {
      product: item.productDto,
      quantity: item.quantity,
      cartItemId: item.cartItemId,
    };
  });

  dispatch(setCartProducts(newCart));
  checkWindow() && localStorage.setItem('cart', JSON.stringify(newCart));
};
