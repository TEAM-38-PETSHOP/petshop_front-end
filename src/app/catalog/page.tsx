import Categories from "@/components/ForCatalog/Categories/Categories";
import StoreHeader from "@/components/ForCatalog/StoreHeader/StoreHeader";
import { getAllCategories } from "@/helpers/fetchCategories";
import { Category } from "@/types/Product";
import { BreedType } from "@/types/enums/BreedType";

type Props = {
  searchParams: {
    [key: string]: BreedType | undefined;
  };
};

export default async function Store({ searchParams: { breed } }: Props) {
  const categories: Category[] = await getAllCategories();

  return (
    <>
      <StoreHeader />
      <Categories categories={categories} breed={breed} />
    </>
  );
}
