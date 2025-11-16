import { gql } from '@apollo/client';

const OPERATION_PATCH = gql`
mutation Patch($patchId: ID!, $input: OperationUpdateInput!) {
  operations {
    patch(id: $patchId, input: $input) {
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

`

const OPERATION_ADD = gql`
mutation Mutation($input: OperationAddInput!) {
  operations {
    add(input: $input) {
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
`


export { OPERATION_ADD,OPERATION_PATCH }
