type CategoriesAddFromSendProps = {
  commandId: string;
  created_at: string;
  id: string;
  name: string;
  photo?: string;
  updated_at: string;
};

type CategoriesAddFromProps = {
  closeFN: () => void;
};

export type { CategoriesAddFromProps, CategoriesAddFromSendProps };
