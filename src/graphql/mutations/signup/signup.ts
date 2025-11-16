import { gql } from '@apollo/client';

const SIGN_UP = gql`
  mutation Mutation($email: String!, $password: String!, $commandId: String!) {
    profile {
      signup(email: $email, password: $password, commandId: $commandId) {
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

export { SIGN_UP };
