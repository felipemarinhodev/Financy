import { prismaClient } from "@/prisma/prisma";
import { UpdateProfileInput } from "../dtos/input";

export class UserService {
  async findById(id: string) {
    return prismaClient.user.findUnique({
      where: { id },
    });
  }

  async updateProfile({ email, name }: UpdateProfileInput, userId: string) {
    const user = await prismaClient.user.findUnique({
      where: { id: userId, email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await prismaClient.user.update({
      where: { id: userId },
      data: { name },
    });
    return updatedUser;
  }
}
