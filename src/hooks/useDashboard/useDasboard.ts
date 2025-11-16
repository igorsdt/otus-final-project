import { useQuery } from '@apollo/client';
import { OPERATIONS } from '@/graphql';
import { useDashboardType } from './useDashboard.types';

const useDashboard = (props:useDashboardType = {}) => {
  const { data, error, loading } = useQuery(OPERATIONS, {
    variables: {
      input: props,
    },
    fetchPolicy: 'network-only',
  });
  const operations =  data?.operations?.getMany?.data || [];
  return { operations, error, loading };
}

export { useDashboard };
