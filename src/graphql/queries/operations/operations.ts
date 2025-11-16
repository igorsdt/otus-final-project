import { gql } from '@apollo/client';

const OPERATIONS = gql`
  query Query($input: OperationGetManyInput) {
    operations {
      getMany(input: $input) {
        data {
          ... on Profit {
            id
            name
            desc
            date
            createdAt
            updatedAt
            amount
            category {
              id
              name
              photo
              createdAt
              updatedAt
              commandId
            }
            type
            commandId
          }
          ... on Cost {
            id
            name
            desc
            date
            createdAt
            updatedAt
            amount
            category {
              id
              name
              photo
              createdAt
              updatedAt
              commandId
            }
            type
            commandId
          }
        }
        pagination {
          pageNumber
          pageSize
          total
        }
        sorting {
          field
          type
        }
      }
    }
  }
`;

export { OPERATIONS };
