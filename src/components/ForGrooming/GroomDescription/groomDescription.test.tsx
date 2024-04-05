import React from 'react';
import { render } from '@testing-library/react';
import GroomDescription from './GroomDescription';

describe('GroomDescription', () => {
  const careInfo = {
    id: 1,
    numberList: 1,
    name: 'Care 1',
    animalId: 1,
    description: 'Sample description',
  };

  it('renders without errors', () => {
    render(<GroomDescription careInfo={careInfo} />);
  });

  it('renders the correct title', () => {
    const { getByText } = render(<GroomDescription careInfo={careInfo} />);
    expect(getByText('Опис процедури')).toBeInTheDocument();
  });

  it('renders the correct description text', () => {
    const { getByText } = render(<GroomDescription careInfo={careInfo} />);
    expect(getByText('Sample description')).toBeInTheDocument();
  });

  it('renders the correct additional text', () => {
    const { getByText } = render(<GroomDescription careInfo={careInfo} />);
    expect(
      getByText(
        '*за агресію хвостика + 50% до прайсу чи майстер має право відмовити в проведенні послуги'
      )
    ).toBeInTheDocument();
  });
});