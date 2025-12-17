import { prismaClient } from "@/prisma/prisma";
import { CreateCategoryInput } from "../dtos/input";

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

  async findAllByUserId(id: string) {
    const categories = await prismaClient.category.findMany({
      where: {
        userId: id,
      },
    });
    return categories;
  }
}
