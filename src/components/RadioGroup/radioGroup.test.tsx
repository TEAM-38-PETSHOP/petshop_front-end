import React from "react";
import { render } from "@testing-library/react";
import RadioGroup from "./RadioGroup";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/catalog",
  useSearchParams: () => ({
    get: jest.fn((key) => {
      if (key === "breed") return "mockedBreed";
      return null;
    }),
  }),
}));

describe("RadioGroup Component", () => {
  it("renders RadioGroup for categories with correct radio buttons", () => {
    const { getByLabelText } = render(<RadioGroup place="categories" />);
    const allRadio = getByLabelText("Всі");
    const catsRadio = getByLabelText("Котики");
    const dogsRadio = getByLabelText("Песики");
    expect(allRadio).toBeInTheDocument();
    expect(catsRadio).toBeInTheDocument();
    expect(dogsRadio).toBeInTheDocument();
  });

  it("renders RadioGroup for catalog with correct radio buttons", () => {
    const { getByLabelText } = render(<RadioGroup place="catalog" />);
    const allRadio = getByLabelText("Всі");
    const catsRadio = getByLabelText("Котики");
    const dogsRadio = getByLabelText("Песики");
    expect(allRadio).toBeInTheDocument();
    expect(catsRadio).toBeInTheDocument();
    expect(dogsRadio).toBeInTheDocument();
  });

  it("checks if radio buttons are selected when the value is in the search params", () => {
    const { getByLabelText } = render(<RadioGroup place="categories" />);
    const catsRadio = getByLabelText("Котики") as HTMLInputElement;
    expect(catsRadio.checked).toEqual(false);
  });

  test("renders correctly with default props", () => {
    const { getByText } = render(<RadioGroup />);

    expect(getByText("Всі")).toBeInTheDocument();
    expect(getByText("Котики")).toBeInTheDocument();
    expect(getByText("Песики")).toBeInTheDocument();
  });

  test("selects the correct radio button based on props", () => {
    const { getByLabelText } = render(<RadioGroup place="categories" />);

    expect(getByLabelText("Всі")).toHaveProperty("checked");
    expect(getByLabelText("Котики")).not.toHaveAttribute("checked");
    expect(getByLabelText("Песики")).not.toHaveAttribute("checked");
  });
});
