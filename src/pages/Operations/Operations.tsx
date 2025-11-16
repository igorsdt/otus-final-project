import { FC, useEffect } from 'react';
import { Loader } from '@/ui';
import { Modal, Submenu } from '@/components';
import { List, AddForm } from './components';
import { useDashboard, useModal } from '@/hooks';
import { useLayoutContext } from '@/serviсes/LayoutContext';

const Operations: FC = () => {
  const modal = useModal();
  const { error, loading, operations } = useDashboard();
  const { setTitle, setActiveMenuTitle } = useLayoutContext();

  useEffect(() => {
    setTitle('Операции');
    setActiveMenuTitle('Операции');
  }, [setTitle, setActiveMenuTitle]);

  if (loading) return <Loader />;
  if (error) return <p>При запросе данных произошла ошибка: {error.message}</p>;

  return (
    <div>
      <Submenu onButtonClick={modal.show} />
      <List defaultItems={operations} />
      <Modal isVisible={modal.visible} onClose={modal.hide}>
        <AddForm closeFN={modal.hide} />
      </Modal>
    </div>
  );
};

export { Operations };
