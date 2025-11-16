import { gql } from '@apollo/client';

const PROFILE = gql`
  query GetProfile {
    profile {
      id,
      name,
      email,
      commandId,
      signUpDate
    }
  }
`


export { PROFILE };
