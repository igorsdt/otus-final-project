import { type Moment } from 'moment';
import { type EditFormCategoryProps } from '@/pages/Category/components';

type EditFormOperationProps = {
  amount?: number;
  category: EditFormCategoryProps;
  closeFN: () => void;
  date?: Moment;
  desc?: string;
  id: string;
  name?: string;
};

export type { EditFormOperationProps };
