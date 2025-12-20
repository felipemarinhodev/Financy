import { CircleArrowDown, CircleArrowUp, Wallet } from "lucide-react";
import { Highlight } from "./components/Highlight";

export const Dashboard = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <Highlight
        title="Saldo total"
        amount="12345.67"
        icon={<Wallet className="text-purple-base" />}
      />
      <Highlight
        title="Receitas do Mês"
        amount="4250.00"
        icon={<CircleArrowUp className="text-brand-base" />}
      />
      <Highlight
        title="Despesas do Mês"
        amount="12345.67"
        icon={<CircleArrowDown className="text-red-base" />}
      />
    </div>
  );
};
