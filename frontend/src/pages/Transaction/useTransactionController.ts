import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/Transaction";
import { GET_CATEGORIES } from "@/lib/graphql/queries/Category";
import { DASHBOARD_DETAILS } from "@/lib/graphql/queries/Dashboard";
import {
  TRANSACTIONS,
  TRANSACTIONS_DETAILS,
} from "@/lib/graphql/queries/Transaction";
import type { Category, Transactions, TypeTransaction } from "@/types";
import { dateFormatterMonth } from "@/utils/DateFormatter";
import { useMutation, useQuery } from "@apollo/client/react";
import { useMemo, useState } from "react";

type TransactionFilter = {
  description?: string;
  type?: TypeTransaction | "";
  categoryId?: string;
  period: Date | null;
  page?: number;
  limit?: number;
};

type SelectOption = {
  label: string;
  value: string;
};

const ITEMS_PER_PAGE = 10;

export const useTransactionController = () => {
  const [filter, setFilter] = useState<TransactionFilter>({
    description: "",
    type: "",
    categoryId: "",
    period: null,
  });
  const [page, setPage] = useState(1);

  const { data, refetch } = useQuery<
    {
      getTransactions: Transactions;
    },
    { params?: TransactionFilter }
  >(TRANSACTIONS, {
    variables: {
      params: {
        description: filter.description,
        type: filter.type === "" ? undefined : filter.type,
        categoryId: filter.categoryId === "" ? undefined : filter.categoryId,
        period: filter.period,
        page,
        limit: ITEMS_PER_PAGE,
      },
    },
    fetchPolicy: "network-only",
  });

  const { data: transactionDetails } = useQuery<{
    categories: Category[];
    transactionPeriods: { oldestDate: Date; newestDate: Date };
  }>(TRANSACTIONS_DETAILS);

  const [deleteTransaction] = useMutation<
    { deleteTransaction: boolean },
    { deleteTransactionId: string }
  >(DELETE_TRANSACTION, {
    refetchQueries: [
      { query: DASHBOARD_DETAILS },
      { query: GET_CATEGORIES },
      { query: TRANSACTIONS },
    ],
    onCompleted: () => {
      refetch();
    },
  });
  const transactions = useMemo(() => {
    const transactions = data?.getTransactions.transactions || [];
    return transactions || [];
  }, [data?.getTransactions.transactions]);

  const totalItems = useMemo(
    () => data?.getTransactions?.pagination.totalItems ?? 0,
    [data?.getTransactions?.pagination.totalItems]
  );

  const totalPages = useMemo(
    () => Math.ceil(totalItems / ITEMS_PER_PAGE),
    [totalItems]
  );

  const categories = useMemo(
    () => transactionDetails?.categories ?? null,
    [transactionDetails?.categories]
  );

  const listMonths = useMemo(() => {
    if (!transactionDetails?.transactionPeriods) return [];
    const { oldestDate, newestDate } = transactionDetails.transactionPeriods;
    return listOfMonthsBetweenDates(new Date(oldestDate), new Date(newestDate));
  }, [transactionDetails]);

  return {
    categories,
    transactions,
    listMonths,
    limit: ITEMS_PER_PAGE,
    page,
    setPage,
    totalItems,
    totalPages,
    deleteTransaction,
    setFilter,
    refetchTransactions: refetch,
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
