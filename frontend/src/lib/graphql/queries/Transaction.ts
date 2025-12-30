import { gql } from "@apollo/client";

export const TRANSACTIONS_DETAILS = gql`
  query getTransactionsDetails {
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

export const TRANSACTIONS = gql`
  query getTransactions($params: TransactionParamsInput) {
    getTransactions(params: $params) {
      pagination {
        totalItems
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
        category {
          id
          title
          color
          icon
        }
      }
    }
  }
`;
