import { render, screen } from "@testing-library/react";
import Categories from "./Categories";
import { BreedType } from "@/types/enums/BreedType";
import { checkVariant } from "@/helpers/checkVariant";

describe("Categories component", () => {
  test("renders without crashing", () => {
    render(<Categories breed={BreedType.CATS} />);
  });

  test("renders all categories", () => {
    const mockCategories = [
      { categoryId: 1, name: "Category 1" },
      { categoryId: 2, name: "Category 2" },
    ];
    render(<Categories breed={BreedType.CATS} />);
    mockCategories.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  test("renders correct number of categories", () => {
    const mockCategories = [
      { categoryId: 1, name: "Category 1" },
      { categoryId: 2, name: "Category 2" },
    ];
    render(<Categories breed={BreedType.CATS} />);
    expect(screen.getAllByTestId("category").length).toBe(
      mockCategories.length
    );
  });

  test("renders correct href for each category", () => {
    const mockCategories = [
      { categoryId: 1, name: "Category 1" },
      { categoryId: 2, name: "Category 2" },
    ];
    render(<Categories breed={BreedType.CATS} />);
    mockCategories.forEach(({ categoryId, name }) => {
      expect(screen.getByRole("link", { name })).toHaveAttribute(
        "href",
        `/catalog/${categoryId}?breed=${BreedType.CATS}`
      );
    });
  });

  test("renders correct variant for each category", () => {
    const mockCategories = [
      { categoryId: 1, name: "Category 1" },
      { categoryId: 2, name: "Category 2" },
    ];
    render(<Categories breed={BreedType.CATS} />);
    mockCategories.forEach(({ categoryId }) => {
      expect(screen.getByTestId(`category-${categoryId}`)).toHaveClass(
        checkVariant(categoryId)
      );
    });
  });
});
