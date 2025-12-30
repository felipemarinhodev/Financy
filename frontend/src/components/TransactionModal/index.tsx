import { cn } from "@/lib/utils";
import type { Category, Transaction } from "@/types";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Calendar } from "../Calendar";
import { Select } from "../Select";
import { TagCategory } from "../TagCategory";
import { TextField } from "../TextField";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { useTransactionModalController } from "./useTransactionModalController";

type NewTransactionProps = {
  open: boolean;
  categories: Category[];
  transaction?: Transaction | null;
  onOpenChange: (open: boolean) => void;
  onTransactionSaved: () => void;
};

export const TransactionModal = ({
  categories,
  open,
  transaction = null,
  onOpenChange,
  onTransactionSaved,
}: NewTransactionProps) => {
  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    transaction?.type || "expense"
  );
  const [description, setDescription] = useState<string>(
    transaction?.description || ""
  );
  const [date, setDate] = useState<Date | undefined>(
    transaction?.date || undefined
  );
  const [amount, setAmount] = useState<number>(transaction?.amount || 0);
  const [categoryId, setCategoryId] = useState<string>(
    transaction?.category?.id || ""
  );

  useEffect(() => {
    if (transaction) {
      setTransactionType(transaction.type);
      setDescription(transaction.description);
      setDate(transaction.date);
      setAmount(transaction.amount);
      setCategoryId(transaction.category?.id || "");
      return;
    }
    setTransactionType("expense");
    setDescription("");
    setDate(undefined);
    setAmount(0);
    setCategoryId("");
  }, [transaction]);

  const { handleCreateTransaction, handleUpdateTransaction } =
    useTransactionModalController();

  const handleSubmit = async () => {
    const transactionData = {
      amount,
      type: transactionType,
      categoryId,
      date: new Date(date),
      description,
    };

    const response = transaction
      ? await handleUpdateTransaction(transaction.id, transactionData)
      : await handleCreateTransaction(transactionData);
    if (response) {
      toast.success(
        transaction
          ? "Transação atualizada com sucesso!"
          : "Transação criada com sucesso!"
      );
      onTransactionSaved();
      onOpenChange(false);
      setTransactionType("expense");
      setDescription("");
      setDate(undefined);
      setAmount(0);
      setCategoryId("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent key={transaction?.id || "new"}>
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-base font-semibold text-gray-800 mb-0">
            {transaction
              ? `Editar Transação: ${transaction.description}`
              : "Nova Transação"}
          </DialogTitle>
          <DialogDescription className="text-md font-normal text-gray-600">
            {transaction
              ? "Edite sua despesa ou receita"
              : "Registre sua despesa ou receita"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 w-full p-2 border border-gray-200 rounded-md">
            <Button
              size="lg"
              variant="ghost"
              className={cn(
                "w-full",
                transactionType === "expense" && "border border-red-base"
              )}
              type="button"
              onClick={() => setTransactionType("expense")}>
              <CircleArrowDown
                className={cn(
                  "w-4 h-4 text-gray-400 mr-2",
                  transactionType === "expense" && "text-red-base"
                )}
              />
              Despesas
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className={cn(
                "w-full",
                transactionType === "income" && "border border-green-base"
              )}
              type="button"
              onClick={() => setTransactionType("income")}>
              <CircleArrowUp
                className={cn(
                  "w-4 h-4 text-gray-400 mr-2",
                  transactionType === "income" && "text-green-base"
                )}
              />
              Receitas
            </Button>
          </div>

          <TextField
            label="Descrição"
            placeholder="Ex.: Compra de supermercado"
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="grid grid-cols-3 gap-4">
            <Calendar label="Data" value={date} onChange={setDate} />
            <TextField
              label="Valor"
              name="amount"
              placeholder="0,00"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <div>
            <Select
              name="category"
              label="Categoria"
              items={categories?.map((category) => ({
                value: category.id,
                label: <TagCategory category={category} />,
              }))}
              value={categoryId}
              onValueChange={(value) => setCategoryId(value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="w-full z-40"
            size="lg"
            type="button"
            onClick={handleSubmit}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
