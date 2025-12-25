import { cn } from "@/lib/utils";
import { useCategory } from "@/stores/category";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { AlertCircleIcon, CircleArrowDown, CircleArrowUp } from "lucide-react";
import { useState } from "react";
import { Select } from "../Select";
import { TextField } from "../TextField";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { useNewTransctionController } from "./useNewTransactionController";
import z from "zod";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

type NewTransactionProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const transactionSchema = z.object({
  amount: z.number().positive("O valor deve ser positivo"),
  type: z.enum(["income", "expense"]),
  categoryId: z.string().min(1, "A categoria é obrigatória"),
  date: z.date().min(1, "A data é obrigatória"),
  description: z.string(),
});

export const NewTransaction = ({ open, onOpenChange }: NewTransactionProps) => {
  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    "expense"
  );
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [amount, setAmount] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<string>("");
  const { categories } = useCategory((state) => state);

  const { handleCreateTransaction } = useNewTransctionController();

  const handleSubmit = async () => {
    const transactionData = {
      amount,
      type: transactionType,
      categoryId,
      date: new Date(date),
      description,
    };

    const { data, error, success } =
      transactionSchema.safeParse(transactionData);

    console.log(
      `success: ${success} | data: ${JSON.stringify(
        data,
        null,
        2
      )} | error: ${JSON.stringify(error, null, 2)}`
    );

    // console.log(error);
    // if (!success) {
    //   return;
    // }
    const response = await handleCreateTransaction(transactionData);
    console.log(`response: ${response}`);

    // });
  };

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

        <div className="flex flex-col gap-4">
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Erro ao salvar a transação</AlertTitle>
            <AlertDescription>
              <p>Please verify your billing information and try again.</p>
              <ul className="list-inside list-disc text-sm">
                <li>Check your card details</li>
                <li>Ensure sufficient funds</li>
                <li>Verify billing address</li>
              </ul>
            </AlertDescription>
          </Alert>
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
            <TextField
              label="Data"
              name="date"
              placeholder="Selecione"
              type="date"
              value={date.toISOString().split("T")[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
            />
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
                label: category.title,
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
