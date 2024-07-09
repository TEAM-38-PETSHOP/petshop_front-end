import React from "react";
import { render } from "@testing-library/react";
import Categories from "./Categories";
import { BreedType } from "@/types/enums/BreedType";

const mockCategories = [
  {
    categoryId: 1,
    name: "Category 1",
    categoryNameId: "cat1",
    description: "Description 1",
  },
  {
    categoryId: 2,
    name: "Category 2",
    categoryNameId: "cat2",
    description: "Description 2",
  },
];

describe("Categories Component", () => {
  test("renders correctly with props", () => {
    render(<Categories breed={BreedType.ALL} categories={mockCategories} />);
  });

  test("renders Всі товари category correctly", () => {
    const { getByText } = render(
      <Categories breed={BreedType.ALL} categories={mockCategories} />
    );
    expect(getByText("Всі товари")).toBeInTheDocument();
  });

  test("renders each category correctly", () => {
    const { getByText } = render(
      <Categories breed={BreedType.ALL} categories={mockCategories} />
    );
    mockCategories.forEach((category) => {
      expect(getByText(category.name)).toBeInTheDocument();
    });
  });
});
