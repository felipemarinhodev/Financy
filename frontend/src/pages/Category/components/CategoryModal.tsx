import { Icon } from "@/components/Icon";
import { TextField } from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { ColorOptions } from "@/types";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useCategoryModalController } from "./useCategoryModalController";

type CategoryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type CategoryIcon =
  | "briefcase_business"
  | "car_front"
  | "heart_pulse"
  | "piggy_bank"
  | "shopping_cart"
  | "ticket"
  | "tool_case"
  | "utensils"
  | "paw_print"
  | "house"
  | "gift"
  | "dumbbell"
  | "book_open"
  | "baggage_claim"
  | "mailbox"
  | "receipt_text";

export const CategoryModal = ({ open, onOpenChange }: CategoryModalProps) => {
  const categoryIcons: readonly CategoryIcon[] = [
    "briefcase_business",
    "car_front",
    "heart_pulse",
    "piggy_bank",
    "shopping_cart",
    "ticket",
    "tool_case",
    "utensils",
    "paw_print",
    "house",
    "gift",
    "dumbbell",
    "book_open",
    "baggage_claim",
    "mailbox",
    "receipt_text",
  ];

  const colorOptions = [
    "green",
    "blue",
    "purple",
    "pink",
    "red",
    "orange",
    "yellow",
  ];

  const colorClasses: Record<ColorOptions, string> = {
    green: "bg-green-base",
    blue: "bg-blue-base",
    purple: "bg-purple-base",
    pink: "bg-pink-base",
    red: "bg-red-base",
    orange: "bg-orange-base",
    yellow: "bg-yellow-base",
  };

  const [categoryIcon, setCategoryIcon] =
    useState<CategoryIcon>("briefcase_business");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState<
    "green" | "blue" | "purple" | "pink" | "red" | "orange" | "yellow"
  >("green");
  const { isLoading, handleCreateCategory } = useCategoryModalController();

  const handleSaveCategory = async () => {
    const success = await handleCreateCategory(
      title,
      description,
      color,
      categoryIcon
    );
    if (success) {
      // Reset fields
      setTitle("");
      setDescription("");
      setColor("green");
      setCategoryIcon("briefcase_business");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-base font-semibold text-gray-800 mb-0">
            Nova categoria
          </DialogTitle>
          <DialogDescription className="text-md font-normal text-gray-600">
            Organize suas transações criando categorias
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <TextField
            label="Titulo"
            placeholder="Ex. Alimentação"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Descrição"
            placeholder="Ex.: Descrição da categoria"
            helperMessage="Opcional"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex flex-col gap-2">
            <Label className="text-md font-medium">Ícone</Label>
            <div className="grid grid-cols-8 gap-1 w-full p-2">
              {categoryIcons.map((icon) => (
                <Button
                  key={icon}
                  variant="outline"
                  onClick={() => setCategoryIcon(icon)}
                  className={cn(
                    categoryIcon === icon && "border-2 border-green-base",
                    "bg-gray-100"
                  )}>
                  <Icon
                    icon={icon}
                    className="text-gray-600 rounded-none w-8 h-8 p-0"
                    color="none"
                  />
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-md font-medium">Cor</Label>
            <div className="grid grid-cols-7 gap-1 w-full p-2">
              {colorOptions.map((colorOption) => (
                <Button
                  key={colorOption}
                  variant="outline"
                  onClick={() => setColor(colorOption)}
                  className={cn(
                    color === colorOption && "border-2 border-green-base",
                    "bg-gray-100 m-1 p-0 rounded-md"
                  )}>
                  <div
                    className={`w-10 h-5 m-1 rounded-sm ${colorClasses[colorOption]}`}
                  />
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Button
          className="w-full"
          size="lg"
          disabled={isLoading}
          onClick={() => handleSaveCategory()}>
          {isLoading ? "Salvando..." : "Salvar"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
