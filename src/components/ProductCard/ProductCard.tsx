"use client";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { useToggle } from "@/hooks/useToggle";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  addFavoriteProduct,
  removeFavoriteProduct,
} from "@/redux/features/favoriteSlice";
import { addCartProduct, removeCartProduct } from "@/redux/features/cartSlice";
import { numberToCurrency } from "@/helpers/numberToCurrency";

import styles from "./productCard.module.scss";
import favorite from "@@/images/icons/like.svg";
import cart from "@@/images/icons/cart.svg";

import { Product, ProductTypes } from "@/types/Product";
import Buttons from "../Buttons/Buttons";
import IconForCards from "../IconForCards/IconForCards";
import LimitedText from "../LimitedText/LimitedText";
import trashIcon from "@@/images/icons/trashIcon.svg";
import { EditIcon } from "@/assets";
import { addServiceModal } from "@/redux/features/serviceModalSlice";
import { ServiceModalName } from "@/types";
import { useSession } from "next-auth/react";
import { IUser } from "@/types/User";
import { useSearchParams } from "next/navigation";

type Props = {
  product: Product;
  className?: string;
  type?: ProductTypes;
  setProducts?: (products: Product[]) => void;
};

export default function ProductCard({
  product,
  className,
  type = "catalog",
  setProducts,
}: Props) {
  const { data } = useSession();
  const customUser = data?.user as IUser;
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("activeTab");
  const favoriteProducts = useAppSelector(
    (state) => state.favorite.favoriteProducts
  );
  const cartProducts = useAppSelector((state) => state.cart.cartProducts);
  const [isFavorite, toggleFavorite] = useToggle(
    "favorite",
    favoriteProducts,
    addFavoriteProduct,
    removeFavoriteProduct,
    product
  );
  const [isCart, toggleCart] = useToggle(
    "cart",
    cartProducts,
    addCartProduct,
    removeCartProduct,
    product
  );

  const handleAddToCart = () => {
    toggleCart();
  };

  const handleDeleteItem = () => {
    dispatch(
      addServiceModal({
        type: ServiceModalName.DeleteGood,
        payload: {
          productId: product.productId,
          token: customUser?.token,
          setProducts: setProducts,
        },
      })
    );
  };

  return (
    <div
      className={classNames([styles.productCard, className], {
        [styles.productCard__admin]: type === "admin-panel",
      })}
      data-testid="product-card"
    >
      {type === "admin-panel" ? (
        <div className={styles.productCard__image}>
          <Image
            src={product.imageUrls[0]}
            width={215}
            height={215}
            alt={product.name}
          />
        </div>
      ) : (
        <Link
          href={`/catalog/product/${product.productId}?${product.productNameId}`}
          className={styles.productCard__image}
        >
          <Image
            src={product.imageUrls[0]}
            width={215}
            height={215}
            alt={product.name}
          />
        </Link>
      )}
      <div className={styles.productCard__info}>
        <h3 className={styles.productCard__title}>
          {product.categories[0].name}
        </h3>
        <LimitedText
          text={`${product.name}, ${product.packaging}`}
          maxLength={80}
          maxLengthMobile={35}
          isShowButton={false}
        />
        <p className={styles.productCard__price}>
          {numberToCurrency(product.price)}
        </p>
        <Buttons
          firstBtn={{
            btnText: isCart ? "В кошику" : "Купити",
            btnIcon: cart.src,
            isBuy: true,
            onClick: handleAddToCart,
            type: "button",
            className: styles.productCard__cart,
          }}
        />
      </div>

      {type === "catalog" ? (
        <IconForCards
          isFavorite
          icon={favorite.src}
          handler={toggleFavorite}
          isActive={isFavorite}
        />
      ) : (
        <>
          <Link
            href={{
              pathname: `/admin-panel/edit-good/${product.productId}`,
              query: activeTab ? { activeTab } : {},
            }}
            className={styles.productCard__edit}
          >
            <EditIcon />
          </Link>

          <IconForCards
            className={styles.productCard__delete}
            icon={trashIcon.src}
            handler={handleDeleteItem}
          />
        </>
      )}
    </div>
  );
}
