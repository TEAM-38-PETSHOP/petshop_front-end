import { render, screen } from '@testing-library/react';
import SocialNetworks from './SocialNetworks';

describe('SocialNetworks component', () => {
  test('renders without crashing', () => {
    render(<SocialNetworks />);
    const socialNetworksSection = screen.getByTestId('social-networks-section');
    expect(socialNetworksSection).toBeInTheDocument();
  });

  test('renders title', () => {
    render(<SocialNetworks />);
    const titleElement = screen.getByText('Також можемо познайомитись тут');
    expect(titleElement).toBeInTheDocument();
  });

  test('renders Telegram button', () => {
    render(<SocialNetworks />);
    const telegramButton = screen.getByText('Telegram');
    expect(telegramButton).toBeInTheDocument();
    expect(telegramButton).toHaveAttribute('href', 'https://tg');
    expect(telegramButton).toHaveAttribute('target', '_blank');
  });

  test('renders Instagram button', () => {
    render(<SocialNetworks />);
    const instagramButton = screen.getByText('Instagram');
    expect(instagramButton).toBeInTheDocument();
    expect(instagramButton).toHaveAttribute(
      'href',
      'https://www.instagram.com/onegroom.ua/'
    );
    expect(instagramButton).toHaveAttribute('target', '_blank');
  });

  test('renders Phone button', () => {
    render(<SocialNetworks />);
    const phoneButton = screen.getByText('Зателефонувати');
    expect(phoneButton).toBeInTheDocument();
    expect(phoneButton).toHaveAttribute('href', 'tel:+380972373086');
    expect(phoneButton).toHaveAttribute('target', '_blank');
  });

  test('renders cat image', () => {
    render(<SocialNetworks />);
    const catImage = screen.getByAltText('cat');
    expect(catImage).toBeInTheDocument();
  });

  test('renders dog images', () => {
    render(<SocialNetworks />);
    const dogImage = screen.getAllByAltText('dog');
    expect(dogImage.length).toBe(2);
  });
});
