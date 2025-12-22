import type { Category } from "@/types";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

type TagCategoryProps = {
  category: Omit<Category, "icon">;
};

export const TagCategory = ({ category }: TagCategoryProps) => {
  const { title, color } = category;

  const className = cn(
    "px-4 py-1 rounded-4xl text-md font-medium",
    `text-${color}-base bg-${color}-light`
  );
  return <div className={className}>{title}</div>;
};

type TagCategoryIconProps = {
  category: Category;
};
export const TagCategoryIcon = ({ category }: TagCategoryIconProps) => {
  const { color, icon } = category;
  return (
    <Icon
      color={color}
      icon={icon}
      className={`bg-${color}-light p-2 rounded-md`}
    />
  );
};
