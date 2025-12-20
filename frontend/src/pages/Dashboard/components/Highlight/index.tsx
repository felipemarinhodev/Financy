import { useMemo } from "react";

type HighlightProps = {
  title: string;
  amount: string;
  icon: React.ReactNode;
};

export const Highlight = ({ title, amount, icon }: HighlightProps) => {
  const currentValue = useMemo(() => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(Number(amount))
  }, [amount]);

  return (
    <div className="bg-white flex flex-col p-6 rounded-md shadow-md gap-4">
      <div className="flex flex-row gap-3 items-center">
        {icon}
        <span className="text-sm text-gray-500 uppercase">{title}</span>
      </div>
      <span className="text-2xl font-semibold">{currentValue}</span>
    </div>
  );
};
