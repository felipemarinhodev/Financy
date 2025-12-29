import { TagCategory, TagCategoryIcon } from "@/components/TagCategory";
import { Type } from "@/components/Type";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Table as UiTable,
} from "@/components/ui/table";
import type { Transaction } from "@/types";
import { formatCurrency } from "@/utils/Currency";
import { dateFormatter } from "@/utils/DateFormatter";
import { ArrowRight, SquarePen, Trash } from "lucide-react";

type TableProps = {
  deleteAction: (id: string) => void;
  editAction: (id: string) => void;
  transactions: Transaction[] | null;
  // pagination: {
  //   pages: number;
  //   limit: number;
  //   currentPage: number;
  // };
};

export const TableTransactions = ({
  deleteAction,
  editAction,
  // pagination,
  transactions,
}: TableProps) => {
  return (
    <UiTable className="bg-white rounded-md shadow-md">
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
              <div className="flex justify-center">
                {transaction.category && (
                  <TagCategory category={transaction.category} />
                )}
              </div>
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
                  onClick={() => deleteAction(transaction.id)}>
                  <Trash size={16} className="text-danger" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => editAction(transaction.id)}>
                  <SquarePen size={16} className="text-gray-700" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="bg-white h-14">
        <TableRow className="rounded-b-md shadow-md ">
          <TableCell colSpan={4} className="pl-6">
            <div className="text-md font-normal text-gray-700">
              <span className="font-medium">1</span> a{" "}
              <span className="font-medium">10</span> |{" "}
              <span className="font-medium">{0}</span> resultados {0} Páginas
            </div>
          </TableCell>
          <TableCell colSpan={2} className="w-fit text-right font-semibold">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <Button variant="outline">
                    <ArrowRight size={16} />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TableCell>
        </TableRow>
      </TableFooter>
    </UiTable>
  );
};
