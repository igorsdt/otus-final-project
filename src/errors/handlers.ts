import { ServerErrors, ProcessedError, ServerError } from './types';
import { ERROR_MESSAGES } from './constants';

/**
 * Основной обработчик ошибок сервера
 */
const handleServerErrors = (errors: ServerErrors): ProcessedError[] => {
  return errors.errors.map(processSingleError);
};

/**
 * Обрабатывает одну ошибку сервера
 */
const processSingleError = (error: ServerError): ProcessedError => {
  return {
    code: error.extensions.code,
    message: getErrorMessage(error),
    field: error.extensions.fieldName,
    original: error,
  };
};

/**
 * Получает сообщение об ошибке в порядке приоритета:
 * 1. Сообщение из ERROR_MESSAGES
 * 2. Стандартное message из ошибки
 * 3. Запасной вариант "Неизвестная ошибка"
 */
const getErrorMessage = (error: ServerError): string => {
  return ERROR_MESSAGES[error.extensions.code] || error.message || 'Неизвестная ошибка';
};

/**
 * Обработчик для react-hook-form
 */
const handleFormErrors = (
  errors: ServerErrors,
  setError: (field: string, error: { type: string; message: string }) => void,
): void => {
  handleServerErrors(errors).forEach(({ field, message }) => {
    if (field) {
      setError(field, {
        type: 'server',
        message: message,
      });
    }
  });
};

/**
 * Возвращает первую ошибку для показа в UI
 */
const getFirstError = (errors: ServerErrors): string => {
  if (!errors?.errors || errors.errors.length === 0) {
    return 'Неизвестная ошибка';
  }

  const firstError = errors.errors[0];
  return ERROR_MESSAGES[firstError.extensions.code] || firstError.message || 'Неизвестная ошибка';
};

export { handleServerErrors, processSingleError, getErrorMessage, handleFormErrors, getFirstError };
