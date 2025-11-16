import { useQuery } from '@apollo/client';
import { CATEGORIES } from '@/graphql';
import { useCategoriesTypes } from './useCategories.types';

const useCategories = (props: useCategoriesTypes = {}) => {
  const { data, error, loading } = useQuery(CATEGORIES, {
    variables: {
      input: props,
    },
    fetchPolicy: 'network-only',
  });
  const categories = data?.categories.getMany.data|| null;

  return {
    categories,
    error,
    loading
  }
}

export { useCategories };
