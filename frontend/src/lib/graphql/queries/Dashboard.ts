import { gql } from "@apollo/client";

export const DASHBOARD_DETAILS = gql`
  query getDashboardDetails {
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
    balanceTransactions {
      income
      expense
      balance
    }
  }
`;
