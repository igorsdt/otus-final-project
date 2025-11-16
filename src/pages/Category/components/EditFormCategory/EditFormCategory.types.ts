import { type Moment } from 'moment';

type EditFormCategoryProps = {
  amount?: number;
  closeFN: () => void;
  date?: Moment;
  desc?: string;
  id: string;
  name?: string;
  photo?: string;
};

export type { EditFormCategoryProps };
