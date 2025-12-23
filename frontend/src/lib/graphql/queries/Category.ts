import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      id
      title
      color
      description
      icon
      user {
        id
        name
      }
      detail {
        categoryId
        totalAmount
        transactionCount
      }
    }
    transactions {
      id
      description
      amount
      type
      date
      user {
        id
      }
    }
  }
`;
