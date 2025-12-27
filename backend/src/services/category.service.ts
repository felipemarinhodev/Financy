import { prismaClient } from "@/prisma/prisma";
import { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input";

export class CategoryService {
  async create(
    { title, color, description, icon }: CreateCategoryInput,
    userId: string
  ) {
    const category = await prismaClient.category.create({
      data: {
        title,
        color,
        description,
        icon,
        userId,
      },
    });

    return {
      id: category.id,
      title: category.title,
      description: category.description,
      color: category.color,
      icon: category.icon,
      userId: category.userId,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }

  async delete(id: string, userId: string) {
    const categoryExist = await prismaClient.category.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!categoryExist) {
      throw new Error("Category not found");
    }

    await prismaClient.category.delete({
      where: {
        id,
        userId,
      },
    });

    return true;
  }

  async findAllByUserId(id: string) {
    const categories = await prismaClient.category.findMany({
      where: {
        userId: id,
      },
    });
    return categories;
  }

  async findById(categoryId: string) {
    const category = await prismaClient.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    return category;
  }

  async findByIdAndUserId(categoryId: string, userId: string) {
    const category = await prismaClient.category.findUnique({
      where: {
        id: categoryId,
        userId,
      },
    });
    return category;
  }

  async findMostUsedCategories(userId: string) {
    const categories = await prismaClient.$queryRaw<
      {
        id: string;
        title: string;
        icon: string;
        color: string;
        usageCount: bigint;
      }[]
    >`
      SELECT  cat.id, cat.title, cat.icon, cat.color, count(trs.id) as usageCount
      FROM Category cat
        LEFT JOIN "Transaction" trs on cat.id = trs.categoryId and cat.userId = trs.userId
      WHERE cat.userId = ${userId}
      group by cat.id
      order by usageCount desc
      limit 1
 ;`;

    if (!categories || categories.length === 0) {
      return null;
    }

    const category = categories[0];
    const result = {
      id: category.id,
      title: category.title,
      color: category.color,
      icon: category.icon,
      usageCount: Number(category.usageCount),
    };
    return result;
  }

  async update(data: UpdateCategoryInput, id: string, userId: string) {
    const categoryExist = await prismaClient.category.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!categoryExist) {
      throw new Error("Category not found");
    }

    const category = await prismaClient.category.update({
      where: {
        id,
        userId,
      },
      data: {
        title: data.title ?? categoryExist.title,
        description: data.description ?? categoryExist.description,
        color: data.color ?? categoryExist.color,
        icon: data.icon ?? categoryExist.icon,
      },
    });

    return category;
  }
}
