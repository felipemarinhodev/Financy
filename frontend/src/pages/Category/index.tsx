import { Alert } from "@/components/Alert";
import { Card } from "@/components/Card";
import { Icon } from "@/components/Icon";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import type { Category as CategoryType } from "@/types";
import { ArrowUpDown, Plus, Tag } from "lucide-react";
import { useState } from "react";
import { CategoryModal } from "./components/CategoryModal";
import { ItemCategory } from "./components/ItemCategory";
import { useCategoryController } from "./useCategoryController";

export const Category = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);
  const {
    loading,
    categories,
    transactions,
    mostUsedCategory,
    handleDeleteCategory,
  } = useCategoryController();
  const [categorySelected, setCategorySelected] = useState<CategoryType | null>(
    null
  );

  const handleDeletion = (categoryId: string) => {
    setCategorySelected(
      categories.find((cat) => cat.id === categoryId) || null
    );
    if (categorySelected) {
      setIsOpenDeleteAlert(true);
    }
  };

  const handleEdition = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId) || null;
    setCategorySelected(category);
    setOpenDialog(true);
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Categorias"
        subtitle="Organize suas transações por categorias">
        <Button
          onClick={() => {
            setCategorySelected(null);
            setOpenDialog(true);
          }}>
          <Plus className="mr-2" size={16} />
          Nova categoria
        </Button>
      </PageHeader>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card row>
          <div className="flex flex-row gap-6 justify-start items-center p-6 bg-white rounded-2xl">
            <Tag className="text-gray-600" size={32} />
            <div className="flex-1 flex flex-col">
              <h2 className="text-gray-800 font-medium text-2xl">
                {categories.length}
              </h2>
              <span className="text-gray-500 font-medium text-xs uppercase">
                Total de categorias
              </span>
            </div>
          </div>
        </Card>
        <Card row>
          <div className="flex flex-row gap-6 justify-start items-center p-6 bg-white rounded-2xl">
            <ArrowUpDown className="text-purple-base" size={32} />
            <div className="flex-1 flex flex-col">
              <h2 className="text-gray-800 font-medium text-2xl">
                {transactions.length}
              </h2>
              <span className="text-gray-500 font-medium text-xs uppercase">
                Total de Transações
              </span>
            </div>
          </div>
        </Card>
        <Card row>
          <div className="flex flex-row gap-6 justify-start items-center p-6 bg-white rounded-2xl">
            {mostUsedCategory && (
              <Icon
                icon={mostUsedCategory?.icon}
                color={mostUsedCategory?.color}
                className="bg-transparent p-0"
              />
            )}
            <div className="flex-1 flex flex-col">
              <h2 className="text-gray-800 font-medium text-2xl">
                {mostUsedCategory?.title || "N/A"}
              </h2>
              <span className="text-gray-500 font-medium text-xs uppercase">
                categoria mais utilizada
              </span>
            </div>
          </div>
        </Card>
      </div>
      <section className="grid lg:grid-cols-4 gap-4">
        {!loading &&
          categories.map((category) => (
            <ItemCategory
              key={category.id}
              category={category}
              onDelete={() => handleDeletion(category.id)}
              onEdit={() => handleEdition(category.id)}
            />
          ))}
      </section>
      <CategoryModal
        open={openDialog}
        onOpenChange={setOpenDialog}
        category={categorySelected}
      />
      <Alert
        isOpen={isOpenDeleteAlert}
        onClose={() => setIsOpenDeleteAlert(false)}
        title="Excluir Categoria"
        description={`Tem certeza que deseja excluir a categoria "${categorySelected?.title}"? Esta ação não pode ser desfeita.`}
        onConfirm={() => {
          handleDeleteCategory(categorySelected!.id);
          setCategorySelected(null);
        }}
      />
    </div>
  );
};
