import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from "./Dropdown";

jest.mock('next/navigation', () => {
  return {
    __esModule: true,
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn()
    }),
    useSearchParams: () => ({
      get: () => {}
    }),
    usePathname: () => '/'
  }
})

describe("Dropdown", () => {
  const mockVisibleCares = [
    {
      id: 1,
      name: "Care 1",
      description: "Description 1",
      numberList: 1,
      animalId: 1,
    },
    {
      id: 2,
      name: "Care 2",
      description: "Description 2",
      numberList: 2,
      animalId: 1,
    },
    {
      id: 3,
      name: "Care 3",
      description: "Description 3",
      numberList: 3,
      animalId: 1,
    },
  ];
  const mockActiveCare = 1;
  const mockChangeHandler = jest.fn();
  const mockCurrentCare = {
    id: 1,
    name: "Current Care 1",
    description: "Description 1",
    numberList: 1,
    animalId: 1,
  };

  it("renders without errors", () => {
    render(
      <Dropdown
        visibleCares={mockVisibleCares}
        activeCare={mockActiveCare}
        changeHandler={mockChangeHandler}
        currentCare={mockCurrentCare}
      />
    );

    // Ensure that dropdown button is rendered
    expect(screen.getByText("Current Care 1")).toBeInTheDocument();

    // Ensure that dropdown content is not initially visible
    expect(screen.queryByText("Current Care 2")).not.toBeInTheDocument();

    // Ensure that dropdown content becomes visible after clicking the button
    fireEvent.click(screen.getByText("Care 1"));
    expect(screen.getByText("Care 2")).toBeInTheDocument();
    expect(screen.getByText("Care 3")).toBeInTheDocument();

    // Ensure that clicking on another care item triggers changeHandler
    fireEvent.click(screen.getByText("Care 2"));
    expect(mockChangeHandler).toHaveBeenCalledWith(2);
  });
});
