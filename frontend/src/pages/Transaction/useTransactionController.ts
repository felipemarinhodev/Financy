import { DASHBOARD_DETAILS } from "@/lib/graphql/queries/Dashboard";
import type { Category, Transaction } from "@/types";
import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";

export const useTransactionController = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  const { data } = useQuery<{
    categories: Category[];
    transactions: Transaction[];
  }>(DASHBOARD_DETAILS);

  useEffect(() => {
    if (data?.categories) {
      setCategories(data.categories);
    }
    if (data?.transactions) {
      setTransactions(data.transactions);
    }
  }, [data]);

  return { categories, transactions };
};
