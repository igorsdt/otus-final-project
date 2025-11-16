import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useAuth } from '@/stores/useAuth';
import { BackButton } from './BackButton';

// Добавляем полифиллы для TextEncoder/TextDecoder
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

// Мокаем только необходимые хуки
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock('@/stores/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('react-icons/fi', () => ({
  FiArrowLeft: () => <span>←</span>, // Упрощенная иконка для тестов
}));

describe('BackButton', () => {
  const mockNavigate = jest.fn();
  const mockLocation = { pathname: '/operations' };
  const mockUseAuth = { isAuth: true };

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue(mockLocation);
    (useAuth as jest.Mock).mockReturnValue(mockUseAuth);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('does not render when not authorized', () => {
    (useAuth as jest.Mock).mockReturnValueOnce({ isAuth: false });
    const { container } = render(<BackButton />);
    expect(container).toBeEmptyDOMElement();
  });

  it('navigates when history exists', () => {
    // История с одним элементом (как будто только зашли на страницу)
    jest.spyOn(React, 'useRef').mockReturnValue({
      current: ['/operations'], // Только текущий путь
    });

    render(<BackButton />);
    fireEvent.click(screen.getByText('Назад'));

    expect(mockNavigate).toHaveBeenCalledWith('/operations');
  });
});
