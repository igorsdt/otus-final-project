import { render, screen, fireEvent } from '@testing-library/react';
import { Toast } from '@/ui';

describe('Toast', () => {
  it('renders message and close button', () => {
    render(
      <Toast
        message="Уведомление"
        type="success"
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText('Уведомление')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders correct icon for type=error', () => {
    render(
      <Toast
        message="Ошибка"
        type="error"
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText('Ошибка').previousSibling?.nodeName).toBe('svg');
  });

  it('calls onClose when close button clicked', () => {
    const handleClose = jest.fn();
    render(
      <Toast
        message="Клик"
        type="info"
        onClose={handleClose}
      />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose automatically after timeout', () => {
    jest.useFakeTimers();
    const handleClose = jest.fn();
    render(
      <Toast
        message="Авто-скрытие"
        type="info"
        onClose={handleClose}
      />
    );
    jest.advanceTimersByTime(5000);
    expect(handleClose).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it('applies correct classes by type', () => {
    render(
      <Toast
        message="Классы"
        type="success"
        onClose={() => {}}
      />
    );
    const toast = screen.getByText('Классы').closest('.success');
    expect(toast?.className).toMatch(/success/);
  });
});
