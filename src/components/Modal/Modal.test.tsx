import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  it('does not render when isVisible is false', () => {
    render(
      <Modal isVisible={false} onClose={jest.fn()}>
        <div>Содержимое</div>
      </Modal>
    );
    // Модалка не должна быть в DOM
    expect(screen.queryByText('Содержимое')).not.toBeInTheDocument();
  });

  it('renders children when isVisible is true', () => {
    render(
      <Modal isVisible={true} onClose={jest.fn()}>
        <div>Содержимое</div>
      </Modal>
    );
    expect(screen.getByText('Содержимое')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = jest.fn();
    render(
      <Modal isVisible={true} onClose={onClose}>
        <div>modal</div>
      </Modal>
    );
    const closeBtn = screen.getByRole('button');
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', () => {
    const onClose = jest.fn();
    render(
      <Modal isVisible={true} onClose={onClose}>
        <div>modal</div>
      </Modal>
    );
    const overlay = document.querySelector(`.overlay`) as HTMLElement;
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });

  it('renders close icon', () => {
    render(
      <Modal isVisible={true} onClose={jest.fn()}>
        <div>icon</div>
      </Modal>
    );
    // SVG должен быть внутри кнопки
    const button = screen.getByRole('button');
    expect(button.querySelector('svg')).toBeInTheDocument();
  });
});
