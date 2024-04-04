import { screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { renderWithProviders } from '@/utils/testRedux';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Header component', () => {
  test('renders without crashing', () => {
    renderWithProviders(<Header />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  test('renders logo', () => {
    renderWithProviders(<Header />);
    const logoElement = screen.getByAltText('logo');
    expect(logoElement).toBeInTheDocument();
  });

  test('renders navigation menu', () => {
    renderWithProviders(<Header />);
    const navMenu = screen.getByTestId('nav');
    expect(navMenu).toBeInTheDocument();
  });

  test('opens and closes menu on click', () => {
    renderWithProviders(<Header />);
    const menuButton = screen.getByTestId('menu-button');
    fireEvent.click(menuButton);
    let navMenu = screen.getByTestId('nav');
    expect(navMenu).toHaveClass('nav__open');

    fireEvent.click(menuButton);
    navMenu = screen.getByTestId('nav');
    expect(navMenu).not.toHaveClass('nav__open');
  });
});
