import { Product } from '@/types/Product';

export function filterProductsByCategoryId(
  products: Product[],
  categoryId: string
): Product[] {
  if (categoryId === 'all') {
    return products;
  }

  return products.filter((product) => {
    return product.categories.some(
      (category) => category.categoryId.toString() === categoryId
    );
  });
}
