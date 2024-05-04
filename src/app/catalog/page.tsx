import Categories from "@/components/ForCatalog/Categories/Categories";
import StoreHeader from "@/components/ForCatalog/StoreHeader/StoreHeader";
import { BreedType } from "@/types/enums/BreedType";

type Props = {
  searchParams: {
    [key: string]: BreedType | undefined;
  };
};

export default async function Store({ searchParams: { breed } }: Props) {
  return (
    <>
      <StoreHeader />
      <Categories breed={breed} />
    </>
  );
}
