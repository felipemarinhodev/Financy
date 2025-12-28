import { gql } from "@apollo/client";

export const TRANSACTIONS = gql`
  query getTransactionsDetails {
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
    transactionPeriods {
      oldestDate
      newestDate
    }
  }
`;
