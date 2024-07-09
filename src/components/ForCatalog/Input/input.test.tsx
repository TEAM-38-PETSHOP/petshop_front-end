import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Input from "./Input";

describe("Input Component", () => {
  const mockProducts = [
    { 
      productId: 1, 
      name: "Product 1", 
      price: 100, 
      imageUrls: ["image1.jpg"] ,
      productNameId: "test1",
      brand: "brand1",
      countryProduct: "country1",
      groupProduct: "group1",
      breedSize: "breedSize1",
      type: "type1",
      packaging: "packaging1",
      entryDate: "entryDate1",
      productSize: "productSize1",
      description: "description1",
      composition: "composition1",
      compositionAnalysis: "compositionAnalysis1",
      compositionEnergyValue: "compositionEnergyValue1",
      compositionExpiration: "compositionExpiration1",
      instruction: "instruction1",
      instructionWhyBuy: "instructionWhyBuy1",
      animals: [
        {
          animalId: 1,
          name: "Animal 1",
          animalNameId: "animal1",
        }
      ],
      categories: [
        {
          categoryId: 1,
          name: "Category 1",
          categoryNameId: "category1",
          description: "description1",
        }
      ]
    },
    { 
      productId: 2, 
      name: "Product 2", 
      price: 200, 
      imageUrls: ["image2.jpg"],
      productNameId: "test2",
      brand: "brand2",
      countryProduct: "country2",
      groupProduct: "group2",
      breedSize: "breedSize2",
      type: "type2",
      packaging: "packaging2",
      entryDate: "entryDate2",
      productSize: "productSize2",
      description: "description2",
      composition: "composition2",
      compositionAnalysis: "compositionAnalysis2",
      compositionEnergyValue: "compositionEnergyValue2",
      compositionExpiration: "compositionExpiration2",
      instruction: "instruction2",
      instructionWhyBuy: "instructionWhyBuy2",
      animals: [
        {
          animalId: 2,
          name: "Animal 2",
          animalNameId: "animal2",
        }
      ],
      categories: [
        {
          categoryId: 2,
          name: "Category 2",
          categoryNameId: "category2",
          description: "description2",
        }
      ]
    },
  ];

  it("renders input field with placeholder", () => {
    const { getByPlaceholderText } = render(
      <Input
        query=""
        setQuery={() => {}}
        setQueryToRequest={() => {}}
        isLoading={false}
      />
    );
    expect(getByPlaceholderText("Пошук")).toBeInTheDocument();
  });

  it("updates query state when typing in input field", () => {
    const setQueryMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        query=""
        setQuery={setQueryMock}
        setQueryToRequest={() => {}}
        isLoading={false}
      />
    );
    const inputField = getByPlaceholderText("Пошук");
    fireEvent.change(inputField, { target: { value: "test" } });
    expect(setQueryMock).toHaveBeenCalledWith("test");
  });

  it("clears query state when clear button is clicked", () => {
    const setQueryMock = jest.fn();
    const { getByTestId } = render(
      <Input
        query="test"
        setQuery={setQueryMock}
        setQueryToRequest={() => {}}
        isLoading={false}
      />
    );
    const clearButton = getByTestId("clear-button");
    fireEvent.mouseDown(clearButton);
    expect(setQueryMock).toHaveBeenCalledWith("");
  });

  it("displays loading indicator when isLoading is true", () => {
    const { getByTestId } = render(
      <Input
        query="test"
        setQuery={() => {}}
        setQueryToRequest={() => {}}
        isLoading={true}
      />
    );
    expect(getByTestId("loader")).toBeInTheDocument();
  });

  it("displays no results message when products array is empty", () => {
    const { queryByText } = render(
      <Input
        query="test"
        setQuery={() => {}}
        products={[]}
        setQueryToRequest={() => {}}
        isLoading={false}
      />
    );
    expect(queryByText("Нічого не знайдено")).not.toBeInTheDocument();
  });
});
