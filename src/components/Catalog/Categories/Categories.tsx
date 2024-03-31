import style from "./categories.module.scss";
import Category from "../Category/Category";
import { BreedType } from "@/types/enums/BreedType";

export function filterCategories(array: any[], BreedType: BreedType) {
  switch (BreedType) {
    case "cats":
      return array.filter((item) => item.type.includes("cats"));
    case "dogs":
      return array.filter((item) => item.type.includes("dogs"));
    default:
      return array;
  }
}

const categories = [
  {
    id: 1,
    text: "Смаколики",
    href: "/catalog/goodies",
    variant: "green",
    type: ["cats", "dogs"],
  },
  {
    id: 2,
    text: "Аксесуари",
    href: "/catalog/accessories",
    variant: "orange",
    type: ["cats", "dogs"],
  },
  {
    id: 3,
    text: "Одяг",
    href: "/catalog/clothes",
    variant: "white",
    type: ["cats", "dogs"],
  },
  {
    id: 4,
    text: "Іграшки",
    href: "/catalog/toys",
    variant: "white",
    type: ["cats", "dogs"],
  },
  {
    id: 5,
    text: "Домашній догляд",
    href: "/catalog/homecare",
    variant: "green",
    type: ["cats", "dogs"],
  },
  {
    id: 6,
    text: "Косметика",
    href: "/catalog/cosmetics",
    variant: "orange",
    type: ["cats", "dogs"],
  },
];

export default function Categories() {
  // Читати searchParams і передавати в href
  const filteredCategories = filterCategories(categories, BreedType.ALL);
  return (
    <div className={style.categories}>
      {filteredCategories.map(({ id, text, href, variant }) => (
        <Category
          key={id}
          text={text}
          href={href}
          imgId={id}
          variant={variant}
        />
      ))}
    </div>
  );
}
