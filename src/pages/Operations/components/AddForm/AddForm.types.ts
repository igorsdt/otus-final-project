
type AddFormSendProps = {
  amount: number
  category: string
  commandId: string;
  created_at: string;
  createdAt:string
  date: string;
  desc: string;
  name: string;
  type: 'Cost' | 'Profit';
  updatedAt:string;
}

type AddFormProps = {
  closeFN: () => void;
}


export type { AddFormProps, AddFormSendProps };
