import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/Transaction";
import { GET_CATEGORIES } from "@/lib/graphql/queries/Category";
import { DASHBOARD_DETAILS } from "@/lib/graphql/queries/Dashboard";
import { TRANSACTIONS } from "@/lib/graphql/queries/Transaction";
import type { Category, Transactions, TypeTransaction } from "@/types";
import { dateFormatterMonth } from "@/utils/DateFormatter";
import { useLazyQuery, useMutation } from "@apollo/client/react";
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
  const [filter, setFilter] = useState<TransactionFilter>({
    description: "",
    type: "",
    categoryId: "",
    period: null,
  });
  // const [paginationState, setPaginationState] = useState<{
  //   limit: number;
  //   currentPage: number;
  // }>({ limit: 10, currentPage: 1 });

  const [getTransactionDetail, { data }] = useLazyQuery<
    {
      categories: Category[];
      getTransactions: Transactions;
      transactionPeriods: { oldestDate: Date; newestDate: Date };
    },
    { params?: TransactionFilter }
  >(TRANSACTIONS);

  useEffect(() => {
    getTransactionDetail({
      variables: {
        params: {
          description: filter.description,
          type: filter.type === "" ? undefined : filter.type,
          categoryId: filter.categoryId === "" ? undefined : filter.categoryId,
          period: filter.period,
        },
      },
    });
  }, [filter]);

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

  return {
    categories,
    transactions,
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
