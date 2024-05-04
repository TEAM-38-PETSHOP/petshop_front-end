"use client";

import React from "react";
// import Paggination from "../Paggination/Paggination";
import Products from "../Products/Products";
import style from "./catalogMain.module.scss";
// import { Product } from "@/types/Product";

interface Props {
  category: string;
}

export default function CatalogMain({ category }: Props) {
  // const [products, setProducts] = useState<Product[]>([]);
  // const [pageIndex, setPageIndex] = useState<number>(0);
  // const searchParams = useSearchParams();
  // const animalId = Number(searchParams.get('animalId'));

  // console.log(products);
  
  // here should be state fro paggination probably
  // which we will pass into Paggination component

  // useEffect(() => {
  //   getProductsByAnimalAndCategoryId(1, Number(category)).then((data) => setProducts(data));
  //   // робити тут запити за продуктами слідкуючи за змінами pageIndex
  // }, [searchParams]);

  // useEffect(() => {
  //   // робити тут запити за продуктами слідкуючи за змінами pageIndex
  //   getProducts(pageIndex).then((data) => setProducts(data));
  //   // console.log('all products');
    
  // }, [pageIndex]);
  
  return (
    <div className={style.main}>
      {/* <Suspense fallback={<Loader />}> */}
        <Products category={category} />
      {/* </Suspense> */}

      {/* api/products?page=0&size=5 */}
      {/* <Paggination
        setPageIndex={setPageIndex}
        pageIndex={pageIndex}
        amount={products.length / 20}
      /> */}
    </div>
  );
}
