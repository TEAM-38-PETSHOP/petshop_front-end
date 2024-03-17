import { render, screen, fireEvent } from '@testing-library/react';
import Nav from './Nav';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Nav component', () => {
  test('renders without crashing', () => {
    render(
      <Nav
        isOpen={false}
        setOpenMenu={() => {}}
      />
    );
    const navElement = screen.getByTestId('nav');
    expect(navElement).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(
      <Nav
        isOpen={false}
        setOpenMenu={() => {}}
      />
    );
    const navLinks = screen.getAllByRole('link');
    expect(navLinks.length).toBe(6);
  });

  test('closes menu on link click', () => {
    const setOpenMenu = jest.fn();
    render(
      <Nav
        isOpen={false}
        setOpenMenu={setOpenMenu}
      />
    );
    const navLinks = screen.getAllByRole('link');
    navLinks.forEach((link) => {
      fireEvent.click(link);
      expect(setOpenMenu).toHaveBeenCalledWith(false);
    });
  });
});
