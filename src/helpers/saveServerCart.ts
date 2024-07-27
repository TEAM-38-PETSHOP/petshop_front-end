import { Product } from '@/types/Product';
import { getCartItems } from './fetchCart';
import { checkWindow } from './checkWindow';
import { setCartProducts } from '@/redux/features/cartSlice';

export const saveServerCart = async (
  accessToken: string,
  cartProducts: Product[],
  dispatch: any
) => {
  const serverCartItems = await getCartItems(accessToken);
  const cart = [...cartProducts];

  serverCartItems.cartItems.forEach((item) => {
    checkWindow() &&
      localStorage.setItem(
        `cart ${item.productDto.productId}`,
        item.cartItemId.toString()
      );
    checkWindow() &&
      localStorage.setItem(
        item.productDto.productId.toString(),
        item.quantity.toString()
      );

    if (
      !cart.some((cartItem) => cartItem.productId === item.productDto.productId)
    ) {
      cart.push(item.productDto);
    }
  });

  dispatch(setCartProducts(cart));
  checkWindow() && localStorage.setItem('cart', JSON.stringify(cart));
};
