import { type InputHTMLAttributes } from 'react';

type InputType = 'email' | 'password' | 'text' | 'date';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  error?: null | string;
  label?: string;
  type?: InputType;
};

export type { InputProps, InputType };
