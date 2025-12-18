import { prismaClient } from "@/prisma/prisma";
import { CreateTransactionInput } from "../dtos/input";

export class TransactionService {

  async create({ description, type, amount, categoryId, date }: CreateTransactionInput, userId: string) {
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
}