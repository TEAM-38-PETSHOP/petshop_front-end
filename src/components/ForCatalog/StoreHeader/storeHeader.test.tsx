import { render, screen } from '@testing-library/react';
import StoreHeader from './StoreHeader';

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/catalog",
  useSearchParams: () => ({
    get: jest.fn(() => {}),
  }),
}));

describe('StoreHeader', () => {
  it('renders without crashing', () => {
    render(<StoreHeader />);
  });

  it('renders a header with the correct title', () => {
    render(<StoreHeader />);
    const headerElement = screen.getByText(/Обери категорію товарів/i);
    expect(headerElement).toBeInTheDocument();
  });

  it('renders the RadioGroup component', () => {
    const { getByTestId } = render(<StoreHeader />);
    const radioGroup = getByTestId('radio-group');
    expect(radioGroup).toBeInTheDocument();
  });
});