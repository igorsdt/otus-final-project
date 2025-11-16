import { type UseFormRegisterReturn } from 'react-hook-form';

type Option = {
  id: string;
  name: string;
};

type SelectProps = {
  defaultValue?: string;
  error?: string;
  label: string;
  onChange: (id: string) => void;
  options: Option[];
  register?: UseFormRegisterReturn;
};

export type { Option,SelectProps };
