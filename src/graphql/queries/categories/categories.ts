import { gql } from '@apollo/client';

const CATEGORIES = gql`
query GetMany($getManyInput2: CategoryGetManyInput) {
  categories {
    getMany(input: $getManyInput2) {
      data {
        id
        name
        photo
        createdAt
        updatedAt
        commandId
      }
      pagination {
        pageSize
        pageNumber
        total
      }
      sorting {
        type
        field
      }
    }
  }
}
`

const CATEGORY_ONE = gql`
query GetOne($getOneId: ID!) {
  categories {
    getOne(id: $getOneId) {
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

export { CATEGORIES, CATEGORY_ONE };
