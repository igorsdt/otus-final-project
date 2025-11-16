import { fireEvent, render, screen } from '@testing-library/react';
import { TextEncoder, TextDecoder } from 'util';
import { Button, type ButtonProps } from '@/ui';

global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;

describe('Button Component', () => {
  const defaultProps: ButtonProps = {
    text: 'Click me',
    onClick: jest.fn(),
  };

  it('matches snapshot (testing-library)', () => {
    const { asFragment } = render(<Button {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches disabled snapshot', () => {
    const { asFragment } = render(<Button {...defaultProps} disabled />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches primary snapshot', () => {
    const { asFragment } = render(<Button {...defaultProps} theme="Primary" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders Button with correct text', () => {
    render(<Button {...defaultProps} />);
    expect(screen.getByText(defaultProps.text)).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    render(<Button {...defaultProps} />);
    fireEvent.click(screen.getByText(defaultProps.text));
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('has default type "Button"', () => {
    render(<Button {...defaultProps} />);
    expect(screen.getByText(defaultProps.text)).toHaveAttribute('type', 'button');
  });

  it('applies correct type attribute when provided', () => {
    const type = 'submit';
    render(<Button {...defaultProps} type={type} />);
    expect(screen.getByText(defaultProps.text)).toHaveAttribute('type', type);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button {...defaultProps} disabled={true} />);
    const button = screen.getByText(defaultProps.text);
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('disabled');
    expect(button).toHaveClass('disabled');
  });

  it('does not call onClick when disabled', () => {
    const onClick = jest.fn();
    render(<Button {...defaultProps} disabled={true} onClick={onClick} />);
    const button = screen.getByText(defaultProps.text);

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  describe('CSS Classes', () => {
    it('has default Button class', () => {
      render(<Button {...defaultProps} />);
      const button = screen.getByText(defaultProps.text);
      expect(button).toHaveClass('button');
    });

    it('has disabled class when disabled', () => {
      render(<Button {...defaultProps} disabled={true} />);
      const button = screen.getByText(defaultProps.text);
      expect(button).toHaveClass('disabled');
    });

    it('has primary class when color is Primary', () => {
      render(<Button {...defaultProps} theme="Primary" />);
      const button = screen.getByText(defaultProps.text);
      expect(button).toHaveClass('Primary');
    });

    it('has secondary class when color is Secondary', () => {
      render(<Button {...defaultProps} theme="Secondary" />);
      const button = screen.getByText(defaultProps.text);
      expect(button).toHaveClass('Secondary');
    });
  });
});
