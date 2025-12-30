import { prismaClient } from "@/prisma/prisma";
import {
  CreateTransactionInput,
  TransactionParamsInput,
  UpdateTransactionInput,
} from "../dtos/input";

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

  async findAllByUserId(userId: string, params?: TransactionParamsInput) {
    const { type, limit, page, description, categoryId, period } = params || {};
    console.log("params", JSON.stringify(params, null, 2));

    const totalItems = await prismaClient.transaction.count({
      where: {
        userId,
        type,
        description: {
          contains: description,
        },
        categoryId,
        date: period
          ? {
              gte: new Date(period.getFullYear(), period.getMonth(), 1),
              lt: new Date(period.getFullYear(), period.getMonth() + 1, 1),
            }
          : undefined,
      },
    });

    if (totalItems === 0) {
      return [];
    }
    const transactions = await prismaClient.transaction.findMany({
      where: {
        userId,
        type,
        description: {
          contains: description,
        },
        categoryId,
        date: period
          ? {
              gte: new Date(period.getFullYear(), period.getMonth(), 1),
              lt: new Date(period.getFullYear(), period.getMonth() + 1, 1),
            }
          : undefined,
      },
      orderBy: {
        date: "desc",
      },
      take: limit || 10,
      skip: page && limit ? (page - 1) * limit : undefined,
    });
    return { transactions, pagination: { totalItems } };
  }

  async findAllByCategoryId(categoryId: string, userId: string) {
    const result = await prismaClient.transaction.groupBy({
      by: ["categoryId"],
      where: {
        categoryId,
        userId,
      },
      _sum: {
        amount: true,
      },
      _count: {
        categoryId: true,
      },
    });

    const formattedResult = result.map((item) => ({
      categoryId: item.categoryId,
      totalAmount: item._sum.amount,
      transactionCount: item._count.categoryId,
    }));
    return formattedResult[0];
  }

  async findBalanceByUserId(userId: string) {
    const result = await prismaClient.transaction.groupBy({
      by: ["type"],
      where: {
        date: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
        },
        userId,
      },
      _sum: {
        amount: true,
      },
    });

    const formattedResult = result.map((item) => ({
      type: item.type,
      totalAmount: item._sum.amount,
    }));

    const income =
      formattedResult.find((item) => item.type === "income")?.totalAmount || 0;
    const expense =
      formattedResult.find((item) => item.type === "expense")?.totalAmount || 0;

    const response = {
      income,
      expense,
      balance: income - expense,
    };
    return response;
  }

  async findPeriodsByUserId(userId: string) {
    const result = await prismaClient.transaction.aggregate({
      where: {
        userId,
      },
      _min: {
        date: true,
      },
      _max: {
        date: true,
      },
    });

    return {
      oldestDate: result._min.date,
      newestDate: result._max.date,
    };
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
