import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useApolloErrorHandler } from '@/apollo/useApolloErrorHandler';
import { CATEGORY_ADD } from '@/graphql/mutations';
import { useToast } from '@/serviсes/ToastContext';
import { Button, Input, Loader } from '@/ui';
import type { CategoriesAddFromProps, CategoriesAddFromSendProps } from './CategoriesAddFrom.types';
import styles from '@/styles/Form.module.css';

const CategoriesAddFrom: FC<CategoriesAddFromProps> = ({ closeFN }) => {
  const { show } = useToast();
  const { handleQueryErrors } = useApolloErrorHandler();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CategoriesAddFromSendProps>({
    defaultValues: {
      name: '',
      photo: '',
    },
  });

  const [patch, { loading }] = useMutation(CATEGORY_ADD);

  const submit: SubmitHandler<CategoriesAddFromSendProps> = async (data) => {
    try {
      const formData = {
        variables: {
          addInput2: {
            name: data.name,
            photo: data.photo,
          },
        },
      }
      await patch(formData);
      location.reload();
    } catch (error) {
      const processedErrors = handleQueryErrors(error);
      show(processedErrors, 'error');
    }
  };

  if (loading) return <Loader />;
  return (
    <form className={styles.form} onSubmit={handleSubmit(submit)}>
      <div className={styles.field}>
        <Input error={errors.name?.message} label="Наименование" {...register('name', {
          required: 'Не заполнено поле'
        })} />
      </div>
      <div className={styles.field}>
        <Input label="Фото" {...register('photo')} />
      </div>
      <div className={styles.buttons}>
        <Button text="Закрыть" theme={'Outline'} type={'button'} onClick={() => closeFN()} />
        <Button text="Добавить" type={'submit'} />
      </div>
    </form>
  );
};

export { CategoriesAddFrom, type CategoriesAddFromProps };
