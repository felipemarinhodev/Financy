import { GET_CATEGORIES } from "@/lib/graphql/queries/Category";
import type { Category } from "@/types";
import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";

export const useCategoryController = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const {
    data,
    error,
    loading: queryLoading,
  } = useQuery<{ categories: Category[] }>(GET_CATEGORIES);

  useEffect(() => {
    setLoading(queryLoading);
    if (data?.categories) {
      setCategories(data.categories);
    } else if (error) {
      console.error("Error fetching categories:", error);
    }
  }, [data, error, queryLoading]);

  return {
    loading,
    categories,
  };
};
