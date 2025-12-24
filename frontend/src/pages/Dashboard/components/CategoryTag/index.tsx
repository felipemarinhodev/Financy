import { TagCategory } from "@/components/TagCategory";
import type { Category } from "@/types";
import { formatCurrency } from "@/utils/Currency";
import { useMemo } from "react";

type CategoryTagProps = {
  category: Category;
};

export const CategoryTag = ({ category }: CategoryTagProps) => {
  const amount = category.detail?.totalAmount ?? 0;
  const transactionCount = category.detail?.transactionCount ?? 0;

  const currentValue = useMemo(() => {
    return formatCurrency(Number(amount));
  }, [amount]);
  return (
    <div className="w-full flex flex-row items-center  gap-1">
      {/* tag */}
      <TagCategory category={category} />
      {/* Quantity */}
      <span className="text-gray-600 flex-1 text-sm font-normal text-right">
        {transactionCount} {transactionCount === 1 ? "item" : "itens"}
      </span>
      {/* Amount */}
      <span className="ml-2 text-gray-800 font-bold text-sm ">
        {currentValue}
      </span>
    </div>
  );
};
