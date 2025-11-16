import type { Operation } from '@/types/Operation';

type DetailProps = Operation & {
  /* Недоступно редактирование  */
  disabled?: boolean;
  /* Событие редактирования операции */
  onClick: () => void;
  /* Фото */
  photo?: string;
  /* id команды  */
  commandId?: string;
  /* Дата редактирования */
  updatedAt?: string;
  /* Дата */
  date?: string;
};

export type { DetailProps };
