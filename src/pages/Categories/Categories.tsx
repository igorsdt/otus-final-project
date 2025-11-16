import { type FC, useEffect } from 'react';
import { Loader } from '@/ui';
import { Modal, Submenu } from '@/components';
import { List, CategoriesAddFrom } from './components';
import { useCategories, useModal } from '@/hooks';
import { useLayoutContext } from '@/serviсes/LayoutContext';

const Categories: FC = () => {
  const modal = useModal();
  const { categories, error, loading } = useCategories()
  const { setTitle, setActiveMenuTitle } = useLayoutContext();

  useEffect(() => {
    setTitle('Категории');
    setActiveMenuTitle('Категории');
  }, []);

  if (loading) return <Loader />;
  if (error) return <p>При запросе данных произошла ошибка: {error.message}</p>;

  return (
    <div>
      <Submenu onButtonClick={modal.show} />
      <List defaultItems={categories} />
      <Modal isVisible={modal.visible} onClose={modal.hide}>
        <CategoriesAddFrom closeFN={modal.hide} />
      </Modal>
    </div>
  );
};

export { Categories };
