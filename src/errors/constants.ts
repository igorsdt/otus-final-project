import { ErrorCode } from './types';

const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ErrorCode.INCORRECT_EMAIL_OR_PASSWORD]: 'Неверный email или пароль',
  [ErrorCode.ACCOUNT_ALREADY_EXIST]: 'Аккаунт уже существует',
  [ErrorCode.FIELD_REQUIRED]: 'Обязательное поле',
  [ErrorCode.INCORRECT_PASSWORD]: 'Некорректный пароль',
  [ErrorCode.INVALID_PASSWORD]: 'Пароль должен содержать минимум 8 символов',
  [ErrorCode.NOT_VALID]: 'Не валидный id сущности',
  [ErrorCode.AUTH]: 'Ошибка авторизации',
  [ErrorCode.NO_FILES]: 'Файлы не загружены',
  [ErrorCode.NOT_ALLOWED]: 'Нет доступа к операции',
  [ErrorCode.NOT_FOUND]: 'Сущность не найдена',
  [ErrorCode.VALIDATION_ERROR]: 'Ошибка валидации',
  [ErrorCode.INTERNAL_SERVER]: 'Внутренняя ошибка сервера',
};

export { ERROR_MESSAGES };
