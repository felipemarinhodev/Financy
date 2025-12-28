import { TagCategory, TagCategoryIcon } from "@/components/TagCategory";
import { Type } from "@/components/Type";
import type { Transaction } from "@/types";
import { formatCurrency } from "@/utils/Currency";
import { dateFormatter } from "@/utils/DateFormatter";

type TransactionItemProps = {
  transaction: Transaction;
};

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const { description, type, amount, date, category } = transaction;
  return (
    <div className="w-full grid grid-cols-12 items-center gap-1 ">
      <div className="col-span-8 ">
        <div className="flex flex-row items-center">
          {category && <TagCategoryIcon category={category} />}
          <div className="flex flex-col flex-1 ml-4">
            <span className="text-gray-800 font-medium">{description}</span>
            <span className="text-gray-500 text-sm font-normal">
              {dateFormatter(date)}
            </span>
          </div>
        </div>
      </div>

      <div className="col-span-2 flex items-center justify-center">
        {category && <TagCategory category={category} />}
      </div>
      <div className="col-span-2 flex flex-row items-center justify-end ">
        <span className="font-semibold text-sm ml-4 mr-2">
          {type === "income" ? "+ " : "- "}
          {formatCurrency(Number(amount))}
        </span>
        <Type type={type} onlyIcon />
      </div>
    </div>
  );
};
