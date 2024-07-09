import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal Component', () => {
  it('renders modal with title and children', () => {
    const { getByText, getByTestId } = render(
      <Modal title="Test Modal" onClose={() => {}}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );

    expect(getByText('Test Modal')).toBeInTheDocument();
    expect(getByTestId('modal-content')).toBeInTheDocument();
  });

  it('calls onClose when clicking close button', () => {
    const onCloseMock = jest.fn();
    const { getByTestId } = render(
      <Modal title="Test Modal" onClose={onCloseMock}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );

    fireEvent.click(getByTestId('modal-close'));
    expect(onCloseMock).toHaveBeenCalled();
  });
});
