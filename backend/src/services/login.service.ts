import { prismaClient } from "@/prisma/prisma";
import { LoginInput } from "../dtos/input";
import { LoginOutput } from "../dtos/output";
import { comparePassword } from "../utils/hash";
import { signJwt } from "../utils/jwt";

export class LoginService {
  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    
    // Generate token logic here (similar to RegisterService)
    const payload = { id: user.id, email: user.email, name: user.name };
    const token = signJwt(payload, "1d");
    const refreshToken = signJwt(payload, "7d");

    return { token, refreshToken, user: payload };
  }
}
