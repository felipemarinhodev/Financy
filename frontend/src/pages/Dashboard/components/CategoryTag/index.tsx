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
    <div className="w-full grid grid-cols-8 items-center  gap-1">
      {/* tag */}
      <div className="col-span-4">
        <TagCategory category={category} />
      </div>
      {/* Quantity */}
      <span className="text-gray-600 text-sm font-normal text-right col-span-2">
        {transactionCount} {transactionCount === 1 ? "item" : "itens"}
      </span>
      {/* Amount */}
      <span className="ml-2 text-gray-800 font-bold text-sm text-right col-span-2">
        {currentValue}
      </span>
    </div>
  );
};
