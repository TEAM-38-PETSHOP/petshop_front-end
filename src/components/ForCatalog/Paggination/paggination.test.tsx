import React from 'react';
import { render } from '@testing-library/react';
import Paggination from './Paggination';

describe('Paggination Component', () => {
  it('renders paggination with correct amount of pages', () => {
    const { getAllByRole } = render(
      <Paggination pageIndex={0} amount={5} />
    );

    const paginationButtons = getAllByRole('button');
    expect(paginationButtons.length).toBe(7);
  });
});
