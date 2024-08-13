'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { numberToCurrency } from '@/helpers/numberToCurrency';
import styles from './previewOrder.module.scss';
import { Product } from '@/types/Product';
import { useAppSelector } from '@/hooks/reduxHooks';
import CartItem from '@/components/ForCart/CartItem/CartItem';
import { checkTotalPrice } from '@/helpers/checkTotalPrice';
import { useDispatch } from 'react-redux';
import { setTotalPrice } from '@/redux/features/totalPriceSlice';
import Buttons from '@/components/Buttons/Buttons';
import arrow from '@@/images/icons/arrow_small_black.svg';

type Props = {
  className?: string;
};
export default function PreviewOrder({ className }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const totalPrice = useAppSelector((state) => state.totalPrice.totalPrice);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const products = useAppSelector((state) => state.cart.cartProducts);
  const [isOpen, setIsOpen] = useState(false);

  if (!products.length) {
    setTimeout(() => router.push('/cart'), 1500);
  }

  useEffect(() => {
    setCartProducts(products.map((product) => product.product));

    const newTotalPrice = checkTotalPrice();
    dispatch(setTotalPrice(newTotalPrice));
  }, [products, dispatch]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={classNames([styles.previewOrder], [className], {
        [styles.previewOrderOpened]: isOpen,
      })}
    >
      <h2 className={styles.previewOrder__title}>
        <span>Ваше замовлення</span>
        <span>Сума: {numberToCurrency(totalPrice)}</span>
      </h2>

      <Image
        className={classNames(styles.previewOrder__arrow, {
          [styles.previewOrder__arrowOpened]: isOpen,
        })}
        onClick={toggleOpen}
        src={arrow}
        width={15}
        height={15}
        alt="arrow"
      />

      <div
        className={classNames([styles.previewOrder__items], {
          [styles.previewOrder__itemsOpened]: isOpen,
        })}
      >
        {cartProducts.map((product) => (
          <CartItem
            key={product.productId}
            product={product}
          />
        ))}
      </div>
      <Buttons
        firstBtn={{
          btnText: 'Продовжити покупки',
          btnLink: '/catalog',
          className: classNames([styles.previewOrder__btn], {
            [styles.previewOrder__btnOpened]: isOpen,
          }),
        }}
      />
    </div>
  );
}
