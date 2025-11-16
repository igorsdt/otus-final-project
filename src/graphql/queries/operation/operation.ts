import { gql } from '@apollo/client';

const OPERATION = gql`
 query Query($getOneId: ID!) {
  operations {
    getOne(id: $getOneId) {
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
  }
}
`;

export { OPERATION };
