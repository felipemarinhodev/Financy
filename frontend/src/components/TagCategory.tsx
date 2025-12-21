import type { ColorOptions, IconCategory } from "@/types";
import { Icon } from "./Icon";

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

  return (
    <span
      className={`bg-${color}-light text-${color}-base px-2 py-1 rounded-md text-xs font-medium`}>
      {title}
    </span>
  );
};

type TagCategoryIconProps = {
  category: Category;
};
export const TagCategoryIcon = ({ category }: TagCategoryIconProps) => {
  const { color, icon } = category;
  return <Icon color={color} icon={icon} />;
};
