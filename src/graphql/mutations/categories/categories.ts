import { gql } from '@apollo/client';

const CATEGORY_ADD = gql`
mutation Add($addInput2: CategoryAddInput!) {
  categories {
    add(input: $addInput2) {
      id
      name
      photo
      createdAt
      updatedAt
      commandId
    }
  }
}
`
const CATEGORY_PATCH = gql`
mutation Mutation($patchId: ID!, $input: CategoryUpdateInput!) {
  categories {
    patch(id: $patchId, input: $input) {
      id
      name
      photo
      createdAt
      updatedAt
      commandId
    }
  }
}
`

export { CATEGORY_ADD, CATEGORY_PATCH }
