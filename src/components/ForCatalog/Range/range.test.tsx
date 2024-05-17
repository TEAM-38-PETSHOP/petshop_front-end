import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Range from './Range';

describe('Range Component', () => {
  it('renders the default text', () => {
    const { getByText } = render(
      <Range
        minValue={0}
        setMinValue={() => {}}
        maxValue={100}
        setMaxValue={() => {}}
        step={1}
        min={0}
        max={100}
      />
    );
    expect(getByText('Ціна, грн')).toBeInTheDocument();
  });

  it('updates min and max values on input change', () => {
    const setMinValueMock = jest.fn();
    const setMaxValueMock = jest.fn();
    const { getByText } = render(
      <Range
        minValue={0}
        setMinValue={setMinValueMock}
        maxValue={100}
        setMaxValue={setMaxValueMock}
        step={1}
        min={0}
        max={100}
      />
    );

    const minInput = getByText('Від') as HTMLInputElement;
    const maxInput = getByText('До') as HTMLInputElement;

    expect(minInput).toBeInTheDocument();
    expect(maxInput).toBeInTheDocument();
  });

  it('updates input values on range input change', () => {
    const setMinValueMock = jest.fn();
    const setMaxValueMock = jest.fn();
  
    const { getByTestId } = render(
      <Range
        minValue={0}
        setMinValue={setMinValueMock}
        maxValue={100}
        setMaxValue={setMaxValueMock}
        step={1}
        min={0}
        max={100}
      />
    );
  
    const minRangeInput = getByTestId('minPrice');
    const maxRangeInput = getByTestId('maxPrice');
  
    fireEvent.change(minRangeInput, { target: { value: '30' } });
    fireEvent.change(maxRangeInput, { target: { value: '70' } });
  
    expect(setMinValueMock).toHaveBeenCalledWith(30);
    expect(setMaxValueMock).toHaveBeenCalledWith(70);
  });

  it('updates range progress bar based on min and max values', () => {
    const { getByTestId } = render(
      <Range
        minValue={20}
        setMinValue={() => {}}
        maxValue={80}
        setMaxValue={() => {}}
        step={1}
        min={0}
        max={100}
      />
    );

    const rangeProgress = getByTestId('range-progress');

    expect(rangeProgress).toHaveStyle('left: 20%');
    expect(rangeProgress).toHaveStyle('right: 20%');
  });
});
