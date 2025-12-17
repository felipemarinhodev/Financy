import { prismaClient } from "@/prisma/prisma";

export class UserService {
  async findById (id: string) {
    return prismaClient.user.findUnique({
      where: { id }
    });
  }
}
