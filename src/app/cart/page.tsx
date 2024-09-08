"use client";
import { useEffect } from "react";
import styles from "./cart.module.scss";

import HeaderForPages from "@/components/HeaderForPages/HeaderForPages";
import CartProducts from "@/components/ForCart/CartProducts/CartProducts";
import TotalCart from "@/components/ForCart/TotalCart/TotalCart";
import { useDispatch } from "react-redux";
import { setTotalPrice } from "@/redux/features/totalPriceSlice";
import { CheckTotalPrice } from "@/helpers/CheckTotalPrice";

export default function Cart() {
  const dispatch = useDispatch();

  useEffect(() => {
    const newTotalPrice = CheckTotalPrice();
    dispatch(setTotalPrice(newTotalPrice));
  }, [dispatch]);

  return (
    <>
      <HeaderForPages centralBlock={{ text: "Корзина" }} />
      <section className={styles.cart}>
        <CartProducts />
        <hr className={styles.cart__hr} />
        <TotalCart />
      </section>
    </>
  );
}
