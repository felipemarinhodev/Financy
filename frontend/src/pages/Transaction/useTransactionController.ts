import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/Transaction";
import { DASHBOARD_DETAILS } from "@/lib/graphql/queries/Dashboard";
import type { Category, Transaction, TypeTransaction } from "@/types";
import { useMutation, useQuery } from "@apollo/client/react";
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
  });
  const [pagination, setPagination] = useState<{
    pages: number;
    limit: number;
    current: number;
    total: number;
  }>({ pages: 0, limit: 3, current: 1, total: 0 });

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

    setPagination((prev) => ({
      ...prev,
      total: result.length,
      pages: Math.ceil(result.length / prev.limit),
    }));

    setFilteredTransactions(result);
  }, [filter, transactions]);

  const { data } = useQuery<{
    categories: Category[];
    transactions: Transaction[];
  }>(DASHBOARD_DETAILS);

  const [deleteTransaction] = useMutation<
    { deleteTransaction: boolean },
    { deleteTransactionId: string }
  >(DELETE_TRANSACTION, {
    refetchQueries: [{ query: DASHBOARD_DETAILS }],
  });

  useEffect(() => {
    if (data?.transactions) {
      setTransactions(data.transactions.slice(0, pagination.limit));
    }
    if (data?.categories) {
      setCategories(data.categories);
    }
  }, [data]);

  // useEffect(() => {}, [filter]);

  return {
    categories,
    pagination,
    transactions: filteredTransactions,
    deleteTransaction,
    setFilter,
  };
};
