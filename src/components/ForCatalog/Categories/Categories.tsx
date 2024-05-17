import style from "./categories.module.scss";
import Category from "../Category/Category";
import { BreedType } from "@/types/enums/BreedType";
import { Suspense } from "react";
import { getAllCategories } from "@/helpers/fetchCategories";
import { checkVariant } from "@/helpers/checkVariant";

interface Props {
  breed?: BreedType | undefined;
}

export default async function Categories({ breed }: Props) {
  const categories = await getAllCategories();
  const searchParams = breed ? `?breed=${breed}` : "";
  
  return (
    <div className={style.categories}>
      <Suspense>
        <Category
          text={'Всі товари'}
          href={`/catalog/all${searchParams}`}
          imgId={7}
          variant={checkVariant(7)}
        />
      </Suspense>

      {categories.map(({ categoryId, name, categoryNameId }) => (
        <Suspense
          key={categoryId}
        >
          <Category
            text={name}
            href={`/catalog/${categoryNameId}${searchParams}`}
            imgId={categoryId}
            variant={checkVariant(categoryId)}
          />
        </Suspense>
      ))}
    </div>
  );
}
