import { cn } from "@/lib/utils";
import { useCategory } from "@/stores/category";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import { useState } from "react";
import { Select } from "../Select";
import { TextField } from "../TextField";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { useNewTransctionController } from "./useNewTransactionController";

type NewTransactionProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const NewTransaction = ({ open, onOpenChange }: NewTransactionProps) => {
  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    "expense"
  );
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const { categories } = useCategory((state) => state);

  const { handleCreateTransaction } = useNewTransctionController();

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();

  //   const response = await handleCreateTransaction({});
  // };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-base font-semibold text-gray-800 mb-0">
            Nova transação
          </DialogTitle>
          <DialogDescription className="text-md font-normal text-gray-600">
            Registre sua despesa ou receita
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4">
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
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="grid grid-cols-3 gap-4">
            <TextField
              label="Data"
              placeholder="Selecione"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <TextField
              label="Valor"
              placeholder="0,00"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <Select
              label="Categoria"
              items={categories?.map((category) => ({
                value: category.id,
                label: category.title,
              }))}
              value={categoryId}
              // onValueChange={(value) => setCategoryId(value)}
            />
          </div>
        </form>

        <Button className="w-full" size="lg">
          Salvar
        </Button>
      </DialogContent>
    </Dialog>
  );
};
