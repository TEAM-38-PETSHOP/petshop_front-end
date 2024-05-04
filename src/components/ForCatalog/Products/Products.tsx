import ProductCard from "@/components/ProductCard/ProductCard";
import style from "./products.module.scss";
import { Product } from "@/types/Product";
import { useEffect, useState } from "react";
import {
  getProducts,
  getProductsByAnimalAndCategoryId,
  getProductsByCategoryId,
} from "@/helpers/fetchProducts";
import { useSearchParams } from "next/navigation";

interface Props {
  category: string;
  // products: Product[];
}

export default function Products({ category }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();

  const animalId =
    searchParams.get("breed") === "all" ||
    searchParams.get("breed") === undefined
      ? null
      : searchParams.get("breed") === 'cats' ? 2 : 1;

  useEffect(() => {
    getProducts().then((data) => console.log(data));
    if (animalId) {
      getProductsByAnimalAndCategoryId(animalId, Number(category)).then((data) =>
        setProducts(data)
      );
    } else {
      getProductsByCategoryId(Number(category)).then((data) => setProducts(data));
    }
  }, [animalId, category, searchParams]);

  return (
    <div className={style.products}>
      {products.map((product) => (
        <ProductCard
          product={product}
          key={product.productId}
        />
      ))}
    </div>
  );
}
