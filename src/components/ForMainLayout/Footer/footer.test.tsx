import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  it('renders without crashing', () => {
    render(<Footer />);
  });

  it('displays the logo', () => {
    const { getByAltText } = render(<Footer />);
    const logo = getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });

  it('displays the correct social media links', () => {
    const { getByText } = render(<Footer />);
    const instagramLink = getByText('Instagram');
    const telegramLink = getByText('Telegram');
    expect(instagramLink).toHaveAttribute(
      'href',
      'https://www.instagram.com/onegroom.ua?igsh=MWNra2Qwa3N1eGRlNA=='
    );
    expect(telegramLink).toHaveAttribute('href', '/');
  });

  it('displays the correct contact information', () => {
    const { getByText } = render(<Footer />);
    const addressLink = getByText('Київський шлях 127б/6, Boryspil');
    const phone1Link = getByText('+380 97 237 30 86');
    const phone2Link = getByText('+380 97 271 52 39');
    expect(addressLink).toHaveAttribute(
      'href',
      'https://maps.app.goo.gl/1gwjf3axpxft4zR18'
    );
    expect(phone1Link).toHaveAttribute('href', 'tel:+380972373086');
    expect(phone2Link).toHaveAttribute('href', 'tel:++380972715239');
  });

  it('displays the correct menu links', () => {
    const { getByText } = render(<Footer />);
    const homeLink = getByText('Головна');
    const groomingLink = getByText('Грумінг');
    const catalogLink = getByText('Магазин');
    const contactsLink = getByText('Контакти', { selector: 'a' });
    expect(homeLink).toHaveAttribute('href', '/');
    expect(groomingLink).toHaveAttribute('href', '/grooming');
    expect(catalogLink).toHaveAttribute('href', '/catalog');
    expect(contactsLink).toHaveAttribute('href', '/contacts');
  });

  it('displays the correct copyright text', () => {
    const { getByText } = render(<Footer />);
    const copyrightText = getByText(
      '©2024 onegroom, Inc. All rights reserved.'
    );
    expect(copyrightText).toBeInTheDocument();
  });
});
