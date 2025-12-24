import { gql } from "@apollo/client";

export const TRANSACTIONS = gql`
  transactions {
      id
      description
      amount
      type
      date
      user {
        id
      }
      category {
        id
        title
        color
        icon
      }
    }
    categories {
      id
      title
      color
      description
      icon
    }
`;