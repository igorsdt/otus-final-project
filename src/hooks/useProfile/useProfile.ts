import { useQuery } from '@apollo/client';
import { PROFILE } from '@/graphql';
import { useProfileTypes } from './useProfile.types';

const useProfile = (props: useProfileTypes = {}) => {
  const { data, error, loading } = useQuery(PROFILE, {
    variables: {
      input: props,
    },
    fetchPolicy: 'network-only',
  });
  const profile = data?.profile|| null;

  return {
    profile,
    error,
    loading
  }
};

export { useProfile };
