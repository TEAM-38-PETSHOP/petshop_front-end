import React from "react";
import Products from "../Products/Products";
import style from "./catalogMain.module.scss";
import cn from "classnames";
import { ProductTypes } from "@/types/Product";

interface Props {
  category: string;
  className?: string;
  type?: ProductTypes;
}

export default function CatalogMain({ category, type = "catalog" }: Props) {
  return (
    <div
      className={cn(style.main, {
        [style.main__catalog]: type === "catalog",
        [style.main__admin]: type === "admin-panel",
      })}
    >
      <Products category={category} type={type} />
    </div>
  );
}
