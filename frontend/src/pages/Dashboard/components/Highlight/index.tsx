import { Card } from "@/components/Card";
import { formatCurrency } from "@/utils/Currency";
import { useMemo } from "react";

type HighlightProps = {
  title: string;
  amount: number | string;
  icon: React.ReactNode;
};

export const Highlight = ({ title, amount, icon }: HighlightProps) => {
  const currentValue = useMemo(() => {
    return formatCurrency(Number(amount));
  }, [amount]);

  return (
    <Card>
      <div className="flex flex-row gap-3 items-center">
        {icon}
        <span className="text-sm text-gray-500 uppercase">{title}</span>
      </div>
      <span className="text-2xl font-semibold">{currentValue}</span>
    </Card>
  );
};
