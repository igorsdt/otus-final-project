type Category = {
  id: string;
  name: string;
  photo?: string;
};

type Cost = {
  type: 'Cost';
};

type Profit = {
  type: 'Profit';
};

type OperationData = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
};

type Operation = (OperationData & Profit) | (OperationData & Cost);

export type { Operation, Category };
