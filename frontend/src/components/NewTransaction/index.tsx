import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { TextField } from "../TextField";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type NewTransactionProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const NewTransaction = ({ open, onOpenChange }: NewTransactionProps) => {
  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    "expense"
  );

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
          />
          <div className="grid grid-cols-3 gap-4">
            <TextField label="Data" placeholder="Selecione" type="date" />
            <TextField label="Valor" placeholder="0,00" type="number" />
          </div>
          <div>
            <Label className="text-label mb-2">Categoria</Label>

            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categorias</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </form>

        <Button className="w-full" size="lg">
          Salvar
        </Button>
      </DialogContent>
    </Dialog>
  );
};
