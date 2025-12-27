import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($data: CreateTransactionInput!) {
    createTransaction(data: $data) {
      id
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($deleteTransactionId: String!) {
    deleteTransaction(id: $deleteTransactionId)
  }
`;
