import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/Transaction";
import { GET_CATEGORIES } from "@/lib/graphql/queries/Category";
import { DASHBOARD_DETAILS } from "@/lib/graphql/queries/Dashboard";
import { TRANSACTIONS } from "@/lib/graphql/queries/Transaction";
import type {
  Category,
  Transaction,
  Transactions,
  TypeTransaction,
} from "@/types";
import { dateFormatterMonth } from "@/utils/DateFormatter";
import { useMutation, useQuery } from "@apollo/client/react";
import { useEffect, useMemo, useState } from "react";

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
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[] | null
  >(null);
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

  const { data } = useQuery<{
    categories: Category[];
    getTransactions: Transactions;
    transactionPeriods: { oldestDate: Date; newestDate: Date };
  }>(TRANSACTIONS);

  const [deleteTransaction] = useMutation<
    { deleteTransaction: boolean },
    { deleteTransactionId: string }
  >(DELETE_TRANSACTION, {
    refetchQueries: [{ query: DASHBOARD_DETAILS }, { query: GET_CATEGORIES }],
  });

  const transactions = useMemo(
    () => data?.getTransactions?.transactions ?? null,
    [data?.getTransactions?.transactions]
  );

  const categories = useMemo(
    () => data?.categories ?? null,
    [data?.categories]
  );

  const listMonths = useMemo(() => {
    if (!data?.transactionPeriods) return [];
    const { oldestDate, newestDate } = data.transactionPeriods;

    return listOfMonthsBetweenDates(new Date(oldestDate), new Date(newestDate));
  }, [data?.transactionPeriods]);

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

    // setPagination((prev) => ({
    //   ...prev,
    //   total: result.length,
    //   pages: Math.ceil(result.length / prev.limit),
    // }));

    setFilteredTransactions(result);
  }, [filter, transactions]);

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
