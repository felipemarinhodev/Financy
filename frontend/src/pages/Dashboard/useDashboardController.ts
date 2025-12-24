import { DASHBOARD_DETAILS } from "@/lib/graphql/queries/Dashboard";
import type { BalanceTransactions, Category, Transaction } from "@/types";
import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";

export const useDashboardController = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balanceTransactions, setBalanceTransactions] = useState<BalanceTransactions | null>(null);

  const { data, loading } = useQuery<{
    balanceTransactions: BalanceTransactions;
    categories: Category[];
    transactions: Transaction[];
  }>(DASHBOARD_DETAILS);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (data?.categories) {
      setCategories(data.categories);
    }
    if (data?.transactions) {
      setTransactions(data.transactions);
    }
    if (data?.balanceTransactions) {
      setBalanceTransactions(data.balanceTransactions);
    }

  }, [data]);

  return { isLoading,balanceTransactions, categories, transactions };
};
