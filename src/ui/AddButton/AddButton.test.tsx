import { render, screen, fireEvent } from '@testing-library/react';
import { AddButton } from '@/ui';

describe('AddButton', () => {
  it('renders button', () => {
    const handleClick = jest.fn();
    render(<AddButton onClick={handleClick} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<AddButton onClick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has correct className from css module', () => {
    const handleClick = jest.fn();
    render(<AddButton onClick={handleClick} />);
    const button = screen.getByRole('button');
    expect(button.className).toMatch(/button/);
  });
});
