import { CREATE_TRANSACTION } from "@/lib/graphql/mutations/Transaction";
import { DASHBOARD_DETAILS } from "@/lib/graphql/queries/Dashboard";
import { useMutation } from "@apollo/client/react";

type CreateTransactionMutationData = {
  createTransaction: {
    id: string;
  };
};

type CreateTransactionInput = {
  amount: number;
  type: "income" | "expense";
  categoryId: string;
  date: string;
  description?: string;
};

export const useNewTransctionController = () => {
  const [createTransaction] = useMutation<
    CreateTransactionMutationData,
    { data: CreateTransactionInput }
  >(CREATE_TRANSACTION, {
    refetchQueries: [{ query: DASHBOARD_DETAILS }],
  });

  const handleCreateTransaction = async (input: CreateTransactionInput) => {
    try {
      const { data } = await createTransaction({
        variables: { data: input },
      });

      if (data?.createTransaction) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  return { handleCreateTransaction };
};
