import { TagCategory, TagCategoryIcon } from "@/components/TagCategory";
import type { ColorOptions, IconCategory } from "@/types";
import { formatCurrency } from "@/utils/Currency";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";

type Category = {
  title: string;
  color: ColorOptions;
  icon: IconCategory;
};
type TransactionItemProps = {
  category: Category;
  description: string;
  id: string;
  type: "income" | "expense";
  amount: string;
  date: string;
};

export const TransactionItem = ({
  category,
  description,
  id,
  type,
  amount,
  date,
}: TransactionItemProps) => {
  return (
    <div className="flex flex-row justify-center items-center">
      <TagCategoryIcon category={category} />
      <div className="flex flex-col flex-1 ml-4">
        <span className="text-gray-800 font-medium">{description}</span>
        <span className="text-gray-500 text-sm font-normal">{date}</span>
      </div>
      <TagCategory category={category} />
      <span className="font-semibold text-sm ml-4 mr-2">
        {type === "income" ? "+ " : "- "}
        {formatCurrency(Number(amount))}
      </span>
      {type === "income" ? (
        <CircleArrowUp className="w-4 h-4 text-green-base" />
      ) : (
        <CircleArrowDown className="w-4 h-4 text-red-base" />
      )}
    </div>
  );
};
