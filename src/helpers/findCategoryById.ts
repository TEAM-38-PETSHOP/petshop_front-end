import { Category } from "@/types/Product";

export default function findCategoryById(category: string, categories: Category[]) {
  const current = categories.find((item) => item.name === category);
  
  return current?.categoryId || 1
}