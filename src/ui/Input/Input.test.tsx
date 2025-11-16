import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input, type InputProps } from './Input';

// Мокаем иконки, так как они не критичны для тестирования
jest.mock('react-icons/fi', () => ({
  FiEye: () => <span>FiEye</span>,
  FiEyeOff: () => <span>FiEyeOff</span>,
}));

describe('Input Component', () => {
  const defaultProps: InputProps = {
    type: 'text',
    value: '',
    onChange: jest.fn(),
    placeholder: 'Enter text',
  };

  // Базовые snapshot-тесты
  it('renders correctly with minimal props', () => {
    const { asFragment } = render(<Input {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with label', () => {
    const { asFragment } = render(<Input {...defaultProps} label="Test Label" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with error', () => {
    const { asFragment } = render(<Input {...defaultProps} error="Test error" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders password Input correctly', () => {
    const { asFragment } = render(<Input {...defaultProps} type="password" />);
    expect(asFragment()).toMatchSnapshot();
  });

  // Тесты функциональности
  it('displays label when provided', () => {
    render(<Input {...defaultProps} label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    render(<Input {...defaultProps} error="Test error" />);
    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('error');
  });

  it('calls onChange when Input value changes', async () => {
    const handleChange = jest.fn();
    render(<Input {...defaultProps} onChange={handleChange} />);
    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'test');
    const CALLED_TIMES = 4;
    expect(handleChange).toHaveBeenCalledTimes(CALLED_TIMES);
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input {...defaultProps} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  // Тесты для password Input
  describe('Password Input', () => {
    it('shows password toggle Button', () => {
      render(<Input {...defaultProps} type="password" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('toggles password visibility', async () => {
      render(<Input {...defaultProps} type="password" />);
      const button = screen.getByRole('button');

      // Находим Input по placeholder или другому атрибуту
      const input = screen.getByPlaceholderText('Enter text');

      // По умолчанию пароль скрыт
      expect(input).toHaveAttribute('type', 'password');
      expect(screen.getByText('FiEye')).toBeInTheDocument();

      // Клик для показа пароля
      await userEvent.click(button);
      expect(input).toHaveAttribute('type', 'text');
      expect(screen.getByText('FiEyeOff')).toBeInTheDocument();

      // Клик для скрытия пароля
      await userEvent.click(button);
      expect(input).toHaveAttribute('type', 'password');
      expect(screen.getByText('FiEye')).toBeInTheDocument();
    });

    it('has proper aria-labels for toggle Button', () => {
      render(<Input {...defaultProps} type="password" />);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-label', 'Показать пароль');

      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-label', 'Скрыть пароль');
    });
  });

  describe('Input Types', () => {
    it('renders text Input by default', () => {
      render(<Input {...defaultProps} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    });

    it('renders email Input correctly', () => {
      render(<Input {...defaultProps} type="email" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    });
  });
});
