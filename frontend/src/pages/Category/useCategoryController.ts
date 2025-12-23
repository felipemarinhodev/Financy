import { DELETE_CATEGORY } from "@/lib/graphql/mutations/Category";
import { GET_CATEGORIES } from "@/lib/graphql/queries/Category";
import type { Category, Transaction } from "@/types";
import { useMutation, useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type DeleteCategoryMutation = {
  deleteCategory: boolean;
};

export const useCategoryController = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const {
    data,
    error,
    loading: queryLoading,
  } = useQuery<{ categories: Category[]; transactions: Transaction[] }>(
    GET_CATEGORIES
  );

  useEffect(() => {
    setLoading(queryLoading);
    if (data?.categories) {
      setCategories(data.categories);
    }
    if (data?.transactions) {
      setTransactions(data.transactions);
    }

    if (error) {
      console.error("Error fetching categories:", error);
    }
  }, [data, error, queryLoading]);

  const [deleteCategory] = useMutation<
    DeleteCategoryMutation,
    { deleteCategoryId: string }
  >(DELETE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
  });

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      setLoading(true);
      const { data } = await deleteCategory({
        variables: { deleteCategoryId: categoryId },
      });
      if (data?.deleteCategory) {
        toast.success("Category deleted successfully!");
      }
    } catch (error) {
      toast.error("Failed to delete category! Please try again.");
      console.error("Error deleting category:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    categories,
    transactions,
    handleDeleteCategory,
  };
};
