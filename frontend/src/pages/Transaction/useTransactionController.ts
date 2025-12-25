import { DASHBOARD_DETAILS } from "@/lib/graphql/queries/Dashboard";
import type { Category, Transaction, TypeTransaction } from "@/types";
import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";

type TransactionFilter = {
  description?: string;
  type?: TypeTransaction | "";
  categoryId?: string;
  period?: string;
};

export const useTransactionController = () => {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[] | null
  >(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [filter, setFilter] = useState<TransactionFilter>({
    description: "",
    type: "",
    categoryId: "",
    period: "",
  }); // Initial filter state

  useEffect(() => {
    if (!transactions) return;

    let result: Transaction[] = transactions;

    if (filter.type) {
      result = result.filter((t) => t.type === filter.type);
    }

    if (filter.categoryId) {
      result = result.filter((t) => t.category?.id === filter.categoryId);
    }

    if (filter.description) {
      result = result.filter((t) =>
        t.description.toUpperCase()?.includes(filter.description!.toUpperCase())
      );
    }

    setFilteredTransactions(result);
  }, [filter, transactions]);

  const { data } = useQuery<{
    categories: Category[];
    transactions: Transaction[];
  }>(DASHBOARD_DETAILS);

  useEffect(() => {
    if (data?.transactions) {
      setTransactions(data.transactions);
    }
    if (data?.categories) {
      setCategories(data.categories);
    }
  }, [data]);

  useEffect(() => {
    console.log(`filter: ${JSON.stringify(filter, null, 2)}`);
  }, [filter]);

  return { categories, transactions: filteredTransactions, setFilter };
};
