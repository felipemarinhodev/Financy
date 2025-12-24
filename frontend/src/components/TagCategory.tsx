import type { Category } from "@/types";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

type TagCategoryProps = {
  category: Omit<Category, "icon">;
  className?: string;
};

export const TagCategory = ({ category, className = "" }: TagCategoryProps) => {
  const { title, color } = category;

  const classNames = cn(
    "px-4 py-1 rounded-4xl text-md font-medium",
    `text-${color}-base bg-${color}-light w-fit`,
    className
  );
  return <div className={classNames}>{title}</div>;
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
