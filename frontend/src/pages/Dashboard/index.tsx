import { Card } from "@/components/Card";
import { NewTransaction } from "@/components/NewTransaction";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  CircleArrowDown,
  CircleArrowUp,
  Plus,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { CategoryTag } from "./components/CategoryTag";
import { Highlight } from "./components/Highlight";
import { TransactionItem } from "./components/TransactionItem";
import { useDashboardController } from "./useDashboardController";

export const Dashboard = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { balanceTransactions, categories, transactions } =
    useDashboardController();
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="col-span-3"></div>
      <Highlight
        title="Saldo total"
        amount={balanceTransactions?.balance ?? 0}
        icon={<Wallet className="text-purple-base" />}
      />
      <Highlight
        title="Receitas do Mês"
        amount={balanceTransactions?.income ?? 0}
        icon={<CircleArrowUp className="text-brand-base" />}
      />
      <Highlight
        title="Despesas do Mês"
        amount={balanceTransactions?.expense ?? 0}
        icon={<CircleArrowDown className="text-red-base" />}
      />
      <Card className="md:col-span-2 h-fit">
        <div className="flex flex-row justify-between items-center">
          <span className="text-sm font-normal uppercase">
            Transações Recentes
          </span>
          <Button
            variant="link"
            className="text-green-base text-md font-medium px-0 has-[>svg]:px-0">
            Ver todas{" "}
            <ChevronRight className="inline-block w-5 h-5 text-green-base" />
          </Button>
        </div>
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
        <div className="flex align-center justify-center w-full">
          <Button
            variant="link"
            className="text-green-base text-md"
            onClick={() => setOpenDialog(true)}>
            <Plus className="inline-block w-5 h-5 font-medium text-green-base cursor-default" />
            Nova transação
          </Button>
        </div>
      </Card>

      <Card className="h-fit">
        <div className="flex flex-row justify-between items-center">
          <span className="text-sm font-normal uppercase">Categorias</span>
          <Link
            to="/categories"
            className="text-green-base text-md font-medium px-0 has-[>svg]:px-0">
            Gerenciar{" "}
            <ChevronRight className="inline-block w-5 h-5 text-green-base" />
          </Link>
        </div>
        {categories.map((category) => (
          <CategoryTag key={category.id} category={category} />
        ))}
      </Card>
      <NewTransaction
        categories={categories || []}
        open={openDialog}
        onOpenChange={setOpenDialog}
      />
    </div>
  );
};
