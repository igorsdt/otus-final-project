import { gql } from '@apollo/client';

const LOGIN = gql`
  mutation Profile($email: String!, $password: String!) {
    profile {
      signin(email: $email, password: $password) {
        profile {
          commandId
          email
          id
          name
          signUpDate
        }
        token
      }
    }
  }
`;

export { LOGIN };
