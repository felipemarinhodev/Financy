import { apolloClient } from "@/lib/graphql/apollo";
import { CREATE_CATEGORY } from "@/lib/graphql/mutations/Category";
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

export const useCategoryModalController = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateCategory = async (
    title: string,
    description?: string,
    color?: string,
    icon?: string
  ) => {
    try {
      createCategorySchema.parse({ title, description, color, icon });
      setIsLoading(true);

      const { data } = await apolloClient.mutate<
        CreateCategoryMutationData,
        {
          data: {
            title: string;
            description?: string;
            color?: string;
            icon?: string;
          };
        }
      >({
        mutation: CREATE_CATEGORY,
        variables: { data: { title, description, icon, color } },
      });

      if (data?.createCategory) {
        toast.success("Category created successfully!");
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

  return { isLoading, handleCreateCategory };
};
