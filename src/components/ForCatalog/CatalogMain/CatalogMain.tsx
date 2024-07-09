import React from "react";
import Products from "../Products/Products";
import style from "./catalogMain.module.scss";

interface Props {
  category: string;
}

export default function CatalogMain({ category }: Props) {
  return (
    <div className={style.main}>
      <Products category={category} />
    </div>
  );
}
