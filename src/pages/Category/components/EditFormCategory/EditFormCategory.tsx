import { type SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useApolloErrorHandler } from '@/apollo/useApolloErrorHandler';
import { CATEGORY_PATCH } from '@/graphql';
import { useToast } from '@/serviсes/ToastContext';
import { Button, Input, Loader } from '@/ui';
import type { EditFormCategoryProps } from './EditFormCategory.types';
import styles from '@/styles/Form.module.css';
import { FC } from 'react';

const EditFormCategory: FC<EditFormCategoryProps> = (props: EditFormCategoryProps) => {
  const { show } = useToast();
  const { handleQueryErrors } = useApolloErrorHandler();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<EditFormCategoryProps>({
    defaultValues: {
      name: props.name || '',
      photo: props.photo || ''
    },
  });

  const [patch, { loading }] = useMutation(CATEGORY_PATCH);

  const submit: SubmitHandler<EditFormCategoryProps> = async (data) => {
    try {
      await patch({
        variables: {
          getOneId: null,
          patchId: props.id,
          input: {
            name: data.name,
            photo: data.photo,
          },
        },
      }).then(() => {
        props.closeFN();
      });
    } catch (error) {
      const processedErrors = handleQueryErrors(error);
      show(processedErrors, 'error');
    }
  };

  if (loading) return <Loader />;
  return (
    <form className={styles.form} onSubmit={handleSubmit(submit)}>
      <div className={styles.field}>
        <Input error={errors.name?.message} label={'Наименование'} {...register('name', {
          required: 'Не заполненное поле наименование'
        })} />
      </div>
      <div className={styles.field}>
        <Input label={'Фото'} {...register('photo')} />
      </div>
      <div className={styles.buttons}>
        <Button text="Закрыть" theme={'Outline'} type={'button'} onClick={() => props.closeFN()} />
        <Button text="Изменить" type={'submit'} />
      </div>
    </form>
  );
};

export { EditFormCategory, type EditFormCategoryProps };
