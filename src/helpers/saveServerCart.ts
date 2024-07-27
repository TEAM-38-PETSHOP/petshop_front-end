import { getCartItems } from './fetchCart';
import { checkWindow } from './checkWindow';
import { CartState, setCartProducts } from '@/redux/features/cartSlice';
import { AppDispatch } from '@/redux/store';

export const saveServerCart = async (
  accessToken: string,
  cartProducts: CartState['cartProducts'],
  dispatch: AppDispatch
) => {
  const serverCartItems = await getCartItems(accessToken);
  const cart = [...cartProducts];

  serverCartItems.cartItems.forEach((item) => {
    if (
      !cart.some(
        (cartItem) => cartItem.product.productId === item.productDto.productId
      )
    ) {
      cart.push({
        product: item.productDto,
        quantity: item.quantity,
        cartItemId: item.cartItemId,
      });
    }
  });

  dispatch(setCartProducts(cart));
  checkWindow() && localStorage.setItem('cart', JSON.stringify(cart));
};
