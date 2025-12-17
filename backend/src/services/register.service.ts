import { prismaClient } from "../../prisma/prisma";
import { RegisterInput } from "../dtos/input/register.input";
import { RegisterOutput } from "../dtos/output/register.output";
import { User } from "../generated/prisma/client";
import { hashPassword } from "../utils/hash";
import { signJwt } from "../utils/jwt";

export class RegisterService {
  async register({ email, password, name }: RegisterInput): Promise<RegisterOutput> {
    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hash = await hashPassword(password);
    const user = await prismaClient.user.create({
      data: {
        email,
        password: hash,
        name,
      },
    });

    return this.generateToken(user);
  }
  generateToken({ id, email, name }: User) {
    const payload = { id, email, name };
    const token = signJwt(payload, "1d");
    const refreshToken = signJwt(payload, "7d");

    return { token, refreshToken, user: payload }
  }
}
