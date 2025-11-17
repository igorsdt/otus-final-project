import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonWithIcon } from './ButtonWithIcon';

describe('ButtonWithIcon', () => {
  it('renders button', () => {
    const handleClick = jest.fn();
    render(<ButtonWithIcon onClick={handleClick} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<ButtonWithIcon onClick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders icon inside button', () => {
    render(<ButtonWithIcon onClick={() => {}} />);
    const button = screen.getByRole('button');
    // Проверяем есть ли svg-иконка внутри кнопки
    expect(button.querySelector('svg')).toBeInTheDocument();
  });
});
