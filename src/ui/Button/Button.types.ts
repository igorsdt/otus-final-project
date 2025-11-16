export type ButtonProps = {
  /* Тема кнопки */
  theme?: 'Primary' | 'Secondary' | 'Outline' | 'Ghost';
  /* Недоступное состояние кнопки  */
  disabled?: boolean;
  /* Событие нажатия */
  onClick?: () => void;
  /* Текст кнопки */
  text: string;
  /* Если кнопка является ссылкой */
  href?: string;
  /* Тип кнопки */
  type?: 'button' | 'submit';
};
