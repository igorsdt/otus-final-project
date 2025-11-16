import { type FC, useEffect } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { Loader } from '@/ui';
import { Modal } from '@/components';
import { OPERATION } from '@/graphql';
import { useModal } from '@/hooks';
import { ItemDetail, EditFormOperation } from './components';
import { useLayoutContext } from '@/serviсes/LayoutContext';

const Operation: FC = () => {
  let params = useParams();
  const modal = useModal();
  const { data, error, loading } = useQuery(OPERATION, {
    variables: {
      getOneId: params.id,
    },
    fetchPolicy: 'network-only',
  });
  const { setTitle, setActiveMenuTitle } = useLayoutContext();

  useEffect(() => {
    setActiveMenuTitle('Операции');
  }, [setActiveMenuTitle]);

  const operation = data?.operations.getOne || null;

  useEffect(() => {
    if(operation?.name) setTitle(operation?.name || 'Ошибка получения');
  }, [operation?.name, setTitle]);

  if (loading) return <Loader />;
  if (error) return <p>При запросе данных произошла ошибка: {error.message}</p>;

  return (
    <div>
      <ItemDetail {...operation} onClick={modal.show} />
      <Modal isVisible={modal.visible} onClose={modal.hide}>
        <EditFormOperation {...operation} closeFN={modal.hide} />
      </Modal>
    </div>
  );
};

export { Operation };
