import { TagCategory, TagCategoryIcon } from "@/components/TagCategory";
import type { Transaction } from "@/types";
import { formatCurrency } from "@/utils/Currency";
import { dateFormatter } from "@/utils/DateFormatter";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";

type TransactionItemProps = {
  transaction: Transaction;
};

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const { description, type, amount, date, category } = transaction;
  return (
    <div className="flex flex-row justify-center items-center">
      {category && <TagCategoryIcon category={category} />}
      <div className="flex flex-col flex-1 ml-4">
        <span className="text-gray-800 font-medium">{description}</span>
        <span className="text-gray-500 text-sm font-normal">
          {dateFormatter(date)}
        </span>
      </div>
      {category && <TagCategory category={category} />}
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
