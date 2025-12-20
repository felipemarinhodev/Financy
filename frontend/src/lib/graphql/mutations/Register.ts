import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      user {
        id
        name
        email
      }
      token
      refreshToken
    }
  }
`;