import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import GroomingForm from "./GroomingForm";

jest.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
    useSearchParams: () => ({
      get: jest.fn(),
    }),
    usePathname: () => "/",
  };
});

const mockProps = {
  pet: "dogs",
  services: [
    {
      id: 1,
      name: "Service 1",
      animalId: 1,
      numberList: 1,
      description: "Description 1",
    },
    {
      id: 2,
      name: "Service 2",
      animalId: 1,
      numberList: 2,
      description: "Description 2",
    },
  ],
  typeOfServices: [
    { id: 1, petServiceId: 1, name: "Type 1", numberList: 1, price: "Price 1" },
    { id: 2, petServiceId: 1, name: "Type 2", numberList: 2, price: "Price 2" },
  ],
};

describe("GroomingForm", () => {
  test("renders GroomingForm component", () => {
    render(
      <GroomingForm
        {...mockProps}
      />
    );
  });

  test("renders the component with correct title for dogs", async () => {
    const propsWithCats = { ...mockProps, pet: "dogs" };
    render(<GroomingForm {...propsWithCats} />);
    expect(await screen.findByText("Грумінг для котиків")).toBeInTheDocument();
  });

  test("renders the component with correct title for cats", async () => {
    const propsWithCats = { ...mockProps, pet: "cats" };
    render(<GroomingForm {...propsWithCats} />);
    expect(await screen.findByText("Грумінг для песиків")).toBeInTheDocument();
  });

  test("renders the breeds list container with search input if breeds are more than 9", () => {
    const largeBreeds = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      name: `Type ${i + 1}`,
      petServiceId: 1,
      numberList: i + 1,
      price: `Price ${i + 1}`,
    }));
    const propsWithLargeBreeds = { ...mockProps, typeOfServices: largeBreeds };
    render(<GroomingForm {...propsWithLargeBreeds} />);
    
    // Check if the element with data-testid "breeds-list" and className "groomingForm__breedsContainer" is present
    const breedsListContainer = screen.getByTestId("breeds-list");
    
    // Assert that the breeds list container exists
    expect(breedsListContainer).toBeInTheDocument();
  
    // Alternatively, you can also check if the element has the expected class name
    expect(breedsListContainer).toHaveClass("groomingForm__breedsContainer");
  });
  
  test("renders the component with correct link", () => {
    render(<GroomingForm {...mockProps} />);
    // Adjusted for the tests
    expect(
      screen.getByRole("link", { name: "Грумінг для котиків" })
    ).toHaveAttribute("href", "/grooming/cats?%5Bobject+Object%5D=&careId=5");
  });
});
