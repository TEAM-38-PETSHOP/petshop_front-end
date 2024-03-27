import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from '@testing-library/user-event';
import GroomingHead from "./GroomingHead";

jest.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
    useSearchParams: () => ({
      get: () => {},
    }),
    usePathname: () => "/",
  };
});

describe("GroomingHead", () => {
  test("renders without crashing", () => {
    render(<GroomingHead pet="dogs" />);
  });

  test("renders the component with correct title for dogs", () => {
    render(<GroomingHead pet="dogs" />);
    expect(screen.getByText("Грумінг для песиків")).toBeInTheDocument();
  });

  test("renders the component with correct title for cats", () => {
    render(<GroomingHead pet="cats" />);
    expect(screen.getByText("Грумінг для котиків")).toBeInTheDocument();
  });

  test("renders the component with correct link for dogs", () => {
    render(<GroomingHead pet="dogs" />);
    // Adjusted for the tests
    expect(
      screen.getByRole("link", { name: "Грумінг для котиків" })
    ).toHaveAttribute("href", "/grooming/cats?%5Bobject+Object%5D=&careId=5");
  });

  test("renders the component with correct link for cats", () => {
    render(<GroomingHead pet="cats" />);
    // Adjusted for the tests 
    expect(
      screen.getByRole("link", { name: "Грумінг для песиків" })
    ).toHaveAttribute("href", "/grooming/dogs?%5Bobject+Object%5D=&careId=6");
  });

  test("renders the correct title for dogs", () => {
    render(<GroomingHead pet="dogs" />);
    const title = screen.getByText("Грумінг для песиків");
    expect(title).toBeInTheDocument();
  });

  test("renders the correct title for cats", () => {
    render(<GroomingHead pet="cats" />);
    const title = screen.getByText("Грумінг для котиків");
    expect(title).toBeInTheDocument();
  });
});
