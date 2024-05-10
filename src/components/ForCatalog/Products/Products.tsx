"use client";

import ProductCard from "@/components/ProductCard/ProductCard";
import style from "./products.module.scss";
import { Product } from "@/types/Product";
import { useEffect, useState } from "react";
import {
  getFilteredProducts,
  getFilteredProductsPages,
} from "@/helpers/fetchProducts";
import { useSearchParams } from "next/navigation";
import Paggination from "../Paggination/Paggination";
import { defineSortBy } from "@/helpers/defineSortBy";
import { defineAnimal } from "@/helpers/defineAnimal";
import useGetRightSizeOfProducts from "@/helpers/getRightSizeOfProducts";

interface Props {
  category: string;
}

export default function Products({ category }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [amount, setAmount] = useState<number>(1);

  const searchParams = useSearchParams();
  const pageIndex = Math.max(0, (Number(searchParams.get("pageIndex")) || 1) - 1);
  const breed = searchParams.get("breed");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const sort = searchParams.get("sortBy");
  const size = useGetRightSizeOfProducts() || 20;

  const { sortBy, desc } = defineSortBy(sort || "");
  const animal = defineAnimal(breed || "");
  const currentCategory = category === "all" ? "" : category;

  useEffect(() => {
    getFilteredProducts(
      {
        animals: animal,
        categories: currentCategory,
        page: pageIndex,
        from: from || "",
        to: to || "",
        sort: sortBy || "",
        size: size,
      },
      desc
    ).then((data) => {
      setProducts(data);
    });

    getFilteredProductsPages({
      animals: animal,
      categories: currentCategory,
      from: from || "",
      to: to || "",
    }).then((data) => {
      const total = data.count;

      setAmount(total);
    });
  }, [
    animal,
    currentCategory,
    searchParams,
    pageIndex,
    from,
    to,
    sortBy,
    desc,
    size,
  ]);

  return (
    <>
      <div className={style.products}>
        {products.map((product) => (
          <ProductCard product={product} key={product.productId} />
        ))}
      </div>

      <Paggination
        pageIndex={pageIndex}
        amount={Math.ceil(amount / +size) || 1}
      />
    </>
  );
}
