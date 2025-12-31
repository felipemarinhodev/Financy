import { Icon } from "@/components/Icon";
import { TextField } from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { Category, ColorOptions, IconCategory } from "@/types";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useCategoryModalController } from "./useCategoryModalController";
import { toast } from "sonner";

type CategoryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category | null;
};

export const CategoryModal = ({
  category = null,
  open,
  onOpenChange,
}: CategoryModalProps) => {
  const categoryIcons: readonly IconCategory[] = [
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

  const [categoryIcon, setCategoryIcon] = useState<IconCategory>(
    category?.icon || "briefcase_business"
  );
  const [color, setColor] = useState<
    "green" | "blue" | "purple" | "pink" | "red" | "orange" | "yellow"
  >(category?.color || "green");
  const [description, setDescription] = useState(category?.description || "");
  const [title, setTitle] = useState(category?.title || "");
  const { isLoading, handleCreateCategory, handleEditCategory } =
    useCategoryModalController();

  const handleSaveCategory = async () => {
    let success = false;
    const input = {
      title,
      description,
      color,
      icon: categoryIcon,
    };
    if (category?.id) {
      success = await handleEditCategory(category!.id, input);

      if (success) {
        toast.success("Categoria atualizada com sucesso!");
      }
    } else {
      success = await handleCreateCategory(input);
      if (success) {
        toast.success("Categoria criada com sucesso!");
      }
    }
    if (success) {
      setTitle("");
      setDescription("");
      setColor("green");
      setCategoryIcon("briefcase_business");
      onOpenChange(false);
    }
  };

  useEffect(() => {
    if (category) {
      setTitle(category.title);
      setDescription(category.description);
      setColor(category.color);
      setCategoryIcon(category.icon);
    } else {
      setTitle("");
      setDescription("");
      setColor("green");
      setCategoryIcon("briefcase_business");
    }
  }, [category, open]);

  return (
    <Dialog key={category?.id || "new"} open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-base font-semibold text-gray-800 mb-0">
            {category ? (
              <>
                Editar categoria{" "}
                <span className="font-bold text-lg">{category.title}</span>
              </>
            ) : (
              "Nova categoria"
            )}
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
