import { TagCategory } from "@/components/TagCategory";
import type { ColorOptions } from "@/types";
import { formatCurrency } from "@/utils/Currency";
import { useMemo } from "react";

type CategoryTagProps = {
  title: string;
  itemCount: number;
  amount: string;
  color: ColorOptions;
};

export const CategoryTag = ({ title, itemCount, amount, color }: CategoryTagProps) => {
  const currentValue = useMemo(() => {
    return formatCurrency(Number(amount));
  }, [amount]);
  return (
    <div className="w-full flex flex-row items-center  gap-1">
      {/* tag */}
      <TagCategory category={{ title, color }} />
      {/* Quantity */}
      <span className="text-gray-600 flex-1 text-sm font-normal text-right">
        {itemCount} {itemCount === 1 ? "item" : "itens"}
      </span>
      {/* Amount */}
      <span className="ml-2 text-gray-800 font-bold text-sm ">
        {currentValue}
      </span>
    </div>
  );
};
