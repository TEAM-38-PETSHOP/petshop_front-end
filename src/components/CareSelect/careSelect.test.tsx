import { render, fireEvent, screen } from "@testing-library/react";
import CareSelect from "./CareSelect";

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
  visibleCares: [
    {
      id: 1,
      name: "Service 1",
      description: "Description 1",
      numberList: 1,
      animalId: 1,
    },
    {
      id: 2,
      name: "Service 2",
      description: "Description 2",
      numberList: 2,
      animalId: 1,
    },
    {
      id: 3,
      name: "Service 3",
      description: "Description 3",
      numberList: 3,
      animalId: 1,
    },
  ],
  activeCareId: 1,
  currentCare: {
    id: 1,
    name: "Service 1",
    description: "Description 1",
    numberList: 1,
    animalId: 1,
  },
  setQuery: jest.fn(),
};

describe("CareSelect", () => {
  const {
    visibleCares,
    activeCareId,
    currentCare,
    setQuery,
  } = mockProps;

  it("renders without errors", () => {
    render(
      <CareSelect
        visibleCares={visibleCares}
        activeCareId={activeCareId}
        currentCare={currentCare}
        setQuery={setQuery}
      />
    );
  });

  it("renders Dropdown component with correct props", () => {
    const { getByTestId } = render(
      <CareSelect
        visibleCares={visibleCares}
        activeCareId={activeCareId}
        currentCare={currentCare}
        setQuery={setQuery}
      />
    );
    expect(getByTestId("dropdown")).toBeInTheDocument();
  });

  it("renders description div when currentCare is truthy and activeCareId matches", () => {
    const { getByTestId } = render(
      <CareSelect
        visibleCares={visibleCares}
        activeCareId={activeCareId}
        currentCare={currentCare}
        setQuery={setQuery}
      />
    );
    expect(getByTestId("description")).toBeInTheDocument();
  });

  it("toggles isDescriptionOpen state on description div click", () => {
    const { getByTestId } = render(
      <CareSelect
        visibleCares={visibleCares}
        activeCareId={activeCareId}
        currentCare={currentCare}
        setQuery={setQuery}
      />
    );
    const descriptionDiv = getByTestId("description-btn");
    const descriptionArrow = getByTestId("description-arrow");
    fireEvent.click(descriptionDiv);
    expect(descriptionDiv).toHaveClass("description__btnActive");
    expect(descriptionArrow).toHaveClass("description__arrowActive");
  });

  it("toggles isDescriptionOpen state back to original value on second description div click", () => {
    const { getByTestId } = render(
      <CareSelect
        visibleCares={visibleCares}
        activeCareId={activeCareId}
        currentCare={currentCare}
        setQuery={setQuery}
      />
    );
    const descriptionDiv = getByTestId("description");
    fireEvent.click(descriptionDiv);
    fireEvent.click(descriptionDiv);
    expect(descriptionDiv).not.toHaveClass("description__btnActive");
    expect(descriptionDiv).not.toHaveClass("description__arrowActive");
  });
});
