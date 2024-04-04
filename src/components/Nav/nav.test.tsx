import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/utils/testRedux';
import Nav from './Nav';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Nav component', () => {
  test('renders without crashing', () => {
    renderWithProviders(
      <Nav
        isOpen={false}
        setOpenMenu={() => {}}
      />
    );
    const navElement = screen.getByTestId('nav');
    expect(navElement).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    renderWithProviders(
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
    renderWithProviders(
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
