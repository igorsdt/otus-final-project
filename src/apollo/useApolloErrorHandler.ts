import { getFirstError, ServerErrors } from '@/errors';

const useApolloErrorHandler = () => {
  const handleQueryErrors = (error: any) => {
    if (error.graphQLErrors) {
      const serverErrors: ServerErrors = {
        errors: error.graphQLErrors.map((gqlError: any) => ({
          message: gqlError.message,
          extensions: {
            code: gqlError.extensions?.code || 'ERR_INTERNAL_SERVER',
            fieldName: gqlError.extensions?.fieldName || undefined,
          },
        })),
      };

      return getFirstError(serverErrors);
    }

    return [];
  };

  return { handleQueryErrors };
};

export { useApolloErrorHandler };
