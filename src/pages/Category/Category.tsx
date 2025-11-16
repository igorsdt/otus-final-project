import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { Loader } from '@/ui';
import { Modal } from '@/components';
import { CATEGORY_ONE } from '@/graphql';
import { useModal } from '@/hooks';
import { ItemDetail, EditFormCategory } from './components';
import { FC, useEffect } from 'react';
import { useLayoutContext } from '@/serviсes/LayoutContext';

const Category: FC = () => {
  let params = useParams();
  const modal = useModal();
  const { data, error, loading } = useQuery(CATEGORY_ONE, {
    variables: {
      getOneId: params.id,
    },
    fetchPolicy: 'network-only',
  });
  const { setTitle, setActiveMenuTitle } = useLayoutContext();

  useEffect(() => {
    setActiveMenuTitle('Категории');
  }, [setActiveMenuTitle]);

  const categories = data?.categories.getOne || null;

  useEffect(() => {
    if(categories?.name) setTitle(categories?.name || 'Ошибка получения');
  }, [categories?.name, setTitle]);

  if (loading) return <Loader />;
  if (error) return <p>При запросе данных произошла ошибка: {error.message}</p>

  return (
    <div>
      <ItemDetail {...categories} onClick={modal.show} />
      <Modal isVisible={modal.visible} onClose={modal.hide}>
        <EditFormCategory {...categories} closeFN={modal.hide} />
      </Modal>
    </div>
  );
};

export { Category };
