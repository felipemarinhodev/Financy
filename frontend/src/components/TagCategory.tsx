import type { ColorOptions, IconCategory } from "@/types";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

type Category = {
  title: string;
  color: ColorOptions;
  icon: IconCategory;
};

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
  return <Icon color={color} icon={icon} />;
};
