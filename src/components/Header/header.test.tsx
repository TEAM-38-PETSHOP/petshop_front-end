import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Header component', () => {
  test('renders without crashing', () => {
    render(<Header />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  test('renders logo', () => {
    render(<Header />);
    const logoElement = screen.getByAltText('logo');
    expect(logoElement).toBeInTheDocument();
  });

  test('renders navigation menu', () => {
    render(<Header />);
    const navMenu = screen.getByTestId('nav');
    expect(navMenu).toBeInTheDocument();
  });

  test('opens and closes menu on click', () => {
    render(<Header />);
    const menuButton = screen.getByTestId('menu-button');
    fireEvent.click(menuButton);
    let navMenu = screen.getByTestId('nav');
    expect(navMenu).toHaveClass('nav__open');

    fireEvent.click(menuButton);
    navMenu = screen.getByTestId('nav');
    expect(navMenu).not.toHaveClass('nav__open');
  });
});
