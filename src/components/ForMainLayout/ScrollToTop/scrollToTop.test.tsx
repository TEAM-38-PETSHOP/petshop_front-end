import { render, fireEvent } from '@testing-library/react';
import ScrollToTop from './ScrollToTop';
import Arrow from '../../Arrow/Arrow';

jest.mock('../Arrow/Arrow', () => {
  return jest.fn(() => null);
});

describe('ScrollToTop component', () => {
  test('does not render Arrow component when not scrolled', () => {
    render(<ScrollToTop />);
    expect(Arrow).not.toHaveBeenCalled();
  });

  test('renders Arrow component when scrolled down', () => {
    render(<ScrollToTop />);
    expect(Arrow).not.toHaveBeenCalled();
    fireEvent.scroll(window, { target: { scrollY: 600 } });
    expect(Arrow).toHaveBeenCalled();
  });
});
