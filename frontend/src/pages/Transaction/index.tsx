import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Select } from "@/components/Select";
import { TextField } from "@/components/TextField";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, SquarePen, Trash } from "lucide-react";
import { useTransactionController } from "./useTransactionController";
import { formatCurrency } from "@/utils/Currency";
import { TagCategory, TagCategoryIcon } from "@/components/TagCategory";
import { dateFormatter } from "@/utils/DateFormatter";
import { useState } from "react";
import { Alert } from "@/components/Alert";
import { NewTransaction } from "@/components/NewTransaction";
import { Type } from "@/components/Type";

export const Transaction = () => {
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const { categories, transactions, setFilter } = useTransactionController();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Transações"
        subtitle="Gerencie todas as suas transações financeiras">
        <Button
          onClick={() => {
            // setCategorySelected(null);
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
          onValueChange={(value) => {
            setFilter((prev) => ({
              ...prev,
              type: value === "all" ? "" : (value as "income" | "expense"),
            }));
          }}
        />

        <Select
          label="Categoria"
          items={categories?.map((category) => ({
            value: category.id,
            label: <TagCategory category={category} />,
          }))}
          onValueChange={(value) => {
            setFilter((prev) => ({ ...prev, categoryId: value }));
          }}
        />
        <Select
          label="Período"
          items={[
            { value: "income", label: "Entrada" },
            { value: "expense", label: "Saída" },
          ]}
          onValueChange={(value) => {
            setFilter((prev) => ({ ...prev, period: value }));
          }}
        />
      </Card>

      <Table className="bg-white rounded-md shadow-md">
        <TableHeader>
          <TableRow className="h-14">
            <TableHead className="uppercase text-gray-500 text-sm text-left pl-6">
              Descrição
            </TableHead>
            <TableHead className="uppercase text-gray-500 text-sm w-24 text-center">
              Data
            </TableHead>
            <TableHead className="uppercase text-gray-500 text-sm w-48 text-center">
              Categoria
            </TableHead>
            <TableHead className="uppercase text-gray-500 text-sm w-32 text-center">
              Tipo
            </TableHead>
            <TableHead className="uppercase text-gray-500 text-sm w-48 text-right pr-6">
              Valor
            </TableHead>
            <TableHead className="uppercase text-gray-500 text-sm w-24 text-right pr-6">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions?.map((transaction) => (
            <TableRow className="h-18" key={transaction.id}>
              <TableCell className="flex flex-row gap-4 h-18 items-center pl-6 font-semibold text-md text-gray-800 text-center">
                {transaction.category && (
                  <TagCategoryIcon category={transaction.category} />
                )}
                {transaction.description}
              </TableCell>
              <TableCell className="text-center text-md text-gray-800">
                {dateFormatter(transaction.date)}
              </TableCell>
              <TableCell className="text-center">
                {transaction.category && (
                  <TagCategory category={transaction.category} />
                )}
              </TableCell>
              <TableCell className="text-center">
                <Type type={transaction.type} />
              </TableCell>
              <TableCell className=" text-right pr-6 font-semibold text-md text-gray-800">
                {transaction.type === "expense" ? "-" : ""}
                {formatCurrency(transaction.amount)}
              </TableCell>
              <TableCell className=" text-right pr-6">
                <div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() => setIsOpenDeleteAlert(true)}>
                    <Trash size={16} className="text-danger" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => {}}>
                    <SquarePen size={16} className="text-gray-700" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-white h-14">
          <TableRow className="rounded-b-md shadow-md ">
            <TableCell colSpan={6} className="text-right pr-6 font-semibold">
              Total de {transactions?.length ?? 0} transações
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Alert
        isOpen={isOpenDeleteAlert}
        onClose={() => setIsOpenDeleteAlert(false)}
        title="Excluir Transação"
        description={`Tem certeza que deseja excluir a transação ? Esta ação não pode ser desfeita.`}
        onConfirm={() => {}}
      />
      <NewTransaction
        categories={categories ?? []}
        open={openDialog}
        onOpenChange={setOpenDialog}
      />
    </div>
  );
};
