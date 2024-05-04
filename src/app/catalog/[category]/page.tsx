import CatalogHeader from "@/components/ForCatalog/CatalogHeader/CatalogHeader";
import CatalogMain from "@/components/ForCatalog/CatalogMain/CatalogMain";
import { getAllCategories } from "@/helpers/fetchCategories";
// import { getProductsByAnimalAndCategoryId } from "@/helpers/fetchProducts";
// import findAnimalById from "@/helpers/findAnimalById";
// import findCategoryById from "@/helpers/findCategoryById";

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
  searchParams: { breed },
}: Props) {
  const categories = await getAllCategories();
  // const currentCategoryId = findCategoryById(category, categories);
  // const currentAnimalId  = findAnimalById(breed || 'all');
  // const products = await getProductsByAnimalAndCategoryId(currentAnimalId, currentCategoryId);
  console.log(breed);

  return (
    <>
      <CatalogHeader categories={categories} category={category} />
      <CatalogMain category={category} />
    </>
  );
}
