import { DELETE_CATEGORY } from "@/lib/graphql/mutations/Category";
import { GET_CATEGORIES } from "@/lib/graphql/queries/Category";
import type {
  Category,
  MostUsedCategory,
  Transaction,
  Transactions,
} from "@/types";
import { useMutation, useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type DeleteCategoryMutation = {
  deleteCategory: boolean;
};

export const useCategoryController = () => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [mostUsedCategory, setMostUsedCategory] =
    useState<MostUsedCategory | null>(null);

  const {
    data,
    error,
    loading: queryLoading,
  } = useQuery<{
    getTransactions: Transactions;
    categories: Category[];
    mostUsedCategories: MostUsedCategory;
  }>(GET_CATEGORIES);

  useEffect(() => {
    setLoading(queryLoading);
    if (data?.getTransactions.transactions) {
      setTransactions(data.getTransactions.transactions);
    }
    if (data?.categories) {
      setCategories(data.categories);
    }
    if (data?.mostUsedCategories) {
      setMostUsedCategory(data.mostUsedCategories);
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
        toast.success("Categoria excluída com sucesso!");
      }
    } catch (error) {
      console.log(JSON.stringify(error));

      const errorMessage =
        (error as any)?.graphQLErrors?.[0]?.message ||
        (error as any)?.networkError?.message ||
        (error as any)?.message ||
        "Unknown error";

      toast.error(
        errorMessage || "Falha ao excluir categoria! Tente novamente."
      );
      console.error("Error deleting category:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    categories,
    mostUsedCategory,
    transactions,
    handleDeleteCategory,
  };
};
