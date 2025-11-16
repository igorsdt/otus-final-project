import type { Category } from '@/types/Operation';

export type ItemProps = {
  /* id операции  */
  id: string;
  /* Название категории  */
  category?: Category;
  /* Описание  */
  desc?: string;
  /* Название */
  name: string;
  /* Сумма операции  */
  amount?: number;
  /* id команды  */
  commandId?: string;
  /* Фото  */
  photo?: string;
  /* Дата редактирования  */
  updatedAt?: string;
};
