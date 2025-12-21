import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  CircleArrowDown,
  CircleArrowUp,
  Plus,
  Wallet,
} from "lucide-react";
import { CategoryTag } from "./components/CategoryTag";
import { Highlight } from "./components/Highlight";
import { TransactionItem } from "./components/TransactionItem";
import { NewTransaction } from "@/components/NewTransaction";
import { useState } from "react";

export const Dashboard = () => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div className="grid lg:grid-cols-3 gap-6">
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
        <TransactionItem
          category={{
            title: "Salário",
            color: "green",
            icon: "briefcase_business",
          }}
          description="Recebimento de salário"
          id="1"
          type="income"
          amount="4250.00"
          date="01/12/2025"
        />
        <TransactionItem
          category={{
            title: "alimentação",
            color: "blue",
            icon: "utensils",
          }}
          description="Jantar em restaurante"
          id="2"
          type="expense"
          amount="89.50"
          date="30/11/2025"
        />
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
          <Button
            variant="link"
            className="text-green-base text-md font-medium px-0 has-[>svg]:px-0">
            Gerenciar{" "}
            <ChevronRight className="inline-block w-5 h-5 text-green-base" />
          </Button>
        </div>

        <CategoryTag
          title="Alimentação"
          itemCount={15}
          amount="950.75"
          color="blue"
        />
        <CategoryTag
          title="Transporte"
          itemCount={8}
          amount="385.50"
          color="purple"
        />
        <CategoryTag
          title="Mercado"
          itemCount={3}
          amount="298.75"
          color="orange"
        />
        <CategoryTag
          title="Entretenimento"
          itemCount={2}
          amount="186.20"
          color="red"
        />
        <CategoryTag
          title="Utilidades"
          itemCount={1}
          amount="245.80"
          color="yellow"
        />
      </Card>
      <NewTransaction open={openDialog} onOpenChange={setOpenDialog} />
    </div>
  );
};
