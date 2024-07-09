import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FiltersGroup from './FiltersGroup';

describe('FiltersGroup Component', () => {
  it('renders with default title', () => {
    const { getByText } = render(<FiltersGroup isOpen={false} setIsOpen={() => {}}><div>Child Component</div></FiltersGroup>);
    expect(getByText('Фільтри')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    const { getByText } = render(<FiltersGroup title="Custom Title" isOpen={false} setIsOpen={() => {}}><div>Child Component</div></FiltersGroup>);
    expect(getByText('Custom Title')).toBeInTheDocument();
  });

  it('opens when button is clicked', () => {
    const setIsOpenMock = jest.fn();
    const { getByText } = render(<FiltersGroup isOpen={false} setIsOpen={setIsOpenMock}><div>Child Component</div></FiltersGroup>);
    fireEvent.click(getByText('Фільтри'));
    expect(setIsOpenMock).toHaveBeenCalledWith(true);
  });

  it('closes when button is clicked again', () => {
    const setIsOpenMock = jest.fn();
    const { getByText } = render(<FiltersGroup isOpen={true} setIsOpen={setIsOpenMock}><div>Child Component</div></FiltersGroup>);
    fireEvent.click(getByText('Фільтри'));
    expect(setIsOpenMock).toHaveBeenCalledWith(false);
  });

  it('renders children when open', () => {
    const { getByText } = render(
      <FiltersGroup isOpen={true} setIsOpen={() => {}}>
        <div>Child Component</div>
      </FiltersGroup>
    );
    expect(getByText('Child Component')).toBeInTheDocument();
  });
});
