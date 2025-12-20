import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { RegisterInput } from "../dtos/input";
import { RegisterOutput } from "../dtos/output";
import { RegisterService } from "../services/register.service";

@Resolver()
export class RegisterResolver {
  private registerService = new RegisterService();

  @Query(() => String)
  health(): string {
    return "Server is running!";
  }

  @Mutation(() => RegisterOutput)
  async register(
    @Arg("data", () => RegisterInput)
    data: RegisterInput
  ): Promise<RegisterOutput> {
    return this.registerService.register(data);
  }
}
