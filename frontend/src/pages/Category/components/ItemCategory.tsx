import { Card } from "@/components/Card";
import { TagCategory, TagCategoryIcon } from "@/components/TagCategory";
import { Button } from "@/components/ui/button";
import type { Category } from "@/types";
import { SquarePen, Trash } from "lucide-react";

type ItemCategoryProps = {
  category: Category;
  onDelete: (categoryId: string) => void;
  onEdit: (categoryId: string) => void;
};

export const ItemCategory = ({
  category,
  onDelete,
  onEdit,
}: ItemCategoryProps) => {
  return (
    <Card className="justify-around">
      <div className="flex flex-row gap-5 justify-between">
        <TagCategoryIcon category={category} />
        <div>
          <Button
            variant="outline"
            size="sm"
            className="mr-2"
            onClick={() => onDelete(category.id)}>
            <Trash size={16} className="text-danger" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(category.id)}>
            <SquarePen size={16} className="text-gray-700" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-gray-800 font-semibold text-base">
          {category.title}
        </h3>
        <span className="text-gray-600 text-sm">{category.description}</span>
      </div>
      <div className="flex justify-between items-center">
        <TagCategory category={category} />
        <span className="text-gray-600 text-sm font-normal">
          {category.detail?.transactionCount || 0} itens
        </span>
      </div>
    </Card>
  );
};
