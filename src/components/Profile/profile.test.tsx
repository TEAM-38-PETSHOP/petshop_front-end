import { render, screen, fireEvent } from '@testing-library/react';
import style from './profile.module.scss';
import Profile from './Profile';

describe('Profile component', () => {
  test('renders without crashing', () => {
    render(<Profile />);
    const profileElement = screen.getByRole('link');
    expect(profileElement).toBeInTheDocument();
  });

  test('renders with provided className', () => {
    const className = 'custom-class';
    render(<Profile className={className} />);
    const profileElement = screen.getByRole('link');
    expect(profileElement).toHaveClass(className);
  });

  test('fires onClick callback when clicked', () => {
    const handleClick = jest.fn();
    render(<Profile onClick={handleClick} />);
    const profileElement = screen.getByRole('link');
    fireEvent.click(profileElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not add selected style when path is not /profile', () => {
    jest.mock('next/navigation', () => ({
      usePathname: jest.fn(() => '/other-path'),
    }));

    render(<Profile />);
    const profileElement = screen.getByRole('link');
    expect(profileElement).not.toHaveClass(style.ProfileIcon__Selected);
  });
});
