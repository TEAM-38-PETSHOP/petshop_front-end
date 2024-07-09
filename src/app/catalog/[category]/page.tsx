import CatalogHeader from "@/components/ForCatalog/CatalogHeader/CatalogHeader";
import CatalogMain from "@/components/ForCatalog/CatalogMain/CatalogMain";
import { getAllCategories } from "@/helpers/fetchCategories";

type Props = {
  params: {
    category: string;
  };
  searchParams: {
    [key: string]: string | undefined;
  };
};

export default async function Store({
  params: { category },
}: Props) {
  const categories = await getAllCategories();

  return (
    <>
      <CatalogHeader categories={categories} category={category} />
      <CatalogMain category={category} />
    </>
  );
}
