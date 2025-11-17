import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Button } from '@/ui';

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe('Button', () => {
  it('renders as a button by default', () => {
    renderWithRouter(<Button text="Кнопка" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Кнопка');
  });

  it('calls onClick when enabled', () => {
    const handleClick = jest.fn();
    renderWithRouter(<Button text="Клик" onClick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    renderWithRouter(<Button text="Клик" disabled onClick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('renders with theme "Primary"', () => {
    renderWithRouter(<Button text="Primary" theme="Primary" />);
    expect(screen.getByRole('button')).toHaveTextContent('Primary');
  });

  it('renders with theme "Secondary"', () => {
    renderWithRouter(<Button text="Secondary" theme="Secondary" />);
    expect(screen.getByRole('button')).toHaveTextContent('Secondary');
  });

  it('renders as a link when href is set', () => {
    renderWithRouter(<Button text="Ссылка" href="/route" />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/route');
    expect(link).toHaveTextContent('Ссылка');
  });

  it('uses correct type for button', () => {
    renderWithRouter(<Button text="Submit" type="submit" />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });
});
