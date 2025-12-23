import {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
} from "@/lib/graphql/mutations/Category";
import { GET_CATEGORIES } from "@/lib/graphql/queries/Category";
import type { Category } from "@/types";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

const createCategorySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
});

type CreateCategoryMutationData = {
  createCategory: {
    id: string;
    title: string;
    description: string;
    color: string;
    icon: string;
  };
};

type CategoryInput = {
  title: string;
  description?: string;
  color?: string;
  icon?: string;
};

export const useCategoryModalController = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [createCategory] = useMutation<
    CreateCategoryMutationData,
    { data: CategoryInput }
  >(CREATE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
  });

  const handleCreateCategory = async (input: CategoryInput) => {
    try {
      createCategorySchema.parse(input);
      setIsLoading(true);

      const { data } = await createCategory({
        variables: { data: input },
      });

      if (data?.createCategory) {
        return true;
      }
      return false;
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to create category! Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  type EditCategoryMutationData = {
    updateCategory: {
      category: Category;
    };
  };

  type EditCategoryMutationInput = {
    updateCategoryId: string;
    data: Partial<CategoryInput>;
  };
  const [updateCategory] = useMutation<
    EditCategoryMutationData,
    EditCategoryMutationInput
  >(UPDATE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
  });

  const handleEditCategory = async (
    categoryId: string,
    input: Partial<CategoryInput>
  ) => {
    try {
      setIsLoading(true);

      const { data } = await updateCategory({
        variables: {
          updateCategoryId: categoryId,
          data: input,
        },
      });

      if (data?.updateCategory) {
        return true;
      }
      return false;
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to update category! Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
    // Implementation for editing a category will go here
  };

  return { isLoading, handleCreateCategory, handleEditCategory };
};
