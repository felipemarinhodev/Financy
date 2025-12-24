import { apolloClient } from "@/lib/graphql/apollo";
import { GET_CATEGORIES } from "@/lib/graphql/queries/Category";
import type { Category } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CategoryState {
  categories: Category[];
  setCategories: () => void;
}

export const useCategory = create<CategoryState>()(
  persist(
    (set) => ({
      categories: [],
      setCategories: async () => {
        const { data } = await apolloClient.query<{
          categories: Category[];
        }>({ query: GET_CATEGORIES });

        if (data?.categories) {
          const categories = data.categories;
          set(() => ({ categories }));
          return true;
        }
        return false;
      },
    }),
    {
      name: "category-storage",
    }
  )
);
