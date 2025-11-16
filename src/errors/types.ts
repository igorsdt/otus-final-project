enum ErrorCode {
  INCORRECT_EMAIL_OR_PASSWORD = 'INCORRECT_EMAIL_OR_PASSWORD', // Если не корректный email или пароль
  ACCOUNT_ALREADY_EXIST = 'ACCOUNT_ALREADY_EXIST', // При регистрации если пользователь уже существует
  FIELD_REQUIRED = 'FIELD_REQUIRED', // Обязательное поле. В ошибке будет дополнительное поле fieldName с указанием, какое конкретно поле обязательно
  INCORRECT_PASSWORD = 'INCORRECT_PASSWORD', // Некорректный старый пароль при попытке его изменить
  INVALID_PASSWORD = 'INVALID_PASSWORD', // Пароль не соответствует регулярному выражению /^[\w-@{}()#$%^&*+=!~]{8,}$/
  NOT_VALID = 'NOT_VALID', // Не валидный id сущности
  AUTH = 'AUTH', // Токен не передан, либо не прошел авторизацию
  NO_FILES = 'NO_FILES', // Ошибка при загрузке файлов
  NOT_ALLOWED = 'NOT_ALLOWED', // Нет доступа к данной операции (нельзя редактировать заказ другого пользователя)
  NOT_FOUND = 'NOT_FOUND', // Сущность не найдена
  VALIDATION_ERROR = 'VALIDATION_ERROR', // Не валидные данные, например, не указано name
  INTERNAL_SERVER = 'INTERNAL_SERVER', // Серверная ошибка. Обратитесь ко мне, этой ошибки быть не должно
}

type ServerError = {
  extensions: {
    code: ErrorCode;
    fieldName?: string;
    stacktrace: string;
  };
  name: string;
  message: string;
};

type ProcessedError = {
  code: ErrorCode;
  message: string;
  field?: string;
  original: ServerError;
};

type ServerErrors = {
  errors: ServerError[];
};

export { ErrorCode, type ServerError, type ServerErrors, type ProcessedError };
