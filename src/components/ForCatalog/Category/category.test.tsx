import React from 'react';
import { render } from '@testing-library/react';
import Category from './Category';

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/catalog",
  useSearchParams: () => ({
    get: jest.fn(() => {}),
  }),
}));

describe('Category Component', () => {
  it('should render correctly for window width greater than 425px', () => {
    // Mock window.innerWidth to be greater than 425px
    Object.defineProperty(window, 'innerWidth', { value: 500 });

    const { getByText } = render(
      <Category text="Test Text" imgId={1} variant="green" href="/test" />
    );

    expect(getByText('Test Text')).toBeInTheDocument();
  });

  it('should render correctly for window width less than or equal to 425px', () => {
    // Mock window.innerWidth to be less than or equal to 425px
    Object.defineProperty(window, 'innerWidth', { value: 400 });

    const { getByText } = render(
      <Category text="Test Text" imgId={1} variant="green" href="/test" />
    );

    expect(getByText('Test Text')).toBeInTheDocument();
  });
});