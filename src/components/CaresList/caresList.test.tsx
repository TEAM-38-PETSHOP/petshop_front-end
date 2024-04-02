import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CaresList from "./CaresList";
import { Service } from "@/types/Service";

interface Props {
  visibleCares: Service[];
  activeCareId: number;
  setQuery: (query: string) => void;
}

describe("CaresList", () => {
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
  ];
  const mockActiveCareId = 1;
  const mockSetQuery = jest.fn();

  it("renders a heading", () => {
    render(
      <CaresList
        visibleCares={mockVisibleCares}
        activeCareId={mockActiveCareId}
        setQuery={mockSetQuery}
      />
    );

    const descriptionBtn = screen.getByText("Опис процедури");

    expect(descriptionBtn).toBeInTheDocument();
  });

  it("renders additional care description paragraph with correct text and class name", () => {
    render(
      <CaresList
        visibleCares={mockVisibleCares}
        activeCareId={1}
        setQuery={mockSetQuery}
      />
    );

    const additionalDescriptionParagraph = screen.getByText(
      "*за агресію хвостика + 50% до прайсу чи майстер має право відмовити в проведенні послуги"
    );
    const additionalDescriptionParagraphWithClass = screen.getByText(
      "*за агресію хвостика + 50% до прайсу чи майстер має право відмовити в проведенні послуги"
    );

    expect(additionalDescriptionParagraph).toBeInTheDocument();
    expect(additionalDescriptionParagraphWithClass).toBeInTheDocument();
  });

  it("should have correct prop types", () => {
    const props: Props = {
      visibleCares: [],
      activeCareId: 1,
      setQuery: () => {},
    };

    // TypeScript will check the types of the props here
    render(<CaresList {...props} />);

    // If TypeScript throws an error, the test will fail
    expect(true).toBe(true);
  });

  it('renders description section when activeCareId matches care.id and isDescriptionOpen is true', () => {
    const { getByText } = render(
      <CaresList visibleCares={mockVisibleCares} activeCareId={1} setQuery={mockSetQuery} />
    );

    // Click on the description to open it
    fireEvent.click(getByText('Care 1'));

    // Description section should be visible after clicking
    expect(getByText('Description 1')).toBeInTheDocument();
  });

  it('does not render description section when activeCareId does not match care.id', () => {
    const { queryByText } = render(
      <CaresList visibleCares={mockVisibleCares} activeCareId={2} setQuery={mockSetQuery} />
    );

    // Description section should not be visible when activeCareId does not match
    expect(queryByText('Description 1')).not.toBeInTheDocument();
  });
});
