import { CREATE_TRANSACTION } from "@/lib/graphql/mutations/Transaction";
import { GET_CATEGORIES } from "@/lib/graphql/queries/Category";
import { DASHBOARD_DETAILS } from "@/lib/graphql/queries/Dashboard";
import type { TypeTransaction } from "@/types";
import { useMutation } from "@apollo/client/react";

type TransactionModalMutationData = {
  createTransaction: {
    id: string;
  };
};

type TransactionModalInput = {
  amount: number;
  type: TypeTransaction;
  categoryId: string;
  date: Date;
  description?: string;
};

export const useTransactionModalController = () => {
  const [createTransaction] = useMutation<
    TransactionModalMutationData,
    { data: TransactionModalInput }
  >(CREATE_TRANSACTION, {
    refetchQueries: [{ query: DASHBOARD_DETAILS }, { query: GET_CATEGORIES }],
  });

  const handleCreateTransaction = async (input: TransactionModalInput) => {
    try {
      const { data } = await createTransaction({
        variables: { data: input },
      });

      if (data?.createTransaction) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error creating transaction:", error);
      return false;
    }
  };

  return { handleCreateTransaction };
};
