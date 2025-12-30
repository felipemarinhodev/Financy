import { Alert } from "@/components/Alert";
import { Card } from "@/components/Card";
import { TransactionModal } from "@/components/TransactionModal";
import { PageHeader } from "@/components/PageHeader";
import { Select } from "@/components/Select";
import { TagCategory } from "@/components/TagCategory";
import { TextField } from "@/components/TextField";
import { Type } from "@/components/Type";
import { Button } from "@/components/ui/button";
import type { Transaction as TransactionType } from "@/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import { TableTransactions } from "./components/TableTransactions";
import { useTransactionController } from "./useTransactionController";

export const Transaction = () => {
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionType | null>(null);

  const {
    categories,
    transactions,
    listMonths,
    deleteTransaction,
    setFilter,
    totalItems,
    totalPages,
    page,
    setPage,
    refetchTransactions,
    limit,
  } = useTransactionController();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Transações"
        subtitle="Gerencie todas as suas transações financeiras">
        <Button
          onClick={() => {
            setSelectedTransaction(null);
            setOpenDialog(true);
          }}>
          <Plus className="mr-2" size={16} />
          Nova transação
        </Button>
      </PageHeader>

      <Card className="grid grid-cols-4">
        <TextField
          label="Buscar"
          placeholder="Buscar por descrição"
          icon="search"
          onChange={(e) => {
            setFilter((prev) => ({ ...prev, description: e.target.value }));
          }}
        />
        <Select
          label="Tipo"
          items={[
            { value: "all", label: "Todos" },
            { value: "income", label: <Type type="income" /> },
            { value: "expense", label: <Type type="expense" /> },
          ]}
          placeholder="Todos"
          onValueChange={(value) => {
            setFilter((prev) => ({
              ...prev,
              type: value === "all" ? "" : (value as "income" | "expense"),
            }));
          }}
        />

        <Select
          label="Categoria"
          items={[
            { value: "all", label: "Todas" },
            ...(categories?.map((category) => ({
              value: category.id,
              label: <TagCategory category={category} />,
            })) ?? []),
          ]}
          onValueChange={(value) => {
            setFilter((prev) => ({
              ...prev,
              categoryId: value === "all" ? "" : value,
            }));
          }}
        />
        <Select
          label="Período"
          placeholder="Todos"
          items={[{ label: "Todos Períodos", value: "all" }, ...listMonths]}
          onValueChange={(value) => {
            setFilter((prev) => ({
              ...prev,
              period: value === "all" ? null : new Date(value),
            }));
          }}
        />
      </Card>

      <TableTransactions
        deleteAction={(id: string) => {
          const selected = transactions?.find((t) => t.id === id) ?? null;
          if (!selected) return;
          setSelectedTransaction(selected);
          setIsOpenDeleteAlert(true);
        }}
        editAction={(id: string) => {
          const selected = transactions?.find((t) => t.id === id) ?? null;
          if (!selected) return;
          setSelectedTransaction(selected);
          setOpenDialog(true);
        }}
        transactions={transactions}
        totalItems={totalItems}
        totalPages={totalPages}
        page={page}
        setPage={setPage}
        limit={limit}
      />
      <Alert
        isOpen={isOpenDeleteAlert}
        onClose={() => setIsOpenDeleteAlert(false)}
        title="Excluir Transação"
        description={`Tem certeza que deseja excluir a transação ${selectedTransaction?.description}? Esta ação não pode ser desfeita.`}
        onConfirm={() => {
          deleteTransaction({
            variables: { deleteTransactionId: selectedTransaction!.id },
          });
          setIsOpenDeleteAlert(false);
        }}
      />
      <TransactionModal
        categories={categories ?? []}
        open={openDialog}
        onOpenChange={setOpenDialog}
        transaction={selectedTransaction ?? undefined}
        onTransactionSaved={() => refetchTransactions() }
      />
    </div>
  );
};
