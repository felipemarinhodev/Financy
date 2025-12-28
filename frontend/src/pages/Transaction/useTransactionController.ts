import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/Transaction";
import { GET_CATEGORIES } from "@/lib/graphql/queries/Category";
import { DASHBOARD_DETAILS } from "@/lib/graphql/queries/Dashboard";
import { TRANSACTIONS } from "@/lib/graphql/queries/Transaction";
import type { Category, Transaction, TypeTransaction } from "@/types";
import { dateFormatterMonth } from "@/utils/DateFormatter";
import { useMutation, useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";

type TransactionFilter = {
  description?: string;
  type?: TypeTransaction | "";
  categoryId?: string;
  period: Date | null;
};

type SelectOption = {
  label: string;
  value: string;
};

export const useTransactionController = () => {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[] | null
  >(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [listMonths, setListMonths] = useState<SelectOption[]>([]);
  const [filter, setFilter] = useState<TransactionFilter>({
    description: "",
    type: "",
    categoryId: "",
    period: null,
  });
  const [pagination, setPagination] = useState<{
    pages: number;
    limit: number;
    current: number;
    total: number;
  }>({ pages: 0, limit: 3, current: 0, total: 0 });

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

    if (filter.period) {
      const month = filter.period.getMonth();
      const year = filter.period.getFullYear();

      result = result.filter((t) => {
        const date = new Date(t.date);
        return date.getMonth() === month && date.getFullYear() === year;
      });
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
    transactionPeriods: { oldestDate: Date; newestDate: Date };
  }>(TRANSACTIONS);

  const [deleteTransaction] = useMutation<
    { deleteTransaction: boolean },
    { deleteTransactionId: string }
  >(DELETE_TRANSACTION, {
    refetchQueries: [{ query: DASHBOARD_DETAILS }, { query: GET_CATEGORIES }],
  });

  useEffect(() => {
    if (data?.transactions) {
      // setTransactions(data.transactions.slice(0, pagination.limit));
      setTransactions(data.transactions);
    }
    if (data?.categories) {
      setCategories(data.categories);
    }
    if (data?.transactionPeriods) {
      setListMonths(
        listOfMonthsBetweenDates(
          new Date(data.transactionPeriods.oldestDate),
          new Date(data.transactionPeriods.newestDate)
        )
      );
    }
  }, [data, pagination.limit]);

  // useEffect(() => {}, [filter]);

  return {
    categories,
    pagination,
    transactions: filteredTransactions,
    listMonths,
    deleteTransaction,
    setFilter,
  };
};

function listOfMonthsBetweenDates(
  startDate: Date,
  endDate: Date
): SelectOption[] {
  const months: SelectOption[] = [];
  const date = new Date(startDate);

  while (date <= endDate) {
    const month = dateFormatterMonth(date);
    const year = date.getFullYear();
    months.push({ label: `${month} / ${year}`, value: date.toISOString() });
    date.setMonth(date.getMonth() + 1);
  }

  return months;
}
