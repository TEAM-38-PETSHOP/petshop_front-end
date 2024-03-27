import React from "react";
import { render, screen } from "@testing-library/react";
import GroomingChoice from "./GroomingChoice";

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

describe("GroomingChoice", () => {
  const queryAllByAttribute = (attribute: string, value: string) => {
    return Array.from(document.querySelectorAll(`[${attribute}="${value}"]`));
  };

  it("renders component with correct title", () => {
    render(<GroomingChoice />);
    expect(screen.getByText("Кого потрібно причепурити ?")).toBeInTheDocument();
  });

  it('renders Choice component for dogs with correct props', () => {
    render(<GroomingChoice />);
    
    const choiceDogs = screen.getByText('Песика');
    
    expect(choiceDogs).toBeInTheDocument();
  });

  it('renders Choice component for dogs with correct props', () => {
    render(<GroomingChoice />);
    
    const choiceDogs = screen.getByText('Котика');
    
    expect(choiceDogs).toBeInTheDocument();
  });
});
