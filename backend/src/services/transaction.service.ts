import { prismaClient } from "@/prisma/prisma";
import { CreateTransactionInput, UpdateTransactionInput } from "../dtos/input";

export class TransactionService {
  async create(
    { description, type, amount, categoryId, date }: CreateTransactionInput,
    userId: string
  ) {
    const transaction = await prismaClient.transaction.create({
      data: {
        description,
        type,
        amount,
        categoryId,
        date,
        userId,
      },
    });
    return transaction;
  }

  async delete(id: string, userId: string) {
    const args = {
      where: {
        id,
        userId,
      },
    };
    const transactionExist = await prismaClient.transaction.findUnique(args);

    if (!transactionExist) {
      throw new Error("Transaction not found");
    }

    await prismaClient.transaction.delete(args);

    return true;
  }

  findAllByUserId(userId: string) {
    const transactions = prismaClient.transaction.findMany({
      where: {
        userId,
      },
    });
    return transactions;
  }

  async update(data: UpdateTransactionInput, id: string, userId: string) {
    const transaction = await prismaClient.transaction.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    const updatedTransaction = await prismaClient.transaction.update({
      where: {
        id,
        userId,
      },
      data: {
        description: data.description ?? transaction.description,
        type: data.type ?? transaction.type,
        amount: data.amount ?? transaction.amount,
        categoryId: data.categoryId ?? transaction.categoryId,
        date: data.date ?? transaction.date,
      },
    });
    return updatedTransaction;
  }
}
