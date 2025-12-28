import { DASHBOARD_DETAILS } from "@/lib/graphql/queries/Dashboard";
import type {
  BalanceTransactions,
  Category,
  Transaction,
  Transactions,
} from "@/types";
import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";

export const useDashboardController = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [balanceTransactions, setBalanceTransactions] =
    useState<BalanceTransactions | null>(null);

  const { data, loading } = useQuery<{
    balanceTransactions: BalanceTransactions;
    getTransactions: Transactions;
    categories: Category[];
  }>(DASHBOARD_DETAILS);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (data?.getTransactions && data.getTransactions.transactions) {
      setTransactions(data.getTransactions.transactions);
    }
    if (data?.categories) {
      setCategories(data.categories);
    }
    if (data?.balanceTransactions) {
      setBalanceTransactions(data.balanceTransactions);
    }
  }, [data]);

  return { isLoading, balanceTransactions, categories, transactions };
};
