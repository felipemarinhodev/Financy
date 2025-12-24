import { DASHBOARD_DETAILS } from "@/lib/graphql/queries/Dashboard";
import { useCategory } from "@/stores/category";
import type { BalanceTransactions, Transaction } from "@/types";
import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";

export const useDashboardController = () => {
  const { categories } = useCategory((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balanceTransactions, setBalanceTransactions] =
    useState<BalanceTransactions | null>(null);

  const { data, loading } = useQuery<{
    balanceTransactions: BalanceTransactions;
    transactions: Transaction[];
  }>(DASHBOARD_DETAILS);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (data?.transactions) {
      setTransactions(data.transactions);
    }
    if (data?.balanceTransactions) {
      setBalanceTransactions(data.balanceTransactions);
    }
  }, [data]);

  return { isLoading, balanceTransactions, categories, transactions };
};
