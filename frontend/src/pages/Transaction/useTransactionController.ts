import { DASHBOARD_DETAILS } from "@/lib/graphql/queries/Dashboard";
import { useCategory } from "@/stores/category";
import type { Category, Transaction } from "@/types";
import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";

export const useTransactionController = () => {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const { categories } = useCategory();

  const { data } = useQuery<{
    categories: Category[];
    transactions: Transaction[];
  }>(DASHBOARD_DETAILS);

  useEffect(() => {
    if (data?.transactions) {
      setTransactions(data.transactions);
    }
  }, [data]);

  return { categories, transactions };
};
