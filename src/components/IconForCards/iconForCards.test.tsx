import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import styles from './iconForCards.module.scss';
import IconForCards from './IconForCards';

describe('IconForCards component', () => {
  test('renders with the correct icon', () => {
    const iconSrc = 'path/to/icon.svg';
    const { getByTestId } = render(
      <IconForCards
        icon={iconSrc}
        handler={() => {}}
      />
    );
    const iconElement = getByTestId('icon-for-cards').querySelector('img');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute('src', iconSrc);
  });

  test('calls handler function when clicked', () => {
    const handler = jest.fn();
    const { getByTestId } = render(
      <IconForCards
        icon="path/to/icon.svg"
        handler={handler}
      />
    );
    const iconButton = getByTestId('icon-for-cards');
    fireEvent.click(iconButton);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('applies additional class name when provided', () => {
    const customClassName = 'custom-class';
    const { getByTestId } = render(
      <IconForCards
        icon="path/to/icon.svg"
        handler={() => {}}
        className={customClassName}
      />
    );
    const iconButton = getByTestId('icon-for-cards');
    expect(iconButton).toHaveClass(customClassName);
  });

  test('adds "active" class when isActive prop is true', () => {
    const { getByTestId } = render(
      <IconForCards
        handler={() => {}}
        icon="path/to/icon.svg"
        isFavorite
        isActive
      />
    );
    const iconButton = getByTestId('icon-for-cards');
    expect(iconButton).toHaveClass(styles.iconForCards__favoriteActive);
  });

  test('adds "favorite" class when isFavorite prop is true', () => {
    const { getByTestId } = render(
      <IconForCards
        handler={() => {}}
        icon="path/to/icon.svg"
        isFavorite
      />
    );
    const iconButton = getByTestId('icon-for-cards');
    expect(iconButton).toHaveClass(styles.iconForCards__favorite);
  });
});
