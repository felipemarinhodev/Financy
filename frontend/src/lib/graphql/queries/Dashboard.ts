import { gql } from "@apollo/client";

export const DASHBOARD_DETAILS = gql`
  query getDashboardDetails {
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
    getTransactions {
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
    balanceTransactions {
      income
      expense
      balance
    }
  }
`;
